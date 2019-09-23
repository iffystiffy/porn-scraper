import { Video, Star, SearchOptions, StarOptions, Site } from "./types";
import axios from "axios";

export * from "./types";

function getJSONFromScriptTag(str: string): any {
  const jsonMatch = str.match(/{.*};/);

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

  return JSON.parse(jsonMatch[0].substring(0, lastIndex));
}

export function parseVideosAndStars(obj: any, studio: Site): { videos: Video[], stars: Star[] } {
  const videos = obj.videos;
  const stars = obj.models;

  const parsedVideos = videos.map(video => {
    const vid = new Video(
      studio,
      video.title.trim(),
      video.targetUrl.replace("/", "")
    );
    vid.date = new Date(video.releaseDate).valueOf();
    vid.duration = video.runLengthForDisplay;
    vid.rating = parseFloat(video.textRating);
    vid.stars = video.models;
    vid.pictures = [
      ...video.images.poster
    ]
    vid.tags = video.tags || null;
    return vid;
  });

  const parsedStars = stars.map(star => {
    const createdStar = new Star(
      studio,
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
    videos: parsedVideos,
    stars: parsedStars
  }
}

export async function search(options: SearchOptions): Promise<{ searchUrl: string, videos: Video[], stars: Star[] }> {
  try {
    if (!options.studio.length)
      throw "Invalid studio";

    if (!options.query.length)
      throw "Invalid query";

    const SEARCH_URL = `https://${options.studio}.com/search?q=${options.query}`;

    const html = (await axios.get(SEARCH_URL)).data as string;

    const scripts = html.match(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi);
    const parsed = getJSONFromScriptTag(scripts[1]);
    const { videos, stars } = parseVideosAndStars(parsed, options.studio);

    return {
      searchUrl: SEARCH_URL.replace(/ /g, "+"),
      videos,
      stars
    };
  }
  catch (error) {
    throw error;
  }
}

export async function star(options: StarOptions): Promise<{ searchUrl: string, videos: Video[], star: Star }> {
  try {
    if (!options.studio.length)
      throw "Invalid studio";

    if (!options.name.length)
      throw "Invalid name";

    const SEARCH_URL = `https://${options.studio}.com/${options.name.replace(/ /g, "-")}`;
    const html = (await axios.get(SEARCH_URL)).data as string;

    const scripts = html.match(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi);
    const parsed = getJSONFromScriptTag(scripts[1]);
    const { videos, stars } = parseVideosAndStars(parsed, options.studio);

    return {
      searchUrl: SEARCH_URL.replace(/ /g, "+"),
      videos: videos,
      star: stars[0]
    };
  }
  catch (error) {
    throw error;
  }
}