export type IAFDSearchResultsStar = {
  name: string;
  url: string;
}

export type IAFDSearchResults = {
  femaleStars: IAFDSearchResultsStar[];
}

export type Scene = {
  movieTitle: string;
  year: number;
  distributor: string;
  notes: string[];
}

export class ActorStats {
  ethnicity: string | null = null;
  nationality: string | null = null;
  hairColor: string | null = null;
  height: { imperial: { feet: number, inches: number }, metric: number | null } | null = null;
  weight: { imperial: number, metric: number } | null = null;
  measurements: string | null = null;
  tattoos: string[] | null= null;
  piercings: string[] | null= null;
}

export class Actor {
  name: string;
  thumbnail: string | null = null;
  aliases: string[] = [];
  birthday: string | null = null;
  birthplace: string | null = null;
  yearsActive: { start: number, end: number | null } | null = null;
  stats: ActorStats = new ActorStats();
  credits: Scene[] = [];
  websites: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public info() {

  }
}