import { ArtistTracksList } from '@/components/ArtistTracksList'
import { screenPadding } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import { getUserById } from '@/services/api/user'
import { useSelector } from 'react-redux'

const ArtistDetailScreen = () => {
	const { id: artistId } = useLocalSearchParams<{ id: string }>()
	const [artist, setArtist] = useState<any>(null)
	useEffect(() => {
		const fetchArtists = async () => {
			try {
				const response = await getUserById(artistId)
				if (response.content) {
					const data = response.content
					console.log("data ",data);
					setArtist(data)
				}else {
					console.warn(`Artist ${artistId} not found!`)
					return <Redirect href={'/(tabs)/artists'} />
				}
			} catch (error) {
				console.error('Error fetching artists:', error)
			}
		}
		fetchArtists()
	}, [])


	return (
		<View style={defaultStyles.container}>
			{artist &&
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<ArtistTracksList artist={artist} />
			</ScrollView> }
		</View>
	)
}

export default ArtistDetailScreen
