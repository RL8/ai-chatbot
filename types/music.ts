export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  albums: Album[];
}

export interface Album {
  id: string;
  name: string;
  releaseYear: number;
  color: string; // Hex color code
  songs: Song[];
}

export interface Song {
  id: string;
  title: string;
  trackNumber: number;
  duration: string;
}

export interface AppState {
  selectedArtist: Artist | null;
  selectedAlbum: Album | null;
  selectedSong: Song | null;
}
