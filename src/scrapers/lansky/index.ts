import { Video, Star, SearchOptions, StarOptions, Site } from "./types";
import axios from "axios";

export * from "./types";

function getVideo(video: any, studio: Site): Video {
  const vid = new Video(
    studio,
    video.title ? video.title.trim() : null,
    video.targetUrl.replace("/", "")
  );
  vid.date = new Date(video.releaseDate).valueOf() || null;
  vid.duration = video.runLengthForDisplay || null;
  vid.rating = parseFloat(video.textRating) || null;
  vid.stars = video.models ? video.models : video.modelsSpaced.split("&").map(i => i.trim());
  vid.pictures = [
    ...video.images.poster
  ]
  vid.tags = video.tags || null;
  return vid;
}

function getStar(star: any, studio: Site) {
  const createdStar = new Star(
    studio,
    star.name,
    star.id
  );
  createdStar.dateOfBirth = new Date(star.dateOfBirth).valueOf() || null;
  createdStar.biography = star.biography || null;
  createdStar.nationality = star.nationality || null;
  createdStar.rating = parseFloat(star.textRating) || null;
  createdStar.thumbnail = star.cdnUrl || null;
  createdStar.pictures = star.images;
  createdStar.body.cupSize = star.cupSize || null;
  createdStar.body.bustMeasurement = star.bustMeasurment || null;
  createdStar.body.waistMeasurement = star.waistMeasurment || null;
  createdStar.body.hipMeasurement = star.hipMeasurment || null;
  createdStar.body.hairColor = star.hairColour || null;
  return createdStar;
}

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

  const parsedVideos = videos.map(video => getVideo(video, studio));
  const parsedStars = stars.map(star => getStar(star, studio));

  return {
    videos: parsedVideos,
    stars: parsedStars
  }
}

export async function search(options: SearchOptions): Promise<{ searchUrl: string, videos: Video[], stars: Star[], tags: string[] }> {
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

    const tags = parsed.tags.map(tag => tag.displayName);

    return {
      searchUrl: SEARCH_URL.replace(/ /g, "+"),
      videos,
      stars,
      tags
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

export async function frontPage(studio: Site) {
  try {
    if (!studio.length)
      throw "Invalid studio";

    const SEARCH_URL = `https://${studio}.com`;
    const html = (await axios.get(SEARCH_URL)).data as string;

    const scripts = html.match(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi);
    const parsed = getJSONFromScriptTag(scripts[1]);
    const { stars } = parseVideosAndStars(parsed, studio);

    const newest =
      getVideo(
        parsed.videos.find(v => v.newId == parsed.page.data["/"].data.newestRelease.newId),
        studio
      );

    const popular =
      parsed.page.data["/"].data.popularVideos
        .map(id => parsed.videos.find(v => v.newId == id))
        .map(v => getVideo(
          v,
          studio
        ));

    const latest =
      parsed.page.data["/"].data.videos
        .map(id => parsed.videos.find(v => v.newId == id))
        .map(v => getVideo(
          v,
          studio
        ));

    let upcoming = null as Video | null;
    try {
      upcoming = getVideo(parsed.page.data["/"].data.nextScene, studio);
    }
    catch (err) { }

    return {
      newest,
      popular,
      // !TODO featured?
      latest,
      stars,
      upcoming
    };
  }
  catch (error) {
    throw error;
  }
}

export async function scene(id: string, studio: Site) {
  try {
    const SEARCH_URL = `https://${studio}.com/${id}`;
    const html = (await axios.get(SEARCH_URL)).data as string;
    const scripts = html.match(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi);
    const parsed = getJSONFromScriptTag(scripts[2]);

    const shootId = parsed.page.data[`/${id}`].data.video;
    const scene = parsed.videos.find(video => video.newId === shootId);

    const {
      title,
      description,
      models: actors,
      textRating: rating,
      runLength: duration,
      directorNames: director,
      tags
    } = scene;

    const video = new Video(studio, title, id);
    video.description = description;
    video.stars = actors;
    video.rating = parseFloat(rating);
    video.date = new Date(scene.releaseDate).valueOf();
    video.duration = duration;
    video.director = director;
    video.tags = tags;
    video.pictures = [
      scene.tourCarouselSizes,
      scene.videoPosterSizes,
      scene.trippleThumbUrlSizes,
      scene.trippleThumbPixelatedUrlSizes,
      scene.rotatingThumbsUrlSizes,
      scene.timelineThumbPatterns
    ]

    return {
      searchUrl: SEARCH_URL,
      video
    }
  }
  catch (error) {
    throw error;
  }
}

export async function latest(studio: Site, page?: number) {
  try {
    const SEARCH_URL = `https://${studio}.com/videos?page=${Math.max(page || 1, 1)}&size=12`;
    const html = (await axios.get(SEARCH_URL)).data as string;
    const scripts = html.match(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi);
    const parsed = getJSONFromScriptTag(scripts[1]);

    const videos =
      parsed.videos
        .map(video => getVideo(video, studio))
        .sort((a, b) => b.date - a.date);

    return {
      searchUrl: SEARCH_URL,
      videos
    }
  }
  catch (error) {
    throw error;
  }
}

export async function topRated(studio: Site, page?: number) {
  try {
    const SEARCH_URL = `https://${studio}.com/toprated?page=${Math.max(page || 1, 1)}&size=12`;
    const html = (await axios.get(SEARCH_URL)).data as string;
    const scripts = html.match(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi);
    const parsed = getJSONFromScriptTag(scripts[1]);

    const videos =
      parsed.videos
        .map(video => getVideo(video, studio))
        .sort((a, b) => b.date - a.date);

    return {
      searchUrl: SEARCH_URL,
      videos
    }
  }
  catch (error) {
    throw error;
  }
}

export async function awarded(studio: Site, page?: number) {
  try {
    const SEARCH_URL = `https://${studio}.com/awards?page=${Math.max(page || 1, 1)}&size=12`;
    const html = (await axios.get(SEARCH_URL)).data as string;
    const scripts = html.match(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi);
    const parsed = getJSONFromScriptTag(scripts[1]);

    const videos =
      parsed.videos
        .map(video => getVideo(video, studio))
        .sort((a, b) => b.date - a.date);

    return {
      searchUrl: SEARCH_URL,
      videos
    }
  }
  catch (error) {
    throw error;
  }
}

export async function stars(studio: Site, page?: number) {
  try {
    const SEARCH_URL = `https://${studio}.com/models?page=${Math.max(page || 1, 1)}`;
    const html = (await axios.get(SEARCH_URL)).data as string;
    const scripts = html.match(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi);
    const parsed = getJSONFromScriptTag(scripts[1]);

    const stars =
      parsed.models
        .map(star => getStar(star, studio))
        .sort((a, b) => b.date - a.date);

    return {
      searchUrl: SEARCH_URL,
      stars
    }
  }
  catch (error) {
    throw error;
  }
}