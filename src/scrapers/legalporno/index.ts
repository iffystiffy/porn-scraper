import * as moment from "moment"
import { JSDOM } from "jsdom";
import axios from "axios";
import { Video } from "./types";

export * from "./types";

function scrapeVideoCards(dom: JSDOM): Video[] {
  const scenesElements = Array.from(qsAll(dom, '.thumbnails > div'));

  return scenesElements.map(element => {
    const sceneLinkElement = element.querySelector('.thumbnail-title a');
    const url = sceneLinkElement.getAttribute("href");

    const originalTitle = sceneLinkElement.textContent.trim();
    const entryId = new URL(url).pathname.split('/')[2];

    const date = moment.utc(element.getAttribute('release'), 'YYYY/MM/DD').toDate().valueOf();

    const video = new Video(parseInt(entryId), originalTitle);
    video.date = date;

    const imgStyle = element.querySelector(".thumbnail-avatar").getAttribute("style");

    if (imgStyle)
      video.thumbnail = imgStyle.match(/https:.*/)[0];

    return video;
  });
}

function qsAll(dom: JSDOM, query: string) {
  return dom.window.document.querySelectorAll(query);
}

function qs(dom: JSDOM, query: string) {
  return dom.window.document.querySelector(query);
}

export async function scene(id: number) {
  try {
    const SEARCH_URL = `https://www.legalporno.com/watch/${id}`
    const html = (await axios.get(SEARCH_URL)).data;
    const dom = new JSDOM(html);

    const originalTitle = qs(dom, 'h1.watchpage-title').textContent.trim();
    const date = moment.utc(qs(dom, 'span[title="Release date"] a').textContent, 'YYYY-MM-DD').toDate().valueOf();
    const [actorsElement, tagsElement] = Array.from(qsAll(dom, '.scene-description__row'));
    const actors =
      Array.from(actorsElement.querySelectorAll('a[href*="com/model"]'))
        .map(actorElement => actorElement.textContent);
    const duration = moment.duration(qs(dom, 'span[title="Runtime"]').textContent.trim()).asSeconds();
    const tags =
      Array.from(tagsElement.querySelectorAll("a"))
        .map(tagElement => tagElement.textContent);
    const playerElementStyle = qs(dom, "#player").getAttribute("style");

    const video = new Video(id, originalTitle);
    video.date = date;
    video.stars = actors; // !TODO: get actor IDs to access URLs
    video.duration = duration;
    video.tags = tags;

    if (playerElementStyle)
      video.thumbnail = playerElementStyle.match(/https:.*/)[0];

    return {
      searchUrl: SEARCH_URL,
      video,
      related: scrapeVideoCards(dom)
    };
  } catch (err) {
    throw err;
  }
}

async function scrapeAllCards(page: string) {
  try {
    const SEARCH_URL = `https://www.legalporno.com/${page}`;
    const html = (await axios.get(SEARCH_URL)).data;
    const dom = new JSDOM(html);
    const videos = scrapeVideoCards(dom);
    return videos;
  }
  catch (err) {
    throw err;
  }
}

export async function newest() {
  return scrapeAllCards("new-videos");
}

export async function recommended() {
  return scrapeAllCards("recommended");
}

export async function bestRecent() {
  return scrapeAllCards("best-recent-scenes");
}


// !TODO:
export async function getStarId(name: string): Promise<number | null> {
  try {
    // https://www.legalporno.com/api/autocomplete/search?q=emily

    return 0;
  }
  catch (err) {
    throw err;
  }
}

// !TODO:
export async function star(id: number) {
  try {

  }
  catch (err) {
    throw err;
  }
}