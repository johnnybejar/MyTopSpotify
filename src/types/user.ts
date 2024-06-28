type User = {
    country: string;
    display_name: string;
    email: string;
    explicit_content: Record<string, boolean>;
    external_urls: Record<string, string>;
    followers: Record<string, string | number>;
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

type UserTopTracks = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: unknown;
    total: number;
    items: Track[];
}

type UserTopArtists = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: unknown;
    total: number;
    items: Artist[];
}
