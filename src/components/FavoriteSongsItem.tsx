import { colors } from '@/constants/tokens'
import { Playlist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View } from 'react-native'
import FastImage from 'react-native-fast-image'

type PlaylistListItemProps = {
	playlist?: Playlist
} & TouchableHighlightProps

export const FavoriteSongSItem = ({ ...props }: PlaylistListItemProps) => {
	return (
		<TouchableHighlight activeOpacity={0.8} {...props}>
			<View style={styles.playlistItemContainer}>
				<View>
					<FastImage
						source={{
							uri: 'https://soundtify.s3.ap-southeast-1.amazonaws.com/default/favoriteSong.jpg',
							priority: FastImage.priority.normal,
						}}
						style={styles.playlistArtworkImage}
					/>
				</View>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<View style={
						{
							flexDirection: 'column',
							width: '100%'
						}
					}>
						<Text numberOfLines={1} style={styles.playlistNameText}>
							Liked Song
						</Text>
					</View>


					<AntDesign name="right" size={16} color={colors.icon} style={{ opacity: 0.5 }} />
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	playlistItemContainer: {
		flexDirection: 'row',
		columnGap: 10,
		alignItems: 'center',
		paddingRight: 90,
		marginTop: 30
	},
	playlistArtworkImage: {
		borderRadius: 8,
		width: 60,
		height: 60,
	},
	playlistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		fontWeight: '600',
		maxWidth: '80%',
	},
})
