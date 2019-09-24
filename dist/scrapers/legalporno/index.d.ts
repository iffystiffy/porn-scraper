import { Video, Star } from "./types";
export * from "./types";
export declare function scene(id: number): Promise<{
    searchUrl: string;
    video: Video;
    related: Video[];
}>;
export declare function search(query: string): Promise<{
    searchUrl: string;
    videos: Video[];
}>;
export declare function newest(): Promise<{
    searchUrl: string;
    videos: Video[];
}>;
export declare function recommended(): Promise<{
    searchUrl: string;
    videos: Video[];
}>;
export declare function bestRecent(): Promise<{
    searchUrl: string;
    videos: Video[];
}>;
export declare function getStarId(name: string): Promise<{
    searchUrl: string;
    id: any;
}>;
export declare function star(id: number): Promise<{
    searchUrl: string;
    star: Star | null;
}>;
