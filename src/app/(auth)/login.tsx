import { soundtifyLogoUri } from '@/constants/images'
import { login } from '@/redux/actions/auth'
import { updateFavoritePlaylist } from '@/redux/actions/favorite'
import { updateListPlaylist } from '@/redux/actions/playlist'
import { updateFollowedSinger } from '@/redux/actions/singer'
import { userLogin } from '@/services/api/auth'
import { saveToken } from '@/services/api/auth/setToken'
import { getAllFavoriteSong, getAllPlaylistByUserId } from '@/services/api/playlist'
import { getFollowedSinger } from '@/services/api/singer'
import { getUserInformation } from '@/services/api/user'
import { utilsStyles } from '@/styles'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useDispatch } from 'react-redux'

const Login = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const validateEmail = (email: string) => {
		return /\S+@\S+\.\S+/.test(email)
	}

	const loginRequest = async () => {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
			console.log(response)
			const data = await response.json()
			if (response.ok) {
				console.log('Kết nối thành công: ' + JSON.stringify(data))
			} else {
				console.log('Lỗi kết nối!')
			}
		} catch (error) {
			console.log('Lỗi kết nối mạng: ' + error)
		}
		try {
			const response = await userLogin({
				username,
				password,
			})
			console.log('response', response)
			if (response.content) {
				const token = response.content
				saveToken(token)
				const userResponse = await getUserInformation()
				if (userResponse.content) {
					dispatch(login(userResponse.content))
					const favoriteResponse = await getAllFavoriteSong()
					dispatch(
						updateFavoritePlaylist(
							favoriteResponse.content.map((song: any) => ({ ...song, url: song.sound })),
						),
					)
					const playlistResponse = await getAllPlaylistByUserId(userResponse.content.id)
					dispatch(updateListPlaylist(playlistResponse.content))
					const followedSingerResponse = await getFollowedSinger(userResponse.content.id)
					dispatch(updateFollowedSinger(followedSingerResponse.content))
				} else {
					console.log('failed to fetch ')
				}
				router.replace('/(tabs)/(songs)')
			} else {
				Alert.alert('Notification', response.message)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleLogin = () => {
		setLoading(true)
		if (!username || !password) {
			Alert.alert('Notification', 'You have to fill in all information')
			setLoading(false)
			return
		}
		console.log('da vao day')
		loginRequest()
		setLoading(false)
		setTimeout(() => {
			setLoading(false)
			Alert.alert('Thành công', 'Đăng nhập thành công!')
			router.replace('/(tabs)/(songs)') // Chuyển hướng đến trang chính
		}, 1500)
	}

	return (
		<View style={styles.container}>
			<View>
				<FastImage
					source={{ uri: soundtifyLogoUri, priority: FastImage.priority.high }}
					style={utilsStyles.logoStyle}
				/>
			</View>
			<View
				style={{
					flexDirection: 'row',
					borderBottomColor: '#ccc',
					borderBottomWidth: 1,
					marginBottom: 25,
					paddingBottom: 8,
				}}
			>
				<MaterialIcons name="alternate-email" size={24} color="black" style={{ marginRight: 10 }} />
				<TextInput
					style={styles.loginInput}
					placeholder="Tên đăng nhập"
					keyboardType="email-address"
					autoCapitalize="none"
					value={username}
					onChangeText={setUsername}
				/>
			</View>

			<View
				style={{
					flexDirection: 'row',
					borderBottomColor: '#ccc',
					borderBottomWidth: 1,
					marginBottom: 25,
					paddingBottom: 8,
				}}
			>
				<Ionicons name="lock-closed-outline" size={24} color="#ccc" style={{ marginRight: 10 }} />
				<TextInput
					style={styles.loginInput}
					placeholder="Mật khẩu"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
			</View>

			<TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
				{loading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.buttonText}>Đăng nhập</Text>
				)}
			</TouchableOpacity>

			<TouchableOpacity onPress={() => router.push('/(auth)/register')}>
				<Text style={styles.registerText}>Bạn chưa có tài khoản?</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#212624',
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	input: {
		width: '100%',
		height: 50,
		backgroundColor: '#e6edea',
		borderRadius: 8,
		paddingHorizontal: 15,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#ccc',
	},
	button: {
		backgroundColor: '#096b41',
		width: '100%',
		padding: 15,
		borderRadius: 15,
		alignItems: 'center',
		marginTop: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	registerText: {
		marginTop: 15,
		color: '#007BFF',
		fontSize: 14,
	},
	loginInput: {
		width: '80%',
		borderRadius: 8,
		paddingHorizontal: 15,
		paddingVertical: 0,
		flex: 1,
		color: '#e6edea',
	},
})

export default Login
