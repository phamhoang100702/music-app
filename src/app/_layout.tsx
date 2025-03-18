import { playbackService } from '@/constants/playbackService'
import { colors } from '@/constants/tokens'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState'
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
import { SplashScreen, Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TrackPlayer from 'react-native-track-player'
import { getUserInformation, updateUserWithFormData } from '@/services/api/user'
import { Provider, useDispatch } from 'react-redux'
import { getLocalStorage } from '@/services/localStorage'
import { login } from '@/redux/actions/auth'
import { configureStore } from '@reduxjs/toolkit'
import { allReducer } from '@/redux/reducers'

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
	return (
		<Stack>
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
