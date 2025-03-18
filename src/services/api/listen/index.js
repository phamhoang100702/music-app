import { get, post, put } from '../../utils'

export const saveListen = async (object, token = '') => {
	return await post('listen', object, token)
}

export const countListenByDay = async (token = '') => {
	return await get('listen/top-of-the-day', token)
}

export const countListenByMonth = async (token = '') => {
	return await get('listen/top-of-the-month', token)
}
export const countListenByWeek = async (token = '') => {
	return await get('listen/top-of-the-week', token)
}

export const countListenAll = async (token = '') => {
	return await get('Listen/all', token)
}

export const getTotalListen = async (token = '') => {
	return await get('Listen/count', token)
}


/// get top song
