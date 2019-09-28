import * as moment from "moment"
import { JSDOM } from "jsdom";
import axios from "axios";
import { Video, Star } from "./types";
import { qsAll, qs } from "../../util";

export async function scene(id: string) {
  try {
    const SEARCH_URL = `https://www.julesjordan.com/trial/scenes/${id}.html`;
    const html = (await axios.get(SEARCH_URL)).data as string;
    const dom = new JSDOM(html);

    /* const originalTitle = qs(dom, 'h1.watchpage-title').textContent.trim();
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
    video.tags = tags; */

    //if (playerElementStyle)
    //  video.thumbnail = playerElementStyle.match(/https:.*/)[0];

    const title = qs(dom, ".title_bar_hilite").textContent.trim();
    const description = qs(dom, ".update_description").textContent.trim();
    const dateString = qs(dom, ".cell.update_date").textContent.trim();
    const tagElement = qs(dom, ".update_tags");
    const tags = Array.from(tagElement.querySelectorAll("a")).map(e => e.textContent.trim());
    const modelElement = qs(dom, ".update_models");
    const models = Array.from(modelElement.querySelectorAll("a")).map(e => e.textContent.trim());

    const THUMBNAIL_REGEX = /useimage = ".*";/;
    const matches = html.match(THUMBNAIL_REGEX);
    const THUMBNAIL_URL_REGEX = /http.*\.jpg/;
    const urlMatches = matches[0].match(THUMBNAIL_URL_REGEX);

    const video = new Video(id, title);
    video.description = description;
    video.thumbnail = urlMatches[0];
    video.date = moment.utc(dateString, "MM/DD/YYYY").valueOf();
    video.tags = tags;
    video.stars = models;

    return {
      searchUrl: SEARCH_URL,
      video,
      related: [] // !TODO
    };
  } catch (err) {
    throw err;
  }
}