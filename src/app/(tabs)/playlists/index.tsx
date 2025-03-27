import { PlaylistsList } from '@/components/PlaylistsList'
import { screenPadding } from '@/constants/tokens'
import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { usePlaylists } from '@/store/library'
import { defaultStyles } from '@/styles'
import { useRouter } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { getAllFavoriteSong, getAllPlaylistByUserId, searchAllPlaylistByNameForUser } from '@/services/api/playlist'
import { useSelector } from 'react-redux'

const PlaylistsScreen = () => {
	const [playlists, setPlaylists] = useState<any>([])
	const [page,setPage] = useState(0);
	const router = useRouter()
	const authInfo = useSelector((state: any) => state.auth)


	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in playlists',
		},
	})


	// const filteredPlaylists = useMemo(() => {
	// 	return playlists.filter(playlistNameFilter(search))
	// }, [playlists, search])

	const handlePlaylistPress = (playlist: Playlist) => {
		router.push(`/(tabs)/playlists/${playlist.id}`)
	}
	const fetchPlaylists = async () => {
		try {
			const response = await searchAllPlaylistByNameForUser(search,page,10);
			if(response.content){
				setPlaylists(response.content);
			}
		} catch (error) {
			console.error('Error fetching playlists:', error)
		}
	}
	useEffect(() => {
		fetchPlaylists();
	}, [page])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{
					paddingHorizontal: screenPadding.horizontal,
				}}
			>
				<PlaylistsList
					scrollEnabled={false}
					playlists={playlists}
					onPlaylistPress={handlePlaylistPress}
				/>
			</ScrollView>
		</View>
	)
}

export default PlaylistsScreen
