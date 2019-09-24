import * as iafd from "./types";
export * from "./types";
export declare function search(query: string): Promise<iafd.SearchResults>;
export declare function actor(name: string): Promise<iafd.Actor | null>;
