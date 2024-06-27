type Track = {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: Record<string, string>;
    external_urls: Record<string, string>;
    href: string;
    id: string;
    is_playable: boolean;
    // linked_from: Record<string, string>;
    restrictions: Record<string, string>;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}