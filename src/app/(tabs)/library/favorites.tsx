import { TracksList } from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavorites } from '@/store/library'
import { defaultStyles } from '@/styles'
import { useEffect, useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'

const FavoritesScreen = () => {
	const favoritesTracks = useSelector((state: any) => state.favorite)
	const [loading, setLoading] = useState(false)
	const [songQueueHaveLyric, setSongQueueHaveLyric] = useState([])
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})


	useEffect(() => {
		setSongQueueHaveLyric(favoritesTracks.map((track: any) => ({
				...track,
				name: track.title,
				musicSrc: track.sound,
				cover: track.thumbnail,
				singer: track.singers.map((i: any) => i.name).join(', '),
				lyric: "No Lyric",

			}
		)))
	}, [favoritesTracks])
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TracksList
					id={generateTracksListId('favorites', search)}
					scrollEnabled={false}
					tracks={favoritesTracks}
					loading={loading}
				/>
			</ScrollView>
		</View>
	)
}

export default FavoritesScreen

