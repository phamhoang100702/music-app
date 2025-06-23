import {
	getSongChatBot,
	getSongsChatBot,
	getSongsChatBotWithoutSingerName,
	send_message,
} from '@/services/api/chatbot'
import { countListenByWeek } from '@/services/api/listen'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import {
	Dimensions,
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import TrackPlayer from 'react-native-track-player'
import { useSelector } from 'react-redux'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT * 0.7

// Sample messages to demonstrate chat UI
const INITIAL_MESSAGES = [
	{ id: 1, text: 'Xin chào! Tôi có thể giúp gì cho bạn với ứng dụng nghe nhạc?', isBot: true },
]

const ChatbotUI = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [messages, setMessages] = useState(INITIAL_MESSAGES)
	const [inputText, setInputText] = useState('')
	const scrollViewRef: any = useRef(null)
	const auth = useSelector((state: any) => state.auth)

	// Animation variables
	const translateY = useSharedValue(0)
	const bubbleScale = useSharedValue(1)
	const bubbleOpacity = useSharedValue(1)

	// Position of the chat bubble (for dragging)
	const bubblePosition = useSharedValue({
		x: SCREEN_WIDTH - 80, // Initial position from right
		y: SCREEN_HEIGHT - 300, // Initial position from bottom
	})
	const playTracks = async (tracks: any) => {
		if (tracks.length < 1) return
		tracks = tracks.map((track: any) => {
			return {
				...track,
				artwork: track.thumbnail ? track.thumbnail : null,
				name: track.title,
				url: track.sound,
			}
		})
		await TrackPlayer.reset()
		await TrackPlayer.add(tracks)
		await TrackPlayer.play()
	}

	const getMessageForPlayMusic = (response: any) => {
		const songs = response.content
		const object = response.object
		console.log('response', songs)
		if (!songs || songs.length === 0) {
			return `Hệ thống không tìm thấy bài nào tên ${object} !!!`
		} else if (songs.length == 1) {
			playTracks(songs)
			return `Tôi đã tìm thấy bài hát bạn yêu cầu ${getSongChatBot(songs[0])}!!!\n Tôi sẽ bật bài hát này ngay cho bạn thưởng thức nhé`
		} else {
			return `Tôi tìm thấy tận ${songs.length} bài hát \n ${getSongsChatBot(songs)} !!! \n Bạn muốn nghe bài nào ?? `
		}
	}

	const getMessageForChooseSong = (response: any) => {
		const songs = response.content
		const object = response.object
		console.log('response', songs)
		if (!songs || songs.length === 0) {
			return `Hệ thống không tìm thấy bài nào tên ${object} !!! \n Xin lỗi bạn nhớ :(((`
		} else if (songs.length > 1) {
			playTracks(songs)
			return `Đây là những bài hát tôi đã tìm được cho bạn ${getSongsChatBotWithoutSingerName(songs)}`
		} else {
			playTracks(songs)
			return `${getSongsChatBotWithoutSingerName(songs)} sẽ có ngay bây giờ!!`
		}
	}

	const getMessageForSearchSongByLyric = (response: any) => {
		const songs = response.content
		const object = response.object
		if (!songs || songs.length === 0) {
			return `Hệ thống không tìm thấy bài nào có lời ${object} !!!`
		} else if (songs.length == 1) {
			return `Tôi tìm thấy bài này khớp với lyric của bạn ${getSongChatBot(songs[0])}!!! \n Tôi sẽ bật bài hát này ngay cho bạn thưởng thức nhé`
		} else {
			return `Tôi tìm thấy tận ${songs.length} bài hát \n ${getSongsChatBot(songs)} !!! \n  Bạn muốn nghe bài nào hay cả 2 luôn ??`
		}
	}

	const getMessageForSearchSongBySinger = (response: any) => {
		const songs = response.content
		const object = response.object
		if (!songs || songs.length === 0) {
			return `Hệ thống không tìm thấy bài nào của ca sĩ ${object}`
		} else {
			playTracks(songs)
			return `Tôi tìm sẽ gợi ý bạn vài của của ${object} ${getSongsChatBotWithoutSingerName(songs)}`
		}
	}

	const getMessageForSearchSongByType = (response: any) => {
		const songs = response.content
		const object = response.object
		if (!response || !songs || songs.length === 0) {
			return `Hiện tại hệ thống không có bài nào thuộc thể loại này ${object} !!! \n Xin lỗi bạn nhớ :(((`
		} else {
			playTracks(songs)
			return `Tôi sẽ bật vài bài thuộc thể loại ${object} cho bạn ngay bây giờ: ${getSongsChatBotWithoutSingerName(songs)}`
		}
	}

	const getMessageForSearchSongByMood = (response: any) => {
		const songs = response.content
		const object = response.object
		if (!songs || songs.length === 0) {
			return `Hiện tại hệ thống không có bài nào ${object} !!! `
		} else {
			playTracks(songs)
			return `Giờ tôi sẽ bật cho bạn một vài bài nhạc ${object}`
		}
	}

	const getMessageForSearchSongBySong = (response: any) => {
		const songs = response.content
		const object = response.object
		if (!songs || songs.length === 0) {
			return `Hiện tại hệ thống không có bài nào giống ${object} !!!`
		} else {
			playTracks(songs)
			return `Giờ tôi sẽ bật cho bạn một vài bài nhạc giống ${object}`
		}
	}

	const handleUserResponseBySuggestedQuest = async (userResponse: any) => {
		try {
			const response = await countListenByWeek()
			await playTracks(response.content)
			return 'Giờ tôi sẽ bật cho bạn những bài hát đang được nhiều người nghe nhất !!!'
		} catch (error) {
			console.log(error)
		}
	}

	const handleChatBotResponseByBE = async (userResponse: any) => {
		try {
			const object = await send_message(userResponse)
			const response = object[0].custom
			if (!response || !response.intent) {
				return object[0].text
			}
			console.log(object)
			switch (response.intent) {
				case 'play_music': {
					return getMessageForPlayMusic(response)
				}
				case 'choose_song': {
					return getMessageForChooseSong(response)
				}
				case 'search_song_by_lyric': {
					return getMessageForSearchSongByLyric(response)
				}
				case 'recommend_by_type': {
					return getMessageForSearchSongByType(response)
				}
				case 'recommend_song_by_singer': {
					return getMessageForSearchSongBySinger(response)
				}
				case 'recommend_by_song': {
					return getMessageForSearchSongBySong(response)
				}
				case 'recommend_by_mood': {
					return getMessageForSearchSongByMood(response)
				}
				default: {
					return 'Tôi không thể hiểu câu hỏi của bạn! \n Bạn có thể cung cấp thêm thông tin không'
				}
			}
		} catch (e) {
			console.log(e)
			return 'Tôi không thể phân tích được câu hỏi của bạn! \n Bạn có thể cung cấp thêm thông tin không'
		}
	}

	// Handle opening sheet
	const handleOpenSheet = () => {
		translateY.value = withSpring(0, {
			damping: 20,
			stiffness: 90,
		})
		bubbleScale.value = withTiming(0, { duration: 200 })
		bubbleOpacity.value = withTiming(0, { duration: 200 })
		runOnJS(setIsOpen)(true)
	}

	// Handle closing sheet
	const handleCloseSheet = () => {
		translateY.value = withSpring(0, {
			damping: 20,
			stiffness: 90,
		})
		bubbleScale.value = withTiming(1, { duration: 300 })
		bubbleOpacity.value = withTiming(1, { duration: 300 })
		Keyboard.dismiss()
		runOnJS(setIsOpen)(false)
	}

	// Handle message sending
	const handleSendMessage = async () => {
		if (inputText.trim()) {
			const newUserMessage = {
				id: messages.length + 1,
				text: inputText,
				isBot: false,
			}

			setMessages([...messages, newUserMessage])
			setInputText('')
			const chatBotResponse = await handleChatBotResponseByBE({
				sender: auth.id,
				message: inputText,
			})
			// Simulate bot response after a short delay
			setTimeout(() => {
				const botReply = {
					id: messages.length + 2,
					text: chatBotResponse,
					isBot: true,
				}
				setMessages((prevMessages: any) => [...prevMessages, botReply])
			}, 1000)
		}
	}

	// Scroll to bottom when new messages arrive
	useEffect(() => {
		if (scrollViewRef.current && messages.length > 0) {
			setTimeout(() => {
				scrollViewRef.current.scrollToEnd?.({ animated: true })
			}, 100)
		}
	}, [messages])

	// Gesture handler for bottom sheet using Gesture.Pan
	const panGesture = Gesture.Pan()
		.activeOffsetY([-10, 10])
		.onBegin(() => {
			// Lưu giá trị ban đầu
			translateY.value = withSpring(0, { damping: 20, stiffness: 90 })
			bubbleScale.value = withTiming(1, { duration: 300 })
			bubbleOpacity.value = withTiming(1, { duration: 300 })
		})
		.onUpdate((event) => {
			const newTranslateY = translateY.value + event.translationY * 0.05
			if (newTranslateY <= 0 && newTranslateY >= MAX_TRANSLATE_Y) {
				translateY.value = newTranslateY
			}
		})
		.onEnd((event) => {
			// Snap to either closed or fully open
			const shouldClose =
				event.velocityY > 500 || (translateY.value > MAX_TRANSLATE_Y / 2 && event.velocityY > 0)

			if (shouldClose) {
				translateY.value = withSpring(1000, { damping: 20, stiffness: 90 })
				runOnJS(setIsOpen)(false)
			} else {
				translateY.value = withSpring(0, { damping: 20, stiffness: 90 })
				bubbleScale.value = withTiming(1, { duration: 300 })
				bubbleOpacity.value = withTiming(1, { duration: 300 })
			}
		})

	// Gesture handler for dragging the chat bubble
	const bubbleDragGesture = Gesture.Pan()
		.onUpdate((event) => {
			bubblePosition.value = {
				x: bubblePosition.value.x + event.translationX * 0.15,
				y: bubblePosition.value.y + event.translationY * 0.15,
			}
		})
		.onEnd(() => {
			// Keep the bubble within screen bounds
			if (bubblePosition.value.x < 0) {
				bubblePosition.value = {
					...bubblePosition.value,
					x: 0,
				}
			}
			if (bubblePosition.value.x > SCREEN_WIDTH - 70) {
				bubblePosition.value = {
					...bubblePosition.value,
					x: SCREEN_WIDTH - 70,
				}
			}
			if (bubblePosition.value.y < 50) {
				bubblePosition.value = {
					...bubblePosition.value,
					y: 50,
				}
			}
			if (bubblePosition.value.y > SCREEN_HEIGHT - 100) {
				bubblePosition.value = {
					...bubblePosition.value,
					y: SCREEN_HEIGHT - 100,
				}
			}
		})

	// Chat sheet animation style
	const sheetAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		}
	})

	// Chat bubble animation style
	const bubbleAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: bubblePosition.value.x },
				{ translateY: bubblePosition.value.y },
				{ scale: bubbleScale.value },
			],
			opacity: bubbleOpacity.value,
		}
	})

	// Overlay background opacity based on sheet position
	const overlayAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(translateY.value, [0, MAX_TRANSLATE_Y], [0, 0.5], {
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
			}),
			pointerEvents: translateY.value === 0 ? 'none' : 'auto',
		}
	})

	return (
		<>
			{/* Overlay when chat is open */}
			<Animated.View
				style={[
					StyleSheet.absoluteFill,
					{ backgroundColor: 'rgba(0, 0, 0, 0.5)' },
					overlayAnimatedStyle,
				]}
				pointerEvents={isOpen ? 'auto' : 'none'}
				onTouchStart={handleCloseSheet}
			/>

			{/* Draggable Chatbot bubble */}
			{auth.id && (
				<GestureDetector gesture={bubbleDragGesture}>
					<Animated.View style={[styles.chatBubble, bubbleAnimatedStyle]}>
						<TouchableOpacity
							onPress={handleOpenSheet}
							style={styles.chatBubbleButton}
							activeOpacity={0.8}
						>
							<Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
						</TouchableOpacity>
					</Animated.View>
				</GestureDetector>
			)}

			{/* Chat Sheet */}
			{isOpen && (
				<GestureDetector gesture={panGesture}>
					<Animated.View style={[styles.chatSheet, sheetAnimatedStyle]}>
						{/* Chat Header with drag handle */}
						<View style={styles.chatHeader}>
							<View style={styles.dragHandle} />
							<View style={styles.headerContent}>
								<View style={styles.headerLeftSection}>
									<View style={styles.botAvatar}>
										<Ionicons name="headset" size={20} color="#fff" />
									</View>
									<Text style={styles.headerTitle}>Hỗ trợ</Text>
								</View>
								<TouchableOpacity onPress={handleCloseSheet} style={styles.closeButton}>
									<Ionicons name="close-circle" size={28} color="#fff" />
								</TouchableOpacity>
							</View>
						</View>

						{/* Chat Messages */}
						<ScrollView
							ref={scrollViewRef}
							style={styles.messagesContainer}
							contentContainerStyle={styles.messagesContent}
							showsVerticalScrollIndicator={false}
						>
							{messages.map((message) => (
								<View
									key={message.id}
									style={[
										styles.messageRow,
										message.isBot ? styles.botMessageRow : styles.userMessageRow,
									]}
								>
									{message.isBot && (
										<View style={styles.messageBotAvatar}>
											<Ionicons name="headset" size={16} color="#fff" />
										</View>
									)}
									<View
										style={[
											styles.messageBubble,
											message.isBot ? styles.botMessageBubble : styles.userMessageBubble,
										]}
									>
										<Text style={styles.messageText}>{message.text}</Text>
									</View>
								</View>
							))}
						</ScrollView>

						{/* Input Area */}
						<View style={styles.inputContainer}>
							<View style={styles.inputWrapper}>
								<TextInput
									value={inputText}
									onChangeText={setInputText}
									placeholder="Nhập tin nhắn..."
									placeholderTextColor="#999"
									style={styles.input}
									multiline={false}
								/>
								<TouchableOpacity
									onPress={handleSendMessage}
									style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
									disabled={!inputText.trim()}
								>
									<Ionicons name="paper-plane" size={18} color="#fff" />
								</TouchableOpacity>
							</View>
						</View>
					</Animated.View>
				</GestureDetector>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	chatBubble: {
		position: 'absolute',
		zIndex: 999,
		// No right/bottom position as we're using Animated values now
	},
	chatBubbleButton: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: '#3a3a3a',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	chatSheet: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: SCREEN_HEIGHT * 0.7,
		backgroundColor: '#2c2c2c',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.25,
		shadowRadius: 5,
		elevation: 5,
		zIndex: 1000,
	},
	chatHeader: {
		paddingTop: 8,
		paddingBottom: 12,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#3a3a3a',
	},
	dragHandle: {
		alignSelf: 'center',
		width: 40,
		height: 4,
		backgroundColor: '#555',
		borderRadius: 2,
		marginBottom: 12,
	},
	headerContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	headerLeftSection: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	botAvatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#3a3a3a',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#fff',
	},
	closeButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	messagesContainer: {
		flex: 1,
		paddingHorizontal: 16,
	},
	messagesContent: {
		paddingVertical: 16,
		paddingBottom: 24,
	},
	messageRow: {
		marginBottom: 12,
		flexDirection: 'row',
	},
	botMessageRow: {
		justifyContent: 'flex-start',
	},
	userMessageRow: {
		justifyContent: 'flex-end',
	},
	messageBotAvatar: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: '#3a3a3a',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 8,
		alignSelf: 'flex-end',
	},
	messageBubble: {
		maxWidth: '80%',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 18,
	},
	botMessageBubble: {
		backgroundColor: '#555',
	},
	userMessageBubble: {
		backgroundColor: '#3a3a3a',
	},
	messageText: {
		color: '#fff',
		fontSize: 15,
	},
	inputContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		paddingBottom: 24,
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#3a3a3a',
		borderRadius: 24,
		paddingHorizontal: 16,
		paddingVertical: 4,
	},
	input: {
		flex: 1,
		color: '#fff',
		fontSize: 16,
		paddingVertical: 10,
	},
	sendButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#555',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 8,
	},
	sendButtonDisabled: {
		opacity: 0.6,
	},
})

export default ChatbotUI
