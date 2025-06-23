import { TracksList } from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { useEffect, useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native'
import { searchSongByKeyword } from '@/services/api/song'

const SongsScreen = () => {
	const [tracks, setTracks] = useState<any>([])
	const [page, setPage] = useState(0)
	const [loading, setLoading] = useState(false)
	const isFetching = useRef(false) // Prevent multiple API calls
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})
	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent
		const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
		if (isEndReached && !isFetching.current) {
			if (page < 10) {
				setPage((prevPage) => prevPage + 1)
			}
		}
	}
	const fetchSongs = async () => {
		if (isFetching.current) return // Prevent duplicate API calls
		isFetching.current = true
		setLoading(true)
		try {
			const response = await searchSongByKeyword(search, page, 10)// Update state with API data
			const songs = response.content.map((song: any) => ({ ...song, url: song.sound }))
			console.log(songs);
			setTracks((prevSong: any) => [...prevSong, ...songs])
		} catch (error) {
			console.error('Error fetching songs:', error)
		} finally {
			setLoading(false)
			isFetching.current = false
		}
	}
	useEffect(() => {
		fetchSongs()
	}, [page])
	useEffect(() => {
		setTracks([])
		if (page != 0) {
			setPage(0)
		} else {
			fetchSongs()
		}
	}, [search])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				onScroll={handleScroll}
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<TracksList
					id={generateTracksListId(`songs`, search + page)}
					tracks={tracks}
					scrollEnabled={false}
					loading={loading}
				/>
			</ScrollView>
		</View>
	)
}

export default SongsScreen
