/* import asyncPool from "tiny-async-pool"; */
import { Video, Star, SearchOptions } from "./types";
import axios from "axios";
/* import { JSDOM } from "jsdom"; */

export * from "./types";

export async function searchSite(options: SearchOptions): Promise<{ searchUrl: string, videos: Video[], stars: any[] }> { // !TYPE stars
  try {
    if (!options.studio.length)
      throw "Invalid studio";

    if (!options.query.length)
      throw "Invalid query";

    const SEARCH_URL = `https://${options.studio}.com/search?q=${options.query}`;

    const html = (await axios.get(SEARCH_URL)).data as string;

    const scripts = html.match(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi);
    const infoHtml = scripts[1];

    const jsonMatch = infoHtml.match(/{.*};/);

    let brackets = 0;

    let lastIndex = 0;

    for (let i = 0; i < jsonMatch[0].length; i++) {
      const char = jsonMatch[0].charAt(i);

      if (char == "{")
        brackets++;
      else if (char == "}")
        brackets--;

      if (brackets == 0) {
        lastIndex = i + 1;
        break;
      }
    }

    const parsed = JSON.parse(jsonMatch[0].substring(0, lastIndex));
    const videos = parsed.videos;
    const stars = parsed.models;

    const parsedVideos = videos.map(video => {
      const vid = new Video(
        options.studio,
        video.title.trim(),
        video.id.split(":")[1]
      );
      vid.date = new Date(video.releaseDate).valueOf();
      vid.duration = video.runLengthForDisplay;
      vid.rating = parseFloat(video.textRating);
      vid.stars = video.models;
      vid.pictures = [
        ...video.images.poster
      ]
      return vid;
    });

    const parsedStars = stars.map(star => {
      const createdStar = new Star(
        options.studio,
        star.name,
        star.id
      );
      createdStar.dateOfBirth = new Date(star.dateOfBirth).valueOf();
      createdStar.biography = star.biography;
      createdStar.nationality = star.nationality;
      createdStar.rating = parseFloat(star.textRating);
      createdStar.thumbnail = star.cdnUrl;
      createdStar.pictures = star.images;
      createdStar.body.cupSize = star.cupSize;
      createdStar.body.bustMeasurement = star.bustMeasurment;
      createdStar.body.waistMeasurement = star.waistMeasurment;
      createdStar.body.hipMeasurement = star.hipMeasurment;
      createdStar.body.hairColor = star.hairColour;
      return createdStar;
    });

    return {
      searchUrl: SEARCH_URL.replace(/ /g, "+"),
      videos: parsedVideos,
      stars: parsedStars
    };
  }
  catch (error) {
    throw error;
  }
}