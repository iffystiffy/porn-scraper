import * as puppeteer from "puppeteer";

export enum Site {
  VIXEN = "vixen",
  TUSHY = "tushy",
  TUSHY_RAW = "tushyraw",
  BLACKED = "blacked",
  BLACKED_RAW = "blackedraw",
  DEEPER = "deeper"
}

export class Video {
  id: string;
  title: string | null = null;
  stars: string[];
  description: string | null = null;
  duration: string | null = null;
  date: number | null = null;
  rating: number | null = null;
  pictures: any[] = []; // !TYPE
  studio: Site;

  constructor(studio: Site, title: string, id: string) {
    this.id = id;
    this.title = title;
    this.studio = studio;
  }

  getUrl() {
    return `https://${this.studio}.com/${this.id}`
  }
};

export class Star {
  id: string;
  name: string;
  studio: Site;
  biography: string | null = null;
  dateOfBirth: number| null = null;
  rating: number| null = null;
  nationality: string| null = null;
  thumbnail: string| null = null;
  pictures: any; // !TYPE

  body: {
    cupSize: string | null;
    bustMeasurement: string | null;
    waistMeasurement: string | null;
    hipMeasurement: string | null;
    hairColor: string | null;
  } = {
      cupSize: null,
      bustMeasurement: null,
      waistMeasurement: null,
      hipMeasurement: null,
      hairColor: null
    }

  constructor(studio: Site, name: string, id: string) {
    this.id = id;
    this.name = name;
    this.studio = studio;
  }

  getUrl() {
    return `https://${this.studio}.com/${this.id}`
  }
}

export interface SearchOptions {
  query: string;
  studio: Site;
  browser?: puppeteer.Browser;
  debug?: boolean;
}