import { useFavorites } from '@/store/library'
import { useQueue } from '@/store/queue'
import { MenuView } from '@react-native-menu/menu'
import { useRouter } from 'expo-router'
import { PropsWithChildren } from 'react'
import TrackPlayer, { Track } from 'react-native-track-player'
import { match } from 'ts-pattern'
import { useDispatch, useSelector } from 'react-redux'
import { addSongToFavoritePlaylist, addSongToPlaylist, removeSongToFavoritePlaylist } from '@/services/api/playlist'
import { addOneSongToFavoritePlaylist, removeOneSongFromFavoritePlaylist } from '@/redux/actions/favorite'

type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>

export const TrackShortcutsMenu = ({ track, children }: TrackShortcutsMenuProps) => {
	const favorites = useSelector((item: any) => item.favorite);
	const token = useSelector((item: any) => item.token);
	const dispatch = useDispatch();
	const router = useRouter()

	const isFavorite = favorites.map((track: Track) => track.id).includes(track.id)


	const { activeQueueId } = useQueue()

	const handlePressAction = (id: string) => {
		match(id)
			.with('add-to-favorites', async () => {
				addSongToFavoritePlaylist(track.id,token.accessToken);
				dispatch(addOneSongToFavoritePlaylist(track))

				// if the tracks is in the favorite queue, add it
				if (activeQueueId?.startsWith('favorites')) {
					await TrackPlayer.add(track)
				}
			})
			.with('remove-from-favorites', async () => {
				removeSongToFavoritePlaylist(track.id,token.accessToken);
				dispatch(removeOneSongFromFavoritePlaylist(track))
				// if the track is in the favorites queue, we need to remove it
				if (activeQueueId?.startsWith('favorites')) {
					const queue = await TrackPlayer.getQueue()

					const trackToRemove = queue.findIndex((queueTrack) => queueTrack.url === track.url)

					await TrackPlayer.remove(trackToRemove)
				}
			})
			.with('add-to-playlist', () => {
				// it opens the addToPlaylist modal
				// @ts-expect-error it should work
				router.push({ pathname: '(modals)/addToPlaylist', params: { trackUrl: track.url } })
			})
			.otherwise(() => console.warn(`Unknown menu action ${id}`))
	}

	return (
		<MenuView
			onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
			actions={[
				{
					id: isFavorite ? 'remove-from-favorites' : 'add-to-favorites',
					title: isFavorite ? 'Remove from favorites' : 'Add to favorites',
					image: isFavorite ? 'star.fill' : 'star',
				},
				{
					id: 'add-to-playlist',
					title: 'Add to playlist',
					image: 'plus',
				},
			]}
		>
			{children}
		</MenuView>
	)
}
