import * as puppeteer from "puppeteer";
export declare enum LanskySite {
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
    stars: string[];
    description: string | null;
    duration: string | null;
    date: string | null;
    rating: number | null;
    pictures: string[];
    studio: string;
    constructor(studio: string, id: string);
}
export declare class ListingItem {
    id: string;
    title: string | null;
    stars: string[];
    rating: number | null;
    thumbnail: string | null;
    studio: string | null;
    constructor(id: string);
}
export interface SearchOptions {
    query: string;
    studio: LanskySite;
    browser?: puppeteer.Browser;
    debug?: boolean;
}
