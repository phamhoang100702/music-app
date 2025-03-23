// app/auth/register.js
import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { soundtifyLogoUri } from '@/constants/images'
import { utilsStyles } from '@/styles'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { userRegister } from '@/services/api/auth'
import { router } from 'expo-router'

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
		console.log('response', response)
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
			<View style={{
				flexDirection: 'row',
				borderBottomColor: '#ccc',
				borderBottomWidth: 1,
				marginBottom: 25,
				paddingBottom: 8,
			}}>
				<Ionicons
					name="person-outline"
					size={24}
					color="black"
					style={{ marginRight: 10 }}
				/>
				<TextInput
					style={styles.loginInput}
					placeholder="Name"
					keyboardType="email-address"
					autoCapitalize="none"
					value={name}
					onChangeText={setName}
				/>
			</View>

			{/* Trường username */}
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
					placeholder="Retype password"
					secureTextEntry
					value={retypePassword}
					onChangeText={setRetypePassword}
				/>
			</View>
			<TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
				{loading ? <ActivityIndicator color="#fff" /> : <Text>Register</Text>}
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
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
		backgroundColor: '#159dbf',
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
	},
})

export default RegisterScreen
