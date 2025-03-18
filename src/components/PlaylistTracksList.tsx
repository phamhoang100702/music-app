import { fontSize } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { Playlist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { QueueControls } from './QueueControls'
import { TracksList } from './TracksList'
import { getAllSongByPlaylistId } from '@/services/api/playlist'
import { useSelector } from 'react-redux'

export const PlaylistTracksList = ({ playlist }: { playlist: Playlist }) => {
	const [tracks, setTracks] = useState<any>([])
	const token = useSelector((state: any) => state.token)
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Find in playlist',
		},
	})

	const fetchSongs = async () => {
		try {
			const response = await getAllSongByPlaylistId(playlist.id, token.accessToken)
			if (response.content){
				playlist.tracks = response.content.map((song: any) => ({ ...song, url: song.sound }));
				setTracks(playlist.tracks);
			}
		} catch (error) {
			console.log(error)
		}

	}
	useEffect(() => {
		fetchSongs()
	}, [playlist])


	// const filteredPlaylistTracks = useMemo(() => {
	// 	return playlist.tracks.filter(trackTitleFilter(search))
	// }, [playlist.tracks, search])
	useEffect(() => {
		setTracks(playlist.tracks.filter(trackTitleFilter(search)))
		if(search.length === 0){
			setTracks(playlist.tracks);
		}
	}, [search])
	return (
		<TracksList
			id={generateTracksListId(playlist.name, search)}
			scrollEnabled={false}
			hideQueueControls={true}
			ListHeaderComponentStyle={styles.playlistHeaderContainer}
			ListHeaderComponent={
				<View>
					<View style={styles.artworkImageContainer}>
						<FastImage
							source={{
								uri: playlist.thumbnail,
								priority: FastImage.priority.high,
							}}
							style={styles.artworkImage}
						/>
					</View>

					<Text numberOfLines={1} style={styles.playlistNameText}>
						{playlist.name}
					</Text>

					{search.length === 0 && (
						<QueueControls style={{ paddingTop: 24 }} tracks={playlist.tracks} />
					)}
				</View>
			}
			tracks={tracks}
		/>
	)
}

const styles = StyleSheet.create({
	playlistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 300,
	},
	artworkImage: {
		width: '85%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	playlistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})
