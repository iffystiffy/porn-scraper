export class Height {
  feet: number;
  inches: number;

  constructor(feet: number, inches: number) {
    this.feet = feet;
    this.inches = inches;
  }
}

export class Star {
  id: string;
  name: string;
  thumbnail: string | null = null;
  age: number | null = null;
  measurements: string | null = null;
  height: Height | null = null;
  funFact: string | null = null;
  description: string | null = null;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  getUrl() {

  }
}

export class Video {
  id: string;
  title: string;
  date: number | null = null;
  description: string | null = null;
  stars: string[] | null = null;
  tags: string[] | null = null;
  thumbnail: string | null = null;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }

  getUrl() {
    return `https://www.julesjordan.com/trial/scenes/${this.id}.html`;
  }
}