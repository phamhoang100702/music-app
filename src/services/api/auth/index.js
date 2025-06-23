import { getToken } from './setToken'
import { REFRESH_TOKEN } from '../../../constants/constant'

const Auth_Domain = 'http://192.168.1.230:8888/auth/'
const post = async (path, options = {}) => {
	console.log(Auth_Domain + path);
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

export const getAccessToken = async () => {
	const token = await getToken(REFRESH_TOKEN);
	if(token == null) return;
	return await post(`get-token?token=${token}`)
}
