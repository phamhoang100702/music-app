import { TracksList } from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavorites } from '@/store/library'
import { defaultStyles, utilsStyles } from '@/styles'
import { useEffect, useMemo, useState } from 'react'
import { Button, FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { useSelector } from 'react-redux'
import { PlaylistsList } from '@/components/PlaylistsList'
import FastImage from 'react-native-fast-image'
import { unknownArtistImageUri } from '@/constants/images'
import { Link, router } from 'expo-router'
import { Playlist } from '@/helpers/types'
import { getAllPlaylistByUserId } from '@/services/api/playlist'
import { ArtistItem } from '@/components/ArtistItem'
import { PlaylistListItem } from '@/components/PlaylistListItem'
import { FavoriteSongSItem } from '@/components/FavoriteSongsItem'

const ItemSeparatorComponent = () => {
	return <View style={[utilsStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />
}


const LibraryScreen = () => {
	const followedSinger = useSelector((state: any) => state.followedSinger)
	const ownedPlaylist = useSelector((state: any) => state.playlist)
	const favoritesTracks = useSelector((state: any) => state.favorite)
	const [loading, setLoading] = useState(false)
	const auth = useSelector((state: any) => state.auth)
	const handlePlaylistPress = (playlist: Playlist) => {
		router.push(`/(tabs)/library/playlist/${playlist.id}`)
	}

	const handleFavoriteSongPress = ()=>{
		router.push(`/(tabs)/library/favorites`)
	}
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<FavoriteSongSItem onPress={handleFavoriteSongPress}/>
				<PlaylistsList
					scrollEnabled={false}
					playlists={ownedPlaylist}
					onPlaylistPress={handlePlaylistPress}
				/>
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
					data={followedSinger}
					renderItem={({ item: artist }) => {
						return (
							<Link href={`/library/singer/${artist.id}`} asChild>
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

const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
	},
	artistImage: {
		borderRadius: 32,
		width: 50,
		height: 50,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		maxWidth: '80%',
	},
})
export default LibraryScreen
