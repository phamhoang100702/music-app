import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ACCESS_TOKEN } from '@/constants/constant'
import { getToken, saveDataStorage } from '@/services/api/auth/setToken'
import { getUserInformation } from '@/services/api/user'
import { login } from '@/redux/actions/auth'
import { getAllFavoriteSong } from '@/services/api/playlist'
import { updateFavoritePlaylist } from '@/redux/actions/favorite'
import { getAccessToken } from '@/services/api/auth'

export const handleLogin = async (dispatch: any, router: any) => {
	const token = await getToken(ACCESS_TOKEN)

	if (!token) {
		router.replace('/(auth)/login')
		return
	}
	const userResponse = await getUserInformation()
	if (userResponse.content) {
		dispatch(login(userResponse.content))
		const favoriteResponse = await getAllFavoriteSong()
		dispatch(updateFavoritePlaylist(favoriteResponse.content.map((song: any) => ({ ...song, url: song.sound }))))
	} else {
		await handleTokenExpiration(dispatch, router)
	}
}

export const handleTokenExpiration = async (dispatch: any, router: any) => {
	const newToken = await getAccessToken()

	if (!newToken.content) {
		router.replace('/(auth)/login')
		return
	}

	await saveDataStorage(ACCESS_TOKEN, newToken)
	await handleLogin(dispatch, router)
}

