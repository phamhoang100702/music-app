import { del, get, post, put, uploadFile } from '../../utils'

//TODO:
export const updateSinger = async (object = {}, token = '') => {
	return await put('user', object, token)
}

export const getAllSinger = async ( token = '') => {
	return await get(`user/singer/get-all`, token)
}

export const searchSingersByKeyword = async (keyword = '', page = 0, size = 10, token = '') => {
	return await get(`user/singer?keyword=${keyword}&page=${page}&size=${size}`, token)
}


// top singer
export const getTopSinger = async (top, token = '') => {
	return await get(`follower/top-singer/${top}`, token)
}

export const getFollowedSinger = async (id, token = '') => {
	return await get(`follower/followed-singers/${id}`, token)
}
export const getListFollower = async (id, token = '') => {
	return await get(`follower/total-followers/${id}`, token)
}
export const addFollow = async (singerId, token = '') => {
	return await post(`follower/follow/${singerId}`, token)
}
export const removeFollow = async (singerId, token = '') => {
	return await del(`follower/unfollow/${singerId}`, token)
}
