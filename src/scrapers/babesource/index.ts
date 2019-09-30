import axios from "axios";
import { JSDOM } from "jsdom";
import { Gallery, Star } from "./types";
import { qsAll, qs } from "../../util";

export * from "./types";

export async function gallery(id: string) {
  const SEARCH_URL = `https://babesource.com/galleries/${id}.html`;
  try {
    const html = (await axios.get(SEARCH_URL)).data as string;
    const dom = new JSDOM(html);

    const stars = Array.from(qsAll(dom, ".pornstars a")).map(i => {
      const id = i
        .getAttribute("href")
        .split("/")
        .slice(-1)[0]
        .replace(".html", "");
      const name = i.querySelector("strong").textContent.trim();
      const star = new Star(id, name);
      return star
    });
    const tags = Array.from(qsAll(dom, ".categories a")).map(i => i.textContent.trim());
    const images = Array.from(qsAll(dom, ".thumbs.cf a")).map(i => i.getAttribute("href"));

    const gallery = new Gallery(id);
    gallery.stars = stars;
    gallery.tags = tags;
    gallery.images = images;

    return {
      searchUrl: SEARCH_URL,
      gallery,
      related: scrapeCards(dom)
    }
  }
  catch (error) {
    if (error.response.status == 404)
      return {
        searchUrl: SEARCH_URL,
        gallery: null,
        related: []
      }
    throw error;
  }
}

function scrapeCards(dom: JSDOM): Gallery[] {
  return Array.from(qsAll(dom, ".cf .content")).map(card => {
    const id = card.querySelector("a")
      .getAttribute("href")
      .split("/")
      .slice(-1)[0]
      .replace(".html", "");

    const thumbnail = card.querySelector(".thumb").getAttribute("src");

    const gallery = new Gallery(id);
    gallery.thumbnail = thumbnail;
    return gallery;
  })
}

async function scrapeSite(url: string) {
  try {
    const html = (await axios.get(url)).data as string;
    const dom = new JSDOM(html);

    const galleries = scrapeCards(dom);

    return {
      searchUrl: url,
      galleries
    }
  }
  catch (error) {
    if (error.response.status == 404)
      return {
        searchUrl: url,
        galleries: []
      }
    throw error;
  }
}

export async function search(query: string, page?: number) {
  const SEARCH_URL = `https://babesource.com/search/photos/${query.replace(/ /g, "-")}/page${Math.max(page || 1, 1)}.html`;
  return scrapeSite(SEARCH_URL);
}

export async function topRated(page?: number) {
  const SEARCH_URL = `https://babesource.com/top-rated/page${Math.max(page || 1, 1)}.html`;
  return scrapeSite(SEARCH_URL);
}

export async function mostViewed(page?: number) {
  const SEARCH_URL = `https://babesource.com/most-viewed/page${Math.max(page || 1, 1)}.html`;
  return scrapeSite(SEARCH_URL);
}

export async function star(id: string) {
  const SEARCH_URL = `https://babesource.com/pornstars/${id}.html`;
  return scrapeSite(SEARCH_URL);
}

export async function stars() {
  const SEARCH_URL = `https://babesource.com/pornstars/`;
  try {
    const html = (await axios.get(SEARCH_URL)).data as string;
    const dom = new JSDOM(html);

    const stars = Array.from(qsAll(dom, ".listing-pornstars .row"))
      .map(row => {
        const id = row.querySelector("a")
          .getAttribute("href")
          .split("/")
          .slice(-1)[0]
          .replace(".html", "");
        const name = row.querySelector("a").textContent.trim();
        const star = new Star(id, name);
        return star;
      })

    return {
      searchUrl: SEARCH_URL,
      stars
    }
  }
  catch (error) {
    if (error.response.status == 404)
      return {
        searchUrl: SEARCH_URL,
        stars: []
      }
    throw error;
  }
}