// app/auth/register.js
import { soundtifyLogoUri } from '@/constants/images'
import { userRegister } from '@/services/api/auth'
import { utilsStyles } from '@/styles'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useDispatch } from 'react-redux'

const RegisterScreen = () => {
	const dispatch = useDispatch()

	// State lưu trữ giá trị các trường
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [retypePassword, setRetypePassword] = useState('')
	const [loading, setLoading] = useState(false)

	const registerRequest = async () => {
		const response = await userRegister({
			name,
			username,
			password,
			roles: 'USER',
		})
		if (response.status === 'ok') {
			alert(' Register Success')
			router.replace('/(auth)/login')
		} else {
			alert(response.message)
		}
	}

	const handleRegister = async () => {
		// Kiểm tra các trường không để trống
		if (!name || !username || !password) {
			alert('You have to fill in all information')
			return
		} else if (password !== retypePassword) {
			alert('Password not match')
			return
		}
		setLoading(true)
		try {
			console.log(' vao day roi nhe')
			registerRequest()
		} catch (error) {
			console.log('Đăng ký thất bại', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<View>
				<FastImage
					source={{ uri: soundtifyLogoUri, priority: FastImage.priority.normal }}
					style={utilsStyles.logoStyle}
				/>
			</View>

			{/* Trường tên */}
			<View
				style={{
					flexDirection: 'row',
					borderBottomColor: '#ccc',
					borderBottomWidth: 1,
					marginBottom: 25,
					paddingBottom: 8,
				}}
			>
				<Ionicons name="person-outline" size={24} color="black" style={{ marginRight: 10 }} />
				<TextInput
					style={styles.loginInput}
					placeholder="Tên người dùng"
					keyboardType="email-address"
					autoCapitalize="none"
					value={name}
					onChangeText={setName}
				/>
			</View>

			{/* Trường username */}
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
					placeholder="Nhập lại mật khẩu"
					secureTextEntry
					value={retypePassword}
					onChangeText={setRetypePassword}
				/>
			</View>
			<TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
				{loading ? <ActivityIndicator color="#fff" /> : <Text>Đăng kí</Text>}
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#212624',
		alignItems: 'center',
		padding: 20,
	},
	header: {
		fontSize: 32,
		textAlign: 'center',
		marginBottom: 20,
	},
	input: {
		height: 40,
		borderColor: '#ddd',
		borderWidth: 1,
		marginBottom: 12,
		paddingLeft: 10,
		borderRadius: 8,
	},
	button: {
		backgroundColor: '#096b41',
		width: '100%',
		padding: 15,
		borderRadius: 15,
		alignItems: 'center',
		marginTop: 10,
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

export default RegisterScreen
