type Album = {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: Record<string, string>;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions?: Record<string, string>;
    type: string;
    uri: string;
    artists: SimplifiedArtistObject[];
}

type Image = {
    url: string;
    height: number;
    width: number;
}