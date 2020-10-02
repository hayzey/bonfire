export interface AlbumImage {
    url: string;
}

export interface Album {
    name: string;
    images: AlbumImage[];
}
