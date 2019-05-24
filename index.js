const puppeteer = require("puppeteer");
const asyncPool = require("tiny-async-pool");

class Video {
	constructor(studio, id) {
		this.id = id;
		this.title = "";
		this.stars = [];
		this.description = "";
		this.duration = null;
		this.date = null;
		this.rating = 0;
		this.pictures = [];
		this.studio = studio;
	}
};

function searchSite(options) {
	return new Promise(async (resolve, reject) => {

		if (!options.studio || !options.studio.length)
			return reject("Invalid studio");

		if (!options.query || !options.query.length)
			return reject("Invalid query");

		try {
			console.log("Scraping query '" + options.query + `' from ${options.studio}` + "...")

			let browser = options.browser;

			if (!browser) {
				console.log("Launching new chrome process...");
				browser = await puppeteer.launch({ headless: options.debug !== true });
			}

			const [page] = await browser.pages();

			let searchUrl = `https://${options.studio}.com/search?q=${options.query}`
			await page.goto(searchUrl, { waitUntil: 'networkidle2' });

			let listing = [];

			listing = await page.evaluate(() => {
				class ListingItem {
					constructor(id) {
						this.id = id;
						this.title = "";
						this.stars = [];
						this.rating = 0;
						this.thumbnail = [];
						this.studio = "";
					}
				};

				let videoContainers = Array.from(document.querySelectorAll('[data-test-component="VideoList"] [data-test-component="VideoThumbnailContainer"]'));

				videoContainers = videoContainers.map(v => {
					let id = v.getElementsByTagName("a")[0].href.split(".com/")[1];
					let item = new ListingItem(id);
					item.title = v.getElementsByTagName("a")[0].getAttribute("title");
					item.thumbnail = v.querySelector(`[data-test-component="ProgressiveImage"] img`).src;
					item.stars = Array.from(v.querySelectorAll(`[data-test-component="Overlay"] a`)).map(o => {
						return o.firstChild.data;
					})
					item.rating = null; // todo

					return item;
				});

				return videoContainers;
			})

			listing.forEach(video => {
				video.studio = options.studio;
			})

			if (!options.browser){
				console.log("Closing chrome...");
				await browser.close();
			}

			resolve(listing);
		} catch (err) {
			console.error(err);
			
			if (!options.browser){
				console.log("Closing chrome...");
				await browser.close();
			}
			
			reject(err);
		}
	});
}

function search(options) {
	return new Promise(async (resolve, reject) => {
		let studios = [
			// Tushy Raw doesn't currently allow searching
			"vixen", "tushy", "blacked", "blackedraw", "deeper"
		];

		let listing = [];

		let browser = options.browser;
		if (!browser) {
			console.log("Launching new chrome process...");
			browser = await puppeteer.launch({ headless: options.debug !== true } );
		}

		await asyncPool(1, studios, studio => {
			return new Promise(async (resolve, reject) => {
				let videos = await searchSite({
					query: options.query,
					studio,
					browser
				});
				listing = listing.concat(videos);
				resolve();
			})
		});

		if (!options.browser){
			console.log("Closing chrome...");
			await browser.close();
		}

		resolve(listing);
	})
}

function getVideo(options) {
	return new Promise(async (resolve, reject) => {
		try {

			if (!options.studio || !options.studio.length)
				return reject("Invalid studio");

			if (!options.id || !options.id.length)
				return reject("Invalid id");

			let browser = options.browser;
			if (!browser) {
				console.log("Launching new chrome process...");
				browser = await puppeteer.launch({ headless: options.debug !== true } );
			}

			console.log("Scraping '" + options.id + `' from ${options.studio}` + "...")
			const [page] = await browser.pages();
			await page.goto(`https://${options.studio}.com/` + options.id, { waitUntil: 'networkidle2' });

			const video = new Video(options.studio, options.id);

			video.title = await page.evaluate(() => {
				return document.querySelector('[data-test-component="VideoTitle"]').firstChild.data;
			})

			video.stars = await page.evaluate(() => {
				return Array.from(document.querySelectorAll('[data-test-component="VideoModels"] a')).map(e => e.firstChild.data);
			})

			await page.click('[data-test-component="MoreInfoBarButton"]');

			video.description = await page.evaluate(() => {
				return document.querySelector('[data-test-component="VideoDescription"]').firstChild.data;
			})

			video.duration = await page.evaluate(() => {
				return document.querySelector('[data-test-component="RunningTime"] span').firstChild.data;
			})

			video.date = await page.evaluate(() => {
				return document.querySelector('[data-test-component="ReleaseDate"] span').firstChild.data;
			})

			video.rating = await page.evaluate(() => {
				return document.querySelector('[data-test-component="RatingButton"] span').lastChild.data;
			})
			video.rating = parseFloat(video.rating);

			let init = await page.evaluate(() => {
				let scripts = document.getElementsByTagName("script");
				let initialStateScript = Array.from(scripts).find(s => s.innerText.includes("__INITIAL_STATE__"));
				return initialStateScript.innerText.split("window.__INITIAL_STATE__ =")[1].trim().slice(0, -1)
			})

			let initialState = JSON.parse(init);

			let pictures = initialState.page.data["/" + options.id].data.pictureset.map(p => {
				return p.main[0].src;
			});

			video.pictures = pictures;
			
			if (!options.browser){
				console.log("Closing chrome...");
				await browser.close();
			}

			resolve(video);
		} catch (err) {
			console.error(err);
			
			if (!options.browser){
				console.log("Closing chrome...");
				await browser.close();
			}

			reject(err);
		}
	})
}

function searchStar(name) {
	name = name.toLowerCase();

	return new Promise(async (resolve, reject) => {
		let videos = await search({ query: name });
		videos = videos.filter(v => v.stars.map(s => s.toLowerCase()).includes(name));
		resolve(videos);
	});
}

module.exports = {
	Video,
	searchSite,
	search,
	getVideo,
	searchStar
}