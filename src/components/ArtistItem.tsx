import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { unknownArtistImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { Artist } from '@/helpers/types'


export const ArtistItem = ({ artist }: { artist: Artist }) => {
	return (
		<View style={styles.artistItemContainer}>
			<View>
				<FastImage
					source={{
						uri: artist.avatar ?? unknownArtistImageUri,
						priority: FastImage.priority.normal,
					}}
					style={styles.artistImage}
				/>
			</View>

			<View style={{ width: '100%', flexDirection: 'column' }}>
				<Text numberOfLines={1} style={styles.artistNameText}>
					{artist.name}
				</Text>
				<Text
					style={defaultStyles.roleName}
				>
					Artist
				</Text>
			</View>
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
		width: 60,
		height: 60,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		maxWidth: '80%',
	},
})
