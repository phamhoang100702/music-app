import { get, put, post, del, put_form_data } from '../../utils'

export const searchAllUser = async (name, token) => {
	return await get(`user?name=${name}`, token)
}

export const getUserById = async (id, token = '') => {
	return await get(`user/${id}`, token)
}

export const updateUserWithFormData = async (obj, token = '') => {
	return await put_form_data('user/change-information', obj, token)
}

export const changePassword = async (obj, token = '') => {
	return await put('user/change-password', obj, token)
}


export const getHistoryByUserId = async (id, token = '') => {
	return await get(`listen/history/${id}`, token)
}

export const getUserInformation = async (token) => {
	return await post('user/information', {},token)
}

