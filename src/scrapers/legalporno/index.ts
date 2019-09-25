import * as moment from "moment"
import { JSDOM } from "jsdom";
import axios from "axios";
import { Video, Star } from "./types";
import { qsAll, qs } from "../../util";

export * from "./types";

function scrapeVideoCards(dom: JSDOM): Video[] {
  const scenesElements = Array.from(qsAll(dom, '.thumbnails > div'));

  return scenesElements.map(element => {
    const sceneLinkElement = element.querySelector('.thumbnail-title a');
    const url = sceneLinkElement.getAttribute("href");

    const originalTitle = sceneLinkElement.textContent.trim();
    const entryId = new URL(url).pathname.split('/')[2];

    const date = moment.utc(element.getAttribute('release'), 'YYYY/MM/DD').valueOf();

    const video = new Video(parseInt(entryId), originalTitle);
    video.date = date;

    const imgStyle = element.querySelector(".thumbnail-avatar").getAttribute("style");

    if (imgStyle)
      video.thumbnail = imgStyle.match(/https:.*/)[0];

    return video;
  });
}

export async function scene(id: number) {
  try {
    const SEARCH_URL = `https://www.legalporno.com/watch/${id}`
    const html = (await axios.get(SEARCH_URL)).data;
    const dom = new JSDOM(html);

    const originalTitle = qs(dom, 'h1.watchpage-title').textContent.trim();
    const date = moment.utc(qs(dom, 'span[title="Release date"] a').textContent, 'YYYY-MM-DD').valueOf();
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
    return {
      searchUrl: SEARCH_URL,
      videos
    };
  }
  catch (err) {
    throw err;
  }
}

export async function search(query: string, page?: number) {
  return scrapeAllCards(`search/${query.toLowerCase()}/${Math.max(page || 1, 1)}`)
}

export async function newest(page?: number) {
  return scrapeAllCards(`new-videos/${Math.max(page || 1, 1)}`);
}

export async function recommended(page?: number) {
  return scrapeAllCards(`recommended/${Math.max(page || 1, 1)}`);
}

export async function bestRecent(page?: number) {
  return scrapeAllCards(`best-recent-scenes/${Math.max(page || 1, 1)}`);
}

export async function getStarId(name: string) {
  try {
    name = name.trim().toLowerCase();
    const SEARCH_URL = `https://www.legalporno.com/api/autocomplete/search?q=${name.replace(/ /g, "+")}`;

    const data = (await axios.get(SEARCH_URL)).data;
    const found = data.terms.find(obj => obj.type == "model" && obj.name.toLowerCase() == name);
    return {
      searchUrl: SEARCH_URL,
      id: found ? found._id : null
    }
  }
  catch (err) {
    throw err;
  }
}

export async function star(id: number): Promise<{ searchUrl: string, star: Star | null }> {
  const SEARCH_URL = `https://www.legalporno.com/model/${id}`;

  try {
    const html = (await axios.get(SEARCH_URL)).data;
    const dom = new JSDOM(html);

    const name = qs(dom, '.model--description > h2').textContent.trim();
    const nation = qs(dom, '.model--description table tr:nth-child(1) .text-danger').textContent.trim();
    const age = qs(dom, '.model--description table tr:nth-child(2) .text-danger').textContent.trim();
    const tagContainer = qs(dom, '.model--description table tr:nth-child(3)');
    const thumbnail = qs(dom, '.model--avatar > img').getAttribute("src").trim();
    const tags =
      Array.from(tagContainer.querySelectorAll("a"))
        .map(tagElement => tagElement.textContent.trim());

    const star = new Star(id, name);

    star.name = name;
    star.nationality = nation || null;
    star.age = parseInt(age) || null;
    star.tags = tags || null;
    star.thumbnail = thumbnail;

    return {
      searchUrl: SEARCH_URL,
      star
    };
  }
  catch (err) {
    if (err.response.status == 404) {
      return {
        searchUrl: SEARCH_URL,
        star: null
      }
    }
    else
      throw err;
  }
}