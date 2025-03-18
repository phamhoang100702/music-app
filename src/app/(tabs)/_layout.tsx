import { FloatingPlayer } from '@/components/FloatingPlayer'
import { colors, fontSize } from '@/constants/tokens'
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllFavoriteSong } from '@/services/api/playlist'
import { getUserInformation } from '@/services/api/user'
import { login } from '@/redux/actions/auth'
import { updateFavoritePlaylist } from '@/redux/actions/favorite'

const TabsNavigation = () => {
	const dispatch = useDispatch()
	const token = useSelector((state: any) => state.token)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userResponse = await getUserInformation(token.accessToken)
				if (userResponse.content) {
					dispatch(login(userResponse.content))
					const favoriteResponse = await getAllFavoriteSong(token.accessToken)
					dispatch(updateFavoritePlaylist(favoriteResponse.content.map((song: any) => ({ ...song, url: song.sound }))))
				} else {
					console.log('failed to fetch ')
				}
			} catch (error) {
				console.log('failed to get data', error)
			}
		}
		fetchData()
	}, [])

	return (
		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: colors.primary,
					tabBarLabelStyle: {
						fontSize: fontSize.xs,
						fontWeight: '500',
					},
					headerShown: false,
					tabBarStyle: {
						position: 'absolute',
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						borderTopWidth: 0,
						paddingTop: 8,
					},
					tabBarBackground: () => (
						<BlurView
							intensity={90}
							style={{
								...StyleSheet.absoluteFillObject,
								overflow: 'hidden',
								borderTopLeftRadius: 20,
								borderTopRightRadius: 20,
							}}
						/>
					),
				}}
			>
				<Tabs.Screen
					name="favorites"
					options={{
						title: 'Favorites',
						tabBarIcon: ({ color }) => <FontAwesome name="heart" size={20} color={color} />,
					}}
				/>
				<Tabs.Screen
					name="playlists"
					options={{
						title: 'Playlists',
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="playlist-play" size={28} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="(songs)"
					options={{
						title: 'Songs',
						tabBarIcon: ({ color }) => (
							<Ionicons name="musical-notes-sharp" size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="artists"
					options={{
						title: 'Artists',
						tabBarIcon: ({ color }) => <FontAwesome6 name="users-line" size={20} color={color} />,
					}}
				/>
			</Tabs>

			<FloatingPlayer
				style={{
					position: 'absolute',
					left: 8,
					right: 8,
					bottom: 78,
				}}
			/>
		</>
	)
}

export default TabsNavigation
