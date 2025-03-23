export const handleAuth = (state = {}, actions) => {
	switch (actions.type) {
		case 'USER_LOGIN':
			return {
				...actions.info,
			}
		case 'USER_LOGOUT':
			return {}
		default:
			return state
	}
}

const initialToken = {
	accessToken: '',
	refreshToken: '',
}

export const handleToken = (state = { ...initialToken }, action) => {
	switch (action.type) {
		case 'ADD_USER_TOKEN':
			return {
				...state,
				accessToken: action.accessToken,
				refreshToken: action.refreshToken,
			}
		default:
			return state
	}
}
