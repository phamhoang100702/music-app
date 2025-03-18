const Auth_Domain = 'http://localhost:8888/auth/'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshTokenAPI } from './authService'; // API refresh token
import { login, updateFavoritePlaylist } from './redux/actions'; // Redux actions
import { getUserInformation, getAllFavoriteSong } from './apiService'; // API gọi user info & favorite song

const post = async (path, options = {}) => {
	const response = await fetch(Auth_Domain + path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(options),
	})
	return await response.json()
}

export const userLogin = async (options) => {
	return await post('login', options)
}

export const userRegister = async (options) => {
	return await post('register', options)
}

export const getAccessToken = async (token) => {
	return await post(`get-token?token=${token}`)
}


const fetchUserData = async (dispatch,token) => {
	try {
		let userResponse = await getUserInformation(token.accessToken);
		if (userResponse.content) {
			dispatch(login(userResponse.content));
			let favoriteResponse = await getAllFavoriteSong(token.accessToken);
			dispatch(updateFavoritePlaylist(favoriteResponse.content));
		} else {
			console.log("Failed to fetch user data");
		}
	} catch (error) {
		console.log("Error fetching user data:", error);

		// Nếu lỗi là 401 (Unauthorized), gọi refreshToken và thực hiện lại quá trình
		if (error.response?.status === 401) {
			console.log("Token expired, refreshing...");

			try {
				const newTokens = await refreshTokenAPI();
				await AsyncStorage.setItem('accessToken', newTokens.accessToken);
				await AsyncStorage.setItem('refreshToken', newTokens.refreshToken);

				console.log("Token refreshed, retrying request...");

				// Gọi lại chính nó sau khi refresh token
				await fetchUserData(dispatch);
			} catch (refreshError) {
				console.log("Refresh token failed, logging out...");
				await AsyncStorage.removeItem('accessToken');
				await AsyncStorage.removeItem('refreshToken');
				// Dispatch action để log out user (nếu có)
			}
		}
	}
};
