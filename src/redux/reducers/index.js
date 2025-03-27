import { combineReducers } from 'redux'
import { handleAuth, handleToken } from './auth/index.js'
import { handleSongQueue } from './songQueue/index.js'
import { handleFavorite } from './favorite/index.js'
import { handlePlaylist } from './playlist/index.js'
import { handleLyric } from './lyric/index.js'
import { handleFollowedSinger } from './singer'

export const allReducer = combineReducers({
	token: handleToken,
	auth: handleAuth,
	songQueue: handleSongQueue,
	favorite: handleFavorite,
	playlist: handlePlaylist,
	followedSinger: handleFollowedSinger,
})
