import { del, get, post, post_form_data, put, put_form_data, uploadFile } from '../../utils'

export const searchSongByKeyword = async (keyword = '', page = 0, size = 20, token = '') => {
	return await get(`song?keyword=${keyword}&page=${page}&size=${size}`, token)
}

export const saveSong = async (options, token = '') => {
	return await post_form_data('song', options, token)
}
export const deleteSongById = async (songId = '', token = '') => {
	return await del('song/' + songId, token)
}

export const updateSong = async (object, token = '') => {
	return await put_form_data('song', object, token)
}

// la singer hoac admin
export const getAllSongByCreatorId = async (creatorId, token = '') => {
	return await get(`song/by-singer/${creatorId}`, token)
}

export const getSongsByCreator = async (token = '') => {
	return await get(`song/by-creator`, token)
}

export const getAllSongBySingerId = async (singerId, token = '') => {
	return await get(`song/by-singer/${singerId}`, token)
}

export const getTopSongWithMostListensByCategory = async () => {
	return await get(`song/topByCategory`, '')
}
