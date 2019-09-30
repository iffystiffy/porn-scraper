export class Star {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  getUrl() {
    return `https://babesource.com/pornstars/${this.id}.html`;
  }
}

export class Gallery {
  id: string;
  stars: Star[] | null = null;
  tags: string[] | null = null;
  thumbnail: string | null = null;
  images: string[] | null = null;

  constructor(id: string) {
    this.id = id;
  }

  getUrl() {
    return `https://babesource.com/galleries/${this.id}.html`;
  }
}