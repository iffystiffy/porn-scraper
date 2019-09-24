import { Video, Star, Site } from "./types";
import axios from "axios";
import { JSDOM } from "jsdom";
import { qsAll, qs } from "../../util";
import * as moment from "moment";

export async function scene(site: Site, id: number) {
  try {
    const SEARCH_URL = `https://www.${site}.com/en/video/scene/${id}`;
    const http = (await axios.get(SEARCH_URL)).data;
    const dom = new JSDOM(http);

    const json = qs(dom, 'script[type="application/ld+json"]').innerHTML;
    const data = JSON.parse(json)[0];

    const title = qs(dom, 'meta[name="twitter:title"]')
      .getAttribute("content").trim();
    const addedOn = moment.utc(data.dateCreated, 'YYYY-MM-DD').toDate().valueOf();
    const actors = data.actor
      .sort(({ gender: genderA }, { gender: genderB }) => {
        if (genderA === 'female' && genderB === 'male') return -1;
        if (genderA === 'male' && genderB === 'female') return 1;

        return 0;
      })
      .map(actor => actor.name);
    const description = data.description || undefined;
    const stars = (data.aggregateRating.ratingValue / data.aggregateRating.bestRating) * 5;
    const duration = moment.duration(data.duration.slice(2).split(':')).asSeconds();
    const tags = data.keywords.split(', ').map(t => t.trim());
    const thumbnail =
      qs(dom, 'meta[name="twitter:image"]')
        .getAttribute("content")
        .match(/https:.*/)[0];

    const video = new Video(id, title, site);
    video.addedOn = addedOn;
    video.stars = actors;
    video.description = description;
    video.starRating = stars;
    video.duration = duration;
    video.tags = tags;
    video.thumbnail = thumbnail;

    return {
      video,
      related: [] // !TODO
    }
  }
  catch (error) {
    throw error;
  }
}