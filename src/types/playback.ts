type Playback = {
    device: Device;
    repeat_state: string;
    shuffle_state: boolean;
    context: Record<string, unknown>;
    timestamp: number;
    progress_ms: number;
    is_playing: boolean;
    item: Track | null; // Can be an episode, ad, or unknown, so will force it to be a Track or null
    currently_playing_type: string;
    actions: Record<string, boolean>;
}

type Device = {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number;
    supports_volume: boolean;
}

type Episode = {
    audio_preview_url: string;
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: Record<string, string>;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    language: string;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: string;
    resume_point: Record<string, unknown>;
    type: string;
    uri: string;
    restrictions: Record<string, string>;
    show: Record<string, unknown>;
}