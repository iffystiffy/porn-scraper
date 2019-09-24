export declare function extractTitle(originalTitle: string): {
    shootIds: string[] | null;
    title: string;
};
export declare class Video {
    id: number;
    shootIds: string[];
    title: string;
    stars: string[] | null;
    duration: number | null;
    date: number;
    thumbnail: string | null;
    tags: string[] | null;
    constructor(id: number, originalTitle: string);
    getUrl(): string;
}
export declare class Star {
    id: number;
    nationality: string | null;
    age: number | null;
    name: string;
    tags: string[] | null;
    thumbnail: string | null;
    constructor(id: number, name: string);
}
