import { Video, Star, Site, DVD } from "./types";
import axios from "axios";
import { JSDOM } from "jsdom";
import { qsAll, qs } from "../../../util";
import * as moment from "moment";

export async function frontPage(site: Site): Promise<{ latest: Video[], mostViewedStars: Star[] }> {
  try {
    const SEARCH_URL = `https://www.${site}.com/en`;
    const http = (await axios.get(SEARCH_URL)).data;
    const dom = new JSDOM(http);

    return {
      latest: scrapeCards(dom, site),
      mostViewedStars: scrapeStarCards(dom, site)
    }
  }
  catch (err) {
    throw err;
  }
}

function scrapeStarCards(dom: JSDOM, site: Site): Star[] {
  const cardElements = Array.from(qsAll(dom, ".pornstar"));

  return cardElements.map(card => {
    const id = parseInt(card
      .querySelector(".pornstarImageLink")
      .getAttribute("href")
      .split("/")
      .slice(-1)[0]);
    const name = card.querySelector(".pornstarNameBox strong").textContent.trim();
    const thumbnail = card.querySelector("img").getAttribute("data-original");

    const star = new Star(id, name, site);
    star.thumbnail = thumbnail;

    return star;
  });
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

// Used in search results
function scrapeTlcCards(dom: JSDOM, site: Site): Video[] {
  const cardElements = Array.from(qsAll(dom, ".tlcItem"));

  return cardElements.map(card => {
    const id = parseInt(card.getAttribute("data-itemid").trim());
    const title = card.querySelector(".tlcTitle a").getAttribute("title").trim();
    const stars = [...new Set(
      Array
        .from(card.querySelectorAll(".tlcActors a"))
        .map(actorTag => actorTag.getAttribute("title").trim())
    )];
    const dateString = card.querySelector(".tlcSpecsDate > .tlcDetailsValue").textContent.trim();
    const thumbnail = card.querySelector("img").getAttribute("src");

    const video = new Video(id, title, site);
    video.stars = stars;
    video.date = moment.utc(dateString, "MM-DD-YYYY").valueOf();
    video.thumbnail = thumbnail;

    return video;
  });
}

// Used in search results
function scrapeTlcStarCards(dom: JSDOM, site: Site): Star[] {
  const cardElements = Array.from(qsAll(dom, ".tlcItem"));

  return cardElements.map(card => {
    const id = parseInt(card.getAttribute("data-itemid").trim());
    const title = card.querySelector(".tlcTitle a").getAttribute("title").trim();
    const thumbnail = card.querySelector("img").getAttribute("src");

    const star = new Star(id, title, site);
    star.thumbnail = thumbnail;

    return star;
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

export async function star(site: Site, id: number) {
  const SEARCH_URL = `https://www.${site}.com/en/pornstar/a/${id}`;

  try {
    const http = (await axios.get(SEARCH_URL)).data;
    const dom = new JSDOM(http);

    const videos = scrapeCards(dom, site);

    const actorNameElement = qs(dom, ".actorName strong");

    if (!actorNameElement) {
      return {
        searchUrl: SEARCH_URL,
        star: null,
        videos: []
      }
    }

    const name = actorNameElement.textContent;
    const thumbnail = qs(dom, ".actorPicture").getAttribute("src");

    const star = new Star(id, name, site);
    star.thumbnail = thumbnail;

    return {
      searchUrl: SEARCH_URL,
      star,
      videos
    }
  }
  catch (error) {
    throw error;
  }
}

export async function searchVideos(site: Site, query: string, page?: number) {
  const SEARCH_URL = `https://www.${site}.com/en/search/${query.toLowerCase()}/scene/${Math.max(page || 1, 1)}`;

  try {
    const http = (await axios.get(SEARCH_URL)).data;
    const dom = new JSDOM(http);

    return {
      videos: scrapeTlcCards(dom, site),
      searchUrl: SEARCH_URL
    }
  }
  catch (error) {
    throw error;
  }
}

export async function searchStars(site: Site, query: string, page?: number) {
  const SEARCH_URL = `https://www.${site}.com/en/search/${query.toLowerCase()}/actor/${Math.max(page || 1, 1)}`;

  try {
    const http = (await axios.get(SEARCH_URL)).data;
    const dom = new JSDOM(http);

    return {
      videos: scrapeTlcStarCards(dom, site),
      searchUrl: SEARCH_URL
    }
  }
  catch (error) {
    throw error;
  }
}

type SitesWithDVDs = Site.DARXK | Site.EROTICAX | Site.HARDX;

export async function searchDvds(site: SitesWithDVDs, query: string, page?: number) {
  const SEARCH_URL = `https://www.${site}.com/en/search/${query.toLowerCase()}/dvd/${Math.max(page || 1, 1)}`;

  try {
    const http = (await axios.get(SEARCH_URL)).data;
    const dom = new JSDOM(http);

    const cardElements = Array.from(qsAll(dom, ".tlcItem"));

    const dvds = cardElements.map(card => {
      const id = parseInt(card.getAttribute("data-itemid").trim());
      const title = card.querySelector(".tlcTitle a").getAttribute("title").trim();
      const thumbnail = card.querySelector("img").getAttribute("src");

      const dvd = new DVD(id, title, site);
      dvd.thumbnail = thumbnail;

      return dvd;
    });

    return {
      dvds,
      searchUrl: SEARCH_URL
    }
  }
  catch (error) {
    throw error;
  }
}