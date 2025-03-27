import { PlaylistsList } from '@/components/PlaylistsList'
import { screenPadding } from '@/constants/tokens'
import { Playlist } from '@/helpers/types'
import { usePlaylists, useTracks } from '@/store/library'
import { useQueue } from '@/store/queue'
import { defaultStyles } from '@/styles'
import { useHeaderHeight } from '@react-navigation/elements'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TrackPlayer, { Track } from 'react-native-track-player'
import { useDispatch, useSelector } from 'react-redux'
import { addSongToPlaylist } from '@/services/api/playlist'
import { updateOnePlaylistOfListPlaylist } from '@/redux/actions/playlist'

const AddToPlaylistModal = () => {
	const playlists = useSelector((state: any) => state.playlist)
	const dispatch = useDispatch()

	const router = useRouter()
	const headerHeight = useHeaderHeight()

	const { activeQueueId } = useQueue()

	const { id } = useLocalSearchParams<{ id: number | any }>()
	const availablePlaylists = playlists.filter((playlist: any) => {
		return !playlist.songs.includes(Number(id))
	})

	const handlePlaylistPress = async (playlist: Playlist) => {
		router.dismiss()

		if (activeQueueId?.startsWith(playlist.name)) {
			// await TrackPlayer.add(track)
			addSongToPlaylist(playlist.id, id)
			playlist.songs.push(id)
			dispatch((updateOnePlaylistOfListPlaylist(playlist)))
		}
	}

	return (
		<SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
			<PlaylistsList playlists={availablePlaylists} onPlaylistPress={handlePlaylistPress} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
})

export default AddToPlaylistModal
