export declare enum Site {
    VIXEN = "vixen",
    TUSHY = "tushy",
    TUSHY_RAW = "tushyraw",
    BLACKED = "blacked",
    BLACKED_RAW = "blackedraw",
    DEEPER = "deeper"
}
export declare class Video {
    id: string;
    title: string | null;
    stars: string[] | null;
    description: string | null;
    duration: string | null;
    date: number | null;
    rating: number | null;
    pictures: any[];
    studio: Site;
    tags: string[] | null;
    constructor(studio: Site, title: string, id: string);
    getUrl(): string;
}
export declare class Star {
    id: string;
    name: string;
    studio: Site;
    biography: string | null;
    dateOfBirth: number | null;
    rating: number | null;
    nationality: string | null;
    thumbnail: string | null;
    pictures: any;
    body: {
        cupSize: string | null;
        bustMeasurement: string | null;
        waistMeasurement: string | null;
        hipMeasurement: string | null;
        hairColor: string | null;
    };
    constructor(studio: Site, name: string, id: string);
    getUrl(): string;
}
export interface SearchOptions {
    query: string;
    studio: Site;
}
export interface StarOptions {
    name: string;
    studio: Site;
}
