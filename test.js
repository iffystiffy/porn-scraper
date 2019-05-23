let scraper = require("./index");

(async () => {
	console.log(await scraper.getVideo("tushy", "a-very-special-anniversary"));
	console.log(await scraper.search("anal"));
    console.log(await scraper.searchStar("Kristen Scott"));
    console.log(await scraper.searchSite("tushy", "gia derza"));
    console.log("--- Test completed, you should see a bunch of videos above this message ---");
})();