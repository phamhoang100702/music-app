import { del, get, post, put } from '../../utils'

// them cai creator
export const savePlaylistForUser = async (object, token = '') => {
	const playlist = {
		...object,
		role: 'USER',
	}
	return await post('playlist', playlist, token)
}

export const getPlaylistByPlaylistId = async (playlistId, token = '') => {
	return await get(`playlist/${playlistId}`, token)
}

export const savePlaylistForMainPage = async (object, token = '') => {
	const playlist = {
		...object,
		role: 'MAINPAGE',
	}
	return await post('playlist', playlist, token)
}
export const getFavoritePlaylistByUserId = async (token = '') => {
	return await get(`playlist/favorite`, token)
}

export const getAllPlaylistByUserId = async (userId, token = '') => {
	return await get(`playlist/get-owned-playlist/${userId}`, token)
}

export const getAllFavoriteSong = async (token = '') => {
	return await get(`playlist/favorite/songs`, token)
}

// main page user/ censor
export const getAllMainpagePlayList = async (token = '') => {
	return await get('playlist/mainpage', token)
}
// search for user
export const searchAllPlaylistByNameForUser = async (keyword = '', page = 0, size = 10, token = '') => {
	return await get(`playlist?keyword=${keyword}&size=${size}&page=${page}`, token)
}

export const updatePlaylist = async (options, token = '') => {
	return await put('playlist', options, token)
}

export const deletePlaylist = async (playlistId, token = '') => {
	return await del(`playlist/${playlistId}`, token)
}

// get all  Song
export const getAllSongByPlaylistId = async (id, token = '') => {
	return await get(`playlist/song/${id}`, token)
}

export const addSongToPlaylist = async (playlistId, songId, token = '') => {
	return await post(`playlist/${playlistId}/song/${songId}`, token)
}
// add array to playlist
export const addSongsToPlaylist = async (playlistId, object, token = '') => {
	return await post(`playlist/${playlistId}/song`, object, token)
}

export const removeSongFromPlaylist = async (playlistId, songId, token = '') => {
	return await del(`playlist/${playlistId}/song/${songId}`, token)
}

export const getTotalPlaylist = async () => {
	return await get(`playlist/count`)
}


export const addSongToFavoritePlaylist = async (songId, token) => {
	return await post(`playlist/favorite/${songId}`, {}, token)
}

export const removeSongToFavoritePlaylist = async (songId, token) => {
	return await del(`playlist/favorite/${songId}`, token)
}
