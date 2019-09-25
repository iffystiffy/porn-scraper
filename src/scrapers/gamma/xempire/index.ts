import { Video, Star, Site } from "./types";
import axios from "axios";
import { JSDOM } from "jsdom";
import { qsAll, qs } from "../../../util";
import * as moment from "moment";

export async function frontPage(site: Site): Promise<{ latest: Video[], stars: Star[] }> {
  try {
    const SEARCH_URL = `https://www.${site}.com/en`;
    const http = (await axios.get(SEARCH_URL)).data;
    const dom = new JSDOM(http);

    return {
      latest: scrapeCards(dom, site),
      stars: [] // !TODO
    }
  }
  catch (err) {
    throw err;
  }
}

function scrapeCards(dom: JSDOM, site: Site): Video[] {
  const cardElements = Array.from(qsAll(dom, ".scene"));

  return cardElements.map(card => {
    const id = parseInt(card.getAttribute("data-itemid").trim());
    const title = card.querySelector(".sceneTitle a").getAttribute("title").trim();
    const stars = [...new Set(
      Array
        .from(card.querySelectorAll(".sceneActors a"))
        .map(actorTag => actorTag.getAttribute("title").trim())
    )];
    const dateString = card.querySelector(".sceneDate").textContent.trim();
    const thumbnail = card.querySelector("img.img").getAttribute("data-original");

    const video = new Video(id, title, site);
    video.stars = stars;
    video.date = moment.utc(dateString, "MM-DD-YYYY").valueOf();
    video.thumbnail = thumbnail;

    return video;
  });
}

export async function scene(site: Site, id: number) {
  try {
    const SEARCH_URL = `https://www.${site}.com/en/video/scene/${id}`;
    const http = (await axios.get(SEARCH_URL)).data;
    const dom = new JSDOM(http);

    const json = qs(dom, 'script[type="application/ld+json"]').innerHTML;
    const dataArray = JSON.parse(json);

    const data = dataArray[1] || dataArray[0];

    const title = qs(dom, 'meta[name="twitter:title"]')
      .getAttribute("content").trim();
    const addedOn = moment.utc(data.dateCreated, 'YYYY-MM-DD').valueOf();

    const dateElement = qs(dom, ".updatedDate");
    const cleanedDateString = dateElement.textContent.replace(/\n/g, "").trim();
    const date = moment.utc(cleanedDateString, 'MM-DD-YYYY').valueOf();

    const actors = data.actor
      .sort(({ gender: genderA }, { gender: genderB }) => {
        if (genderA === 'female' && genderB === 'male') return -1;
        if (genderA === 'male' && genderB === 'female') return 1;

        return 0;
      })
      .map(actor => actor.name);
    const description = qs(dom, 'meta[name="twitter:description"]')
      .getAttribute("content").trim();
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
    video.date = date;

    return {
      video,
      related: scrapeCards(dom, site)
    }
  }
  catch (error) {
    throw error;
  }
}