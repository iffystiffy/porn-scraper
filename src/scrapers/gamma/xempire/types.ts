export enum Site {
  HARDX = "hardx",
  DARXK = "darkx",
  EROTICAX = "eroticax",
  LESBIANX = "lesbianx"
}

export class Video {
  id: number;
  title: string;
  stars: string[] | null = null;
  date: number | null = null;
  addedOn: number | null = null;
  tags: string[] | null = null;
  description: string | null = null;
  duration: number | null = null;
  site: Site;
  starRating: number | null = null;

  thumbnail: string | null = null;

  constructor(id: number, title: string, site: Site) {
    this.id = id;
    this.title = title;
    this.site = site;
  }

  getUrl() {
    return `https://www.${this.site}.com/en/video/scene/${this.id}`;
  }
}

export class Star {
  id: number;
  name: string;
  thumbnail: string | null = null;
  site: Site;

  constructor(id: number, name: string, site: Site) {
    this.id = id;
    this.name = name;
    this.site = site;
  }

  getUrl() {
    return `https://www.${this.site}.com/en/pornstar/${this.name.replace(/ /g, "-")}/${this.id}`;
  }
}

export class DVD {
  id: number;
  title: string;
  frontCover: string | null = null;
  backCover: string | null = null;
  site: Site;
  stars: string[] | null = null;
  date: number | null = null;
  duration: number | null = null;
  description: string | null = null;

  constructor(id: number, title: string, site: Site) {
    this.id = id;
    this.title = title;
    this.site = site;
  }

  getUrl() {
    return `https://www.${this.site}.com/en/movie/${this.title.replace(/ /g, "-")}/${this.id}`;
  }
}