import { useFavorites } from '@/store/library'
import { useCallback } from 'react'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'
import { saveListen } from '@/services/api/listen'
import { useDispatch, useSelector } from 'react-redux'
import {
	addSongToFavoritePlaylist, removeSongFromFavoritePlaylist,
	removeSongFromPlaylist,
} from '@/services/api/playlist'
import { addOneSongToFavoritePlaylist, removeOneSongFromFavoritePlaylist } from '@/redux/actions/favorite'

export const useTrackPlayerFavorite = () => {
	const activeTrack = useActiveTrack()
	const dispatch = useDispatch()
	const favorites = useSelector((state: any) => state.favorite)
	const user = useSelector((state: any) => state.auth)
	let isFavorite = favorites.map((track: any) => track.id).includes(activeTrack?.id ?? '')
	// we're updating both the track player internal state and application internal state
	const toggleFavorite = useCallback(async () => {
		const id = await TrackPlayer.getActiveTrackIndex()
		if (id == null) return
		// update track player internal state
		await TrackPlayer.updateMetadataForTrack(id, {
			rating: isFavorite ? 0 : 1,
		})

		if (!isFavorite) {
			addSongToFavoritePlaylist(activeTrack?.id)
			dispatch(addOneSongToFavoritePlaylist(activeTrack))
			isFavorite = true
		} else {
			removeSongFromFavoritePlaylist(activeTrack?.id)
			dispatch(removeOneSongFromFavoritePlaylist(activeTrack))
			isFavorite = false
		}
		// update the app internal state
	}, [isFavorite, activeTrack])

	return { isFavorite, toggleFavorite }
}
