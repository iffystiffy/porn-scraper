const LEGALPORNO_STUDIO_REGEX = /(GG|AB|AF|GP|SZ|IV|GIO|RS|TW|MA|FM|SAL|NR|AA|GL|BZ|FS)\d+/gi;

export function extractTitle(originalTitle: string): { shootIds: string[] | null, title: string } {
  const studioMatches =
    originalTitle.match(LEGALPORNO_STUDIO_REGEX);

  let title = originalTitle;
  for (const match of studioMatches) {
    if (title.includes(match))
      title = title.replace(match, "");
  }

  if (title.includes("[]"))
    title = title.replace("[]", "");

  return {
    shootIds: studioMatches.map(m => m.toUpperCase()),
    title: title.trim().replace(/  /, " ")
  };
}

export class Video {
  id: number;
  shootIds: string[];
  title: string;
  stars: string[] | null = null;
  duration: number | null = null;
  date: number = null;
  thumbnail: string | null = null;
  tags: string[] | null = null;

  constructor(id: number, originalTitle: string) {
    this.id = id;
    const { shootIds, title } = extractTitle(originalTitle);
    this.shootIds = shootIds;
    this.title = title;
  }

  getUrl() {
    return `https://legalporno.com/watch/${this.id}`;
  }
}

export class Star {
  id: number;
  nationality: string;
  age: number;
  name: string;
  tags: string[] | null;
  thumbnail: string | null;
}