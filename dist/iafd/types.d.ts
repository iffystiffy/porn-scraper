export declare type SearchResultsStar = {
    name: string;
    url: string;
};
export declare type Scene = {
    movieTitle: string;
    year: number;
    distributor: string;
    notes: string[];
};
export declare type SearchResults = {
    femaleStars: SearchResultsStar[];
    scenes: Scene[];
};
export declare class ActorStats {
    ethnicity: string | null;
    nationality: string | null;
    hairColor: string | null;
    height: {
        imperial: {
            feet: number;
            inches: number;
        };
        metric: number | null;
    } | null;
    weight: {
        imperial: number;
        metric: number;
    } | null;
    measurements: string | null;
    tattoos: string[] | null;
    piercings: string[] | null;
}
export declare class Actor {
    name: string;
    thumbnail: string | null;
    aliases: string[];
    birthday: string | null;
    birthplace: string | null;
    yearsActive: {
        start: number;
        end: number | null;
    } | null;
    stats: ActorStats;
    credits: Scene[];
    websites: string[];
    constructor(name: string);
    info(): Promise<void>;
}
