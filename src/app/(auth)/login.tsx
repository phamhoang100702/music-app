import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, Image } from 'react-native'
import { useRouter } from 'expo-router'
import FastImage from 'react-native-fast-image'
import { soundtifyLogoUri, unknownTrackImageUri } from '@/constants/images'
import { utilsStyles } from '@/styles'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { userLogin } from '@/services/api/auth'
import { useDispatch } from 'react-redux'
import { addUserToken, login } from '@/redux/actions/auth'
import { getUserInformation } from '@/services/api/user'
import { getAllFavoriteSong } from '@/services/api/playlist'
import { updateFavoritePlaylist } from '@/redux/actions/favorite'
import { getToken, saveToken } from '@/services/api/auth/setToken'

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
		const response = await userLogin({
			username,
			password,
		})
		if (response.content) {
			const token = response.content;
			saveToken(token)
			const userResponse = await getUserInformation()
			if (userResponse.content) {
				dispatch(login(userResponse.content))
				const favoriteResponse = await getAllFavoriteSong()
				dispatch(updateFavoritePlaylist(favoriteResponse.content.map((song: any) => ({ ...song, url: song.sound }))))
			} else {
				console.log('failed to fetch ')
			}
			router.replace('/(tabs)/(songs)')
		} else {
			Alert.alert('Notification', response.message)
		}
	}

	const handleLogin = () => {
		setLoading(true)
		if (!username || !password) {
			Alert.alert('Notification', 'You have to fill in all information')
			return
		}
		loginRequest()
		setLoading(false)
		// setTimeout(() => {
		// 	setLoading(false)
		// 	Alert.alert('Thành công', 'Đăng nhập thành công!')
		// 	router.replace('/(tabs)/(songs)') // Chuyển hướng đến trang chính
		// }, 1500)
	}

	return (
		<View style={styles.container}>
			<View>
				<FastImage
					source={{ uri: soundtifyLogoUri, priority: FastImage.priority.normal }}
					style={utilsStyles.logoStyle}
				/>
			</View>
			<View style={{
				flexDirection: 'row',
				borderBottomColor: '#ccc',
				borderBottomWidth: 1,
				marginBottom: 25,
				paddingBottom: 8,
			}}>
				<MaterialIcons
					name="alternate-email"
					size={24}
					color="black"
					style={{ marginRight: 10 }}
				/>
				<TextInput
					style={styles.loginInput}
					placeholder="Username"
					keyboardType="email-address"
					autoCapitalize="none"
					value={username}
					onChangeText={setUsername}
				/>
			</View>

			<View style={{
				flexDirection: 'row',
				borderBottomColor: '#ccc',
				borderBottomWidth: 1,
				marginBottom: 25,
				paddingBottom: 8,
			}}>
				<Ionicons
					name="lock-closed-outline"
					size={24}
					color="#ccc"
					style={{ marginRight: 10 }}
				/>
				<TextInput
					style={styles.loginInput}
					placeholder="Password"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
			</View>

			<TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
				{loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Log in</Text>}
			</TouchableOpacity>

			<TouchableOpacity onPress={() => router.push('/(auth)/register')}>
				<Text style={styles.registerText}>Dont have an account, register?</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f4f4f4',
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
		backgroundColor: '#fff',
		borderRadius: 8,
		paddingHorizontal: 15,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#ccc',
	},
	button: {
		backgroundColor: '#159dbf',
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
	},
})

export default Login
