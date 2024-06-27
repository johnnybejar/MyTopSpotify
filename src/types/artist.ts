type Artist = {
    external_urls: Record<string, string>;
    followers: Record<string, unknown>;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

type SimplifiedArtistObject = {
    external_urls: Record<string, string>;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}