import { Video, Star, SearchOptions, StarOptions, Site } from "./types";
export * from "./types";
export declare function parseVideosAndStars(obj: any, studio: Site): {
    videos: Video[];
    stars: Star[];
};
export declare function search(options: SearchOptions): Promise<{
    searchUrl: string;
    videos: Video[];
    stars: Star[];
}>;
export declare function star(options: StarOptions): Promise<{
    searchUrl: string;
    videos: Video[];
    star: Star;
}>;
export declare function frontPage(studio: Site): Promise<{
    newest: Video;
    popular: any;
    latest: any;
    stars: Star[];
    upcoming: Video;
}>;
