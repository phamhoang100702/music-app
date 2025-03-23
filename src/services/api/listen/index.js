import { get, post, put } from '../../utils'

export const saveListen = async (object) => {
	return await post('listen', object)
}

export const countListenByDay = async (token = '') => {
	return await get('listen/top-of-the-day')
}

export const countListenByMonth = async (token = '') => {
	return await get('listen/top-of-the-month')
}
export const countListenByWeek = async (token = '') => {
	return await get('listen/top-of-the-week')
}

export const countListenAll = async (token = '') => {
	return await get('Listen/all')
}

export const getTotalListen = async (token = '') => {
	return await get('Listen/count')
}


/// get top song
