import AsyncStorage from '@react-native-async-storage/async-storage'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/constant'

// Lưu token
export const saveToken = async (token: any) => {
	try {
		await AsyncStorage.setItem(ACCESS_TOKEN, token.accessToken)
		await AsyncStorage.setItem(REFRESH_TOKEN, token.refreshToken)
	} catch (error) {
		console.error('Lỗi khi lưu token:', error)
	}
}

export const saveDataStorage = async (key: any, token: any) => {
	try {
		await AsyncStorage.setItem(key, token)
	} catch (error) {
		console.error('Lỗi khi lưu token:', error)
	}
}
// Lấy token
export const getToken = async (key: any) => {
	try {
		const token = await AsyncStorage.getItem(key)
		return token
	} catch (error) {
		console.error('Lỗi khi lấy token:', error)
		return null
	}
}

// Xóa token (khi đăng xuất)
export const removeAccessToken = async () => {
	try {
		await AsyncStorage.removeItem('accessToken')
	} catch (error) {
		console.error('Lỗi khi xóa token:', error)
	}
}
