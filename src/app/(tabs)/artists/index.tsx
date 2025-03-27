import { unknownArtistImageUri } from '@/constants/images'
import { screenPadding } from '@/constants/tokens'
import { artistNameFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useArtists } from '@/store/library'
import { defaultStyles, utilsStyles } from '@/styles'
import { Link } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { ScrollView } from 'react-native-gesture-handler'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState'
import { getAllSinger } from '@/services/api/singer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import { ArtistItem } from '@/components/ArtistItem'

const ItemSeparatorComponent = () => {
	return <View style={[utilsStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />
}

const ArtistsScreen = () => {
	const [artists, setArtists] = useState<any>([]) // State to store artists
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in artists',
		},
	})

	useEffect(() => {
		const fetchArtists = async () => {
			try {
				const response = await getAllSinger()// Update state with API data
				if (response.content) {
					const data = response.content.filter((item: any) => item.id !== 1)
					setArtists(data)
				}

			} catch (error) {
				console.error('1Error fetching artists:', error)
			}
		}
		fetchArtists()
	}, [])

	// const artists = useArtists()

	const filteredArtists = useMemo(() => {
		if (!search) return artists

		return artists.filter(artistNameFilter(search))
	}, [artists, search])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<FlatList
					contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
					scrollEnabled={false}
					ItemSeparatorComponent={ItemSeparatorComponent}
					ListFooterComponent={ItemSeparatorComponent}
					ListEmptyComponent={
						<View>
							<Text>No artist found</Text>

							<FastImage
								source={{
									uri: unknownArtistImageUri,
									priority: FastImage.priority.normal,
								}}
								style={utilsStyles.emptyContentImage}
							/>
						</View>
					}
					data={filteredArtists}
					renderItem={({ item: artist }) => {
						return (
							<Link href={`/artists/${artist.id}`} asChild>
								<TouchableHighlight activeOpacity={0.8}>
									<ArtistItem artist={artist} />
								</TouchableHighlight>
							</Link>
						)
					}}
				/>
			</ScrollView>
		</View>
	)
}

export default ArtistsScreen
