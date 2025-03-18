import { Track } from 'react-native-track-player'

export type Playlist = {
	id: number,
	name: string,
	thumbnail: string,
	tracks: Track[]
	artworkPreview: string
}

export type Artist = {
	id: number,
	name: string,
	avatar: string,
	tracks: Track[]
}

export type TrackWithPlaylist = Track & { playlist?: string[] }
