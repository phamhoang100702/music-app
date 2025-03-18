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
	accessToken: 'eyJhbGciOiJSUzI1NiJ9.eyJhY2Nlc3MiOnRydWUsImF1IjpbIlVTRVIiLCJTSU5HRVIiXSwiZSI6ImpvamkiLCJpZCI6MiwiZXhwIjoxNzQyMzcxODQyfQ.rf8nDo3DI42g8hxYW12fR2XJkP3xZMblQsHmReH_EoInOgKHrTvPpBE8Z0Od0EsjezMPJDyAdh3mCjk75yphgve0Rh_6G256LqTzDp6zEPvb7_OE71TfPk3swqnml8vy1xiLY5UUf1_ScojHJLdd4WOK5VyyBdxYMMQEFLTFoak5-3LRwZNjLV3n1-eMQ1hyLP7a663vV8ODMqY4_FgI7qt5SvlkrXFceuaUdviK4TJOcGlXdWZ_fXWPAU2VJ6HWDxHNL7Pk-f7sZzkZaGahbW6_LzNRF17LCExUt_MMIk1OcCAPuXnxJ2idVgENdS9dOJRmAd-d36i4if-1WIRDrA',
	refreshToken: 'eyJhbGciOiJSUzI1NiJ9.eyJhY2Nlc3MiOmZhbHNlLCJhdSI6WyJVU0VSIiwiU0lOR0VSIl0sImUiOiJqb2ppIiwiaWQiOjIsImV4cCI6MTc0MjcwMzE5MH0.ciq5KegKlvNrfcNhgHnRilk0TgCnpd3PVYJSntYbkHOdqcUI6rZRgbFLqajI-YGVGyeDg_1Gb-OPWUhDQCAGGVY-783COtfhtsGNEBx0-aCTtujAt88H_2TQiY_Z-8752R4HT5Gi09pLt0U9BAgEwVYZb46qzeqDqnDKLDq0vJdGmZkL5FcEcQeZCzC_jtyvvPe2wxZsfPycM3GTI5mYeQ6245oExdgW8HEkDvlBpjZJB8SaRonQ39gobJOEGE4uAMgMtYoWsjsbN2r9CGWRvAS7siDYbeZrr4pKiOVj_pFr58jmC_rfWX5eLGtiE0z7_DSFCfvwNylzOGZ4ejAjdg',
}

export const handleToken = (state = { ...initialToken }, action) => {
	switch (action.type) {
		case 'ADD_USER_TOKEN':
			return {
				...state,
				userToken: action.accessToken,
				refreshToken: action.refreshToken,
			}
		default:
			return state
	}
}
