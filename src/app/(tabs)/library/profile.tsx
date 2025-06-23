import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { useRouter } from 'expo-router'
import { logout } from '@/redux/actions/auth'
import { Ionicons } from '@expo/vector-icons'

const ProfileScreen = () => {
	const auth = useSelector((state: any) => state.auth)
	const dispatch = useDispatch()
	const router = useRouter()

	const handleLogout = () => {
		dispatch(logout())
		router.push('/(auth)/login')
	}
	return (
		<View style={styles.container}>
			<Ionicons name="arrow-back" size={30} color="#fff" style={styles.backIcon} onPress={() => router.back()} />

			<FastImage source={{ uri: auth.avatar }} style={styles.avatar} />
			<Text style={styles.username}>@{auth.username}</Text>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
				<View style={styles.infoRow}><Text style={styles.label}>Nghệ danh</Text><Text style={styles.value}>{auth.name}</Text></View>
				<View style={styles.infoRow}><Text style={styles.label}>Tên đăng nhập</Text><Text
					style={styles.value}>{auth.username}</Text></View>
				<View style={styles.infoRow}><Text style={styles.label}>Tiểu sử</Text><Text
					style={styles.value}>{auth.bio}</Text></View>
				<View style={styles.infoRow}><Text style={styles.label}>Vai trò</Text><Text
					style={styles.value}>{auth.roles}</Text></View>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Login Information</Text>
				<View style={styles.infoRow}><Text style={styles.label}>Email</Text><Text
					style={styles.value}>{auth.username}@gmail.com</Text></View>
				<TouchableOpacity style={styles.changePassword}><Text style={styles.linkText}>
					Cập nhật mật khẩu
				</Text></TouchableOpacity>
			</View>
			<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
				<Text style={styles.logoutButtonText}>Logout</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		padding: 16,
	},
	backIcon: {
		alignSelf: 'flex-start',
		marginBottom: 10,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		alignSelf: 'center',
		marginBottom: 10,
	},
	username: {
		fontSize: 18,
		textAlign: 'center',
		color: '#fff',
		marginBottom: 20,
	},
	section: {
		backgroundColor: '#222',
		borderRadius: 10,
		padding: 12,
		marginBottom: 10,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 8,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#444',
	},
	label: {
		fontSize: 14,
		color: '#bbb',
	},
	value: {
		fontSize: 14,
		color: '#fff',
	},
	changePassword: {
		paddingVertical: 10,
		alignItems: 'center',
	},
	linkText: {
		color: '#1E90FF',
		fontSize: 14,
	},
	connected: {
		color: 'green',
	},
	needsVerification: {
		color: 'red',
	},
	logoutButton: {
		backgroundColor: '#e74c3c',
		paddingVertical: 12,
		borderRadius: 8,
		marginTop: 20,
		alignItems: 'center',
	},
	logoutButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
})

export default ProfileScreen
