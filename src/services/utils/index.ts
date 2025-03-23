import { CLIENT_ERROR, SUCCESS } from '../../constants/status'
import { getToken } from '@/services/api/auth/setToken'

const API_DOMAIN = 'http://192.168.1.230:8888/api/v1/'


export const getDataResponse = async (response: any) => {
	if (response.status == SUCCESS) {
		return await response.json()
	} else if (response.status == CLIENT_ERROR) {
		return null
	} else {
		return 1
	}
}

export const get = async (path: string) => {
	const token = await getToken('accessToken')
	const response = await fetch(API_DOMAIN + path, {
		method: 'GET',
		headers: {
			'Content-Type': `application/json`,
			'Authorization': `Bearer ${token}`,
		},
		// header
	})
	return getDataResponse(response)
}

export const post = async (path: string, options: any) => {
	const token = await getToken('accessToken')
	const response = await fetch(API_DOMAIN + path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify(options),
	})
	return getDataResponse(response)
}

export const post_form_data = async (path: string, options: any) => {
	const token = await getToken('accessToken')
	const response = await fetch(API_DOMAIN + path, {
		method: 'POST',
		body: options,
		headers: {
			'Authorization': `Bearer ${token}`,
		},
	})
	return getDataResponse(response)
}

export const put = async (path: string, options: any) => {
	const token = await getToken('accessToken')
	const response = await fetch(API_DOMAIN + path, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify(options),
	})
	return getDataResponse(response)
}


export const put_form_data = async (path: string, options: any) => {
	const token = await getToken('accessToken')
	const response = await fetch(API_DOMAIN + path, {
		method: 'PUT',
		body: options,
		headers: {
			'Authorization': `Bearer ${token}`,
		},
	})
	return getDataResponse(response)
}

export const del = async (path: string) => {
	const token = await getToken('accessToken')
	const response = await fetch(API_DOMAIN + path, {
		method: 'DELETE',
		headers: {
			'Content-Type': `application/json`,
			'Authorization': `Bearer ${token}`,
		},
	})
	if (!response.ok) {
		return getDataResponse(response)
	}
}

export const uploadFile = async (path: string, formData: any) => {
	const token = await getToken('accessToken');
	const response = await fetch(API_DOMAIN + path, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
		},
		body: formData,
	})
	return getDataResponse(response)
}

