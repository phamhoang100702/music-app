import { playbackService } from '@/constants/playbackService'
import { colors } from '@/constants/tokens'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState'
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
import { router, SplashScreen, Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TrackPlayer from 'react-native-track-player'
import { getUserInformation, updateUserWithFormData } from '@/services/api/user'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { getLocalStorage } from '@/services/localStorage'
import { login } from '@/redux/actions/auth'
import { configureStore } from '@reduxjs/toolkit'
import { allReducer } from '@/redux/reducers'
import { getToken, saveDataStorage } from '@/services/api/auth/setToken'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/constant'
import { getAllFavoriteSong } from '@/services/api/playlist'
import { updateFavoritePlaylist } from '@/redux/actions/favorite'
import { getAccessToken } from '@/services/api/auth'
import { handleLogin } from '@/helpers/handleLogin'

SplashScreen.preventAutoHideAsync()

TrackPlayer.registerPlaybackService(() => playbackService)
const store = configureStore({ reducer: allReducer })

const App = () => {
	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])

	useSetupTrackPlayer({
		onLoad: handleTrackPlayerLoaded,
	})

	useLogTrackPlayerState()

	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<RootNavigation />
					<StatusBar style="auto" />
				</GestureHandlerRootView>
			</SafeAreaProvider>
		</Provider>
	)
}

const RootNavigation = () => {
	const user = useSelector((state: any) => state.auth)
	const dispatch = useDispatch()
	useEffect(() => {
		// if (user.id) {
		// 	router.replace('/(auth)/login') // Chuyển tới màn hình đăng nhập nếu chưa đăng nhập
		// } else {
		// 	handleLogin(dispatch, router) // Chuyển tới màn hình đăng nhập nếu chưa đăng nhập
		// }
		router.replace('/(auth)/login')
	}, [])
	return (
		<Stack>
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />

			<Stack.Screen
				name="player"
				options={{
					presentation: 'card',
					gestureEnabled: true,
					gestureDirection: 'vertical',
					animationDuration: 400,
					headerShown: false,
				}}
			/>

			<Stack.Screen
				name="(modals)/addToPlaylist"
				options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerTitle: 'Add to playlist',
					headerTitleStyle: {
						color: colors.text,
					},
				}}
			/>
		</Stack>
	)
}

export default App
