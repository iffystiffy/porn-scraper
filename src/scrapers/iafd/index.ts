import { JSDOM } from "jsdom";
import axios from "axios";
import * as iafd from "./types";

export * from "./types"

const IAFD_SEARCH_TEMPLATE = "http://www.iafd.com/results.asp?searchtype=comprehensive&searchstring="

// !TODO
function extractHeight(str: string): { imperial: { feet: number, inches: number }, metric: number | null } {
  return {
    imperial: {
      feet: 0,
      inches: 0
    },
    metric: 100
  }
}

// !TODO
function extractWeight(str: string): { imperial: number, metric: number } {
  return {
    imperial: 0,
    metric: 100
  }
}

export async function search(query: string): Promise<iafd.SearchResults> {
  try {
    const SEARCH_URL = IAFD_SEARCH_TEMPLATE + query.split(" ").join("+");
    const res = await axios.get(SEARCH_URL);

    const dom = new JSDOM(res.data);

    const femaleStarAnchors = dom.window.document.querySelectorAll("#tblFem tbody tr a");

    const femaleStars = [] as iafd.SearchResultsStar[];

    femaleStarAnchors.forEach(anchor => {
      if (anchor.textContent.length)
        femaleStars.push({
          name: anchor.textContent,
          url: "http://www.iafd.com" + anchor.getAttribute("href")
        })
    });

    const scenes = [] as iafd.Scene[];

    return {
      searchUrl: SEARCH_URL,
      femaleStars,
      scenes
    }
  }
  catch (error) {
    throw error;
  }
}

export async function scrapeActor(url: string): Promise<iafd.Actor | null> {
  try {
    const html = (await axios.get(url)).data;
    const dom = new JSDOM(html);

    const name = dom.window.document.querySelector("h1").textContent;
    const actor = new iafd.Actor(name.trim());

    actor.thumbnail = dom.window.document.querySelector("#headshot img").getAttribute("src");

    const aliases = dom.window.document.querySelectorAll(".biodata")["0"].textContent.split(",").map(s => s.trim());
    const birthday = dom.window.document.querySelectorAll(".biodata")["1"].textContent.trim();
    const birthplace = dom.window.document.querySelectorAll(".biodata")["3"].textContent.trim();

    actor.aliases = aliases;
    actor.birthday = birthday;
    actor.birthplace = birthplace;

    const yearsActiveText = dom.window.document.querySelectorAll(".biodata")["4"].textContent.trim();
    const yearsActiveRange = yearsActiveText.match(/[0-9]+-[0-9]+/)[0].split("-").map(s => parseInt(s));
    const currentYear = new Date().getFullYear();

    actor.yearsActive = {
      start: yearsActiveRange[0],
      end: yearsActiveRange[1] === currentYear ? null : yearsActiveRange[1]
    };

    const websites = dom.window.document.querySelector(".col-xs-12.col-sm-3").querySelectorAll("a");

    websites.forEach(anchor => {
      if (anchor.textContent.length && anchor.textContent.includes("http"))
        actor.websites.push(anchor.textContent.trim())
    });

    const stats = new iafd.ActorStats();
    const perfBox = dom.window.document.querySelector("#perfbox");

    const ethnicity = perfBox.querySelectorAll(".biodata")["0"].textContent.trim();
    const nationality = perfBox.querySelectorAll(".biodata")["1"].textContent.trim();
    const hairColor = perfBox.querySelectorAll(".biodata")["2"].textContent.trim();
    let height = perfBox.querySelectorAll(".biodata")["3"].textContent.trim();
    let weight = perfBox.querySelectorAll(".biodata")["4"].textContent.trim();
    const measurements = perfBox.querySelectorAll(".biodata")["5"].textContent.trim();

    height = extractHeight(height);
    weight = extractWeight(weight);

    let tattoos = null as string[] | null;
    const tattoosText = perfBox.querySelectorAll(".biodata")["6"].textContent;
    if (tattoosText.toLowerCase() === "none")
      tattoos = [];
    else if (tattoosText.toLowerCase() !== "no data")
      tattoos = tattoosText.split(";").map(s => s.trim());

    let piercings = null as string[] | null;
    const piercingsText = perfBox.querySelectorAll(".biodata")["7"].textContent;
    if (piercingsText.toLowerCase() === "none")
      piercings = [];
    else if (piercingsText.toLowerCase() !== "no data")
      piercings = piercingsText.split(";").map(s => s.trim());

    stats.ethnicity = ethnicity;
    stats.nationality = nationality;
    stats.hairColor = hairColor;
    stats.height = height;
    stats.weight = weight;
    stats.measurements = measurements;
    stats.tattoos = tattoos;
    stats.piercings = piercings;

    actor.stats = stats;

    return actor;
  }
  catch (error) {
    throw error;
  }
}

export async function getActor(name: string): Promise<iafd.Actor | null> {
  const result = await search(name);

  if (!result.femaleStars.length) {
    return null;
  }
  const actor = await scrapeActor(result.femaleStars[0].url);

  return actor;
}