export function extractTitle(originalTitle: string) {
  const titleComponents = originalTitle.split(' ');
  const sceneIdMatch = titleComponents.slice(-1)[0].match(/(AB|AF|GP|SZ|IV|GIO|RS|TW|MA|FM|SAL|NR|AA|GL|BZ|FS)\d+/); // detect studio prefixes
  const shootId = sceneIdMatch ? sceneIdMatch[0] : null;
  const title = sceneIdMatch ? titleComponents.slice(0, -1).join(' ') : originalTitle;

  return { shootId, title };
}

export class Video {
  id: number;
  shootId: string;
  title: string;
  stars: string[] | null = null;
  duration: number | null = null;
  date: number = null;
  pictures: string[] | null = null;
  tags: string[] | null = null;

  constructor(id: number, originalTitle: string) {
    this.id = id;
    const { shootId, title } = extractTitle(originalTitle);
    this.shootId = shootId;
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