import * as iafd from "./types";
export declare function actor(name: string): iafd.Actor;
export declare function search(query: string): Promise<iafd.SearchResults>;
export declare function getStar(url: string): Promise<iafd.Actor | null>;
