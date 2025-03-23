import { PlaylistTracksList } from '@/components/PlaylistTracksList'
import { screenPadding } from '@/constants/tokens'
import { usePlaylists } from '@/store/library'
import { defaultStyles } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { ScrollView, View } from 'react-native'
import { useEffect, useState } from 'react'
import { getPlaylistByPlaylistId } from '@/services/api/playlist'
import { useSelector } from 'react-redux'
import { Playlist } from '@/helpers/types'

const PlaylistScreen = () => {
	const [playlist, setPlaylist] = useState<Playlist>({ id: 0, name: '', thumbnail: '', tracks: [], artworkPreview: '' })
	const { id: playlistId } = useLocalSearchParams<{ id: string }>()

	const fetchPlaylist = async () => {
		const response = await getPlaylistByPlaylistId(playlistId)
		if (response.content) {
			setPlaylist(response.content)
		}
	}


	useEffect(() => {
		fetchPlaylist()
	}, [])
	if (!playlist) {
		console.warn(`Playlist ${playlistId} was not found!`)

		return <Redirect href={'/(tabs)/playlists'} />
	}


	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<PlaylistTracksList playlist={playlist} />
			</ScrollView>
		</View>
	)
}

export default PlaylistScreen
