import { StackScreenWithSearchBar } from '@/constants/layout'
import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '@/constants/tokens'
import { Ionicons } from '@expo/vector-icons'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'

const LibraryScreenLayout = () => {
	const auth = useSelector((state: any) => state.auth)
	return (
		<View style={defaultStyles.container}>
			<Stack initialRouteName="index">
				<Stack.Screen
					name="index"
					options={{
						...StackScreenWithSearchBar,
						// headerRight: 'Library',
						headerTitle: () => (
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Pressable
									style={{ marginRight: 15 }}
								>
									<FastImage
										source={{
											uri: auth.avatar,
											priority: FastImage.priority.normal,
										}}
										style={{
											width: 40,
											height: 40,
											borderRadius: 50,
										}}
									/>
								</Pressable>
								<Text style={styles.playlistNameText}> Your Library</Text>
							</View>

						),
					}}
				/>
				<Stack.Screen
					name="favorites"
					options={{
						headerTitle: '',
						headerBackVisible: true,
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerTintColor: colors.primary,
					}}
				></Stack.Screen>
				<Stack.Screen
					name="playlist/[playlistId]"
					options={{
						headerTitle: '',
						headerBackVisible: true,
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerTintColor: colors.primary,
					}}
				></Stack.Screen>
				<Stack.Screen
					name="singer/[singerId]"
					options={{
						headerTitle: '',
						headerBackVisible: true,
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerTintColor: colors.primary,
					}}
				></Stack.Screen>
			</Stack>
		</View>
	)
}

export default LibraryScreenLayout

const styles = StyleSheet.create({
	playlistItemContainer: {
		flexDirection: 'row',
		columnGap: 10,
		alignItems: 'center',
		paddingRight: 90,
	},
	playlistArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},
	playlistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		fontWeight: '600',
		maxWidth: '80%',
	},
})
