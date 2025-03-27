import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { FontAwesome } from '@expo/vector-icons' // Dùng icon ngôi sao ⭐
import { unknownArtistImageUri } from '@/constants/images'
import { fontSize } from '@/constants/tokens'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { Artist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { QueueControls } from './QueueControls'
import { TracksList } from './TracksList'
import { getAllSongBySingerId } from '@/services/api/song'
import { useDispatch, useSelector } from 'react-redux'
import { addOneSingerToFollowedSinger, removeOneSingerFromFollowedSinger } from '@/redux/actions/singer'
import { addFollow, removeFollow } from '@/services/api/singer'

export const ArtistTracksList = ({ artist }: { artist: Artist }) => {
	const [tracks, setTracks] = useState<any>([])
	const [isFollowing, setIsFollowing] = useState(false) // Trạng thái Follow/Unfollow
	const followedSingers = useSelector((state: any) => state.followedSinger);
	const dispatch = useDispatch();
	console.log("followedSingers", followedSingers)
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Find in songs',
		},
	})
	useEffect(() => {
		setIsFollowing(followedSingers.some((singer: any) => singer.id === artist.id));
	}, [])


	const getTracksByArtist = async () => {
		try {
			const response = await getAllSongBySingerId(artist.id)
			if (response.content) {
				setTracks(response.content.map((song: any) => ({ ...song, url: song.sound })))
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getTracksByArtist()
	}, [artist.id])

	const handleFollowToggle = () => {
		if(isFollowing){
			setIsFollowing(false);
			dispatch(removeOneSingerFromFollowedSinger(artist))
			removeFollow(artist.id)
		}else {
			setIsFollowing(true);
			dispatch(addOneSingerToFollowedSinger(artist));
			addFollow(artist.id)
		}
	}

	return (
		<TracksList
			id={generateTracksListId(`singer-${artist.name}`, search)}
			loading={false}
			scrollEnabled={false}
			hideQueueControls={true}
			ListHeaderComponentStyle={styles.artistHeaderContainer}
			ListHeaderComponent={
				<View>
					<View style={styles.artworkImageContainer}>
						<FastImage
							source={{
								uri: artist.avatar ?? unknownArtistImageUri,
								priority: FastImage.priority.high,
							}}
							style={styles.artistImage}
						/>
					</View>

					<Text numberOfLines={1} style={styles.artistNameText}>
						{artist.name}
					</Text>

					{/* Nút Follow / Unfollow với icon ngôi sao ⭐ */}
					<TouchableOpacity style={styles.followButton} onPress={handleFollowToggle}>
						<FontAwesome name={isFollowing ? 'star' : 'star-o'} size={24} color="pink" />
						<Text style={styles.followText}>{isFollowing ? 'Following' : 'Follow'}</Text>
					</TouchableOpacity>

					{search.length === 0 && (
						<QueueControls tracks={tracks} style={{ paddingTop: 24 }} />
					)}
				</View>
			}
			tracks={tracks}
		/>
	)
}

const styles = StyleSheet.create({
	artistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 200,
	},
	artistImage: {
		width: '60%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 128,
	},
	artistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
	followButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 12,
		padding: 8,
		borderRadius: 8,
	},
	followText: {
		marginLeft: 8,
		fontSize: fontSize.sm,
		fontWeight: '600',
		color: 'pink',
	},
})
