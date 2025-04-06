import { PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls'
import { unknownTrackImageUri } from '@/constants/images'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import { defaultStyles } from '@/styles'
import { useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, PanResponder, StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useActiveTrack } from 'react-native-track-player'
import { MovingText } from './MovingText'
import TrackPlayer from 'react-native-track-player'

export const FloatingPlayer = ({ style }: ViewProps) => {
	const router = useRouter()
	const [isVisible, setIsVisible] = useState(true)
	const translateX = useRef(new Animated.Value(0)).current

	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()
	const displayedTrack = activeTrack ?? lastActiveTrack

	useEffect(() => {
		if (displayedTrack) {
			setIsVisible(true)
			translateX.setValue(0)
		}
	}, [displayedTrack])

	const handlePress = () => {
		router.navigate('/player')
	}

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
			onPanResponderMove: Animated.event([null, { dx: translateX }], { useNativeDriver: false }),
			onPanResponderRelease: async (_, gestureState) => {
				if (Math.abs(gestureState.dx) > 50) {
					Animated.timing(translateX, {
						toValue: gestureState.dx > 0 ? 500 : -500,
						duration: 200,
						useNativeDriver: true,
					}).start(async () => {
						setIsVisible(false)
						await TrackPlayer.reset()
						translateX.setValue(0)
					})
				} else {
					Animated.spring(translateX, {
						toValue: 0,
						useNativeDriver: true,
					}).start()
				}
			},
		})
	).current

	if (!displayedTrack || !isVisible) return null

	return (
		<Animated.View
			{...panResponder.panHandlers}
			style={[styles.container, style, { transform: [{ translateX }] }]}
		>
			<TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={styles.innerContainer}>
				<FastImage
					source={{ uri: displayedTrack.thumbnail ?? unknownTrackImageUri }}
					style={styles.trackArtworkImage}
				/>

				<View style={styles.trackTitleContainer}>
					<MovingText
						style={styles.trackTitle}
						text={displayedTrack.title ?? ''}
						animationThreshold={25}
					/>
				</View>

				<View style={styles.trackControlsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>
			</TouchableOpacity>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		borderRadius: 12,
	},
	innerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
	},
	trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
	},
})
