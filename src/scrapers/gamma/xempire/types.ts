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

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  getUrl() {
    return `https://www.hardx.com/en/pornstar/${this.name.replace(/ /g, "-")}/${this.id}`;
  }
}