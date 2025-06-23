import {getLocalStorage} from "../../localStorage/index.js";
import { DOMAIN, getDataResponse } from '../../utils'

const CHATBOT_DOMAIN  = `http://${DOMAIN}:5005/webhooks/rest/webhook`;

export const send_message = async (options = {}) => {
	const response = await fetch(CHATBOT_DOMAIN, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${getLocalStorage('user-token')}`
		},
		body: JSON.stringify(options),
	});
	return getDataResponse(response);
};

export const getSongChatBot = (song) => {
	let singerNames;
	if (song.singers) {
		singerNames = song.singers.map(singer => singer.name).join(", ");
	}
	return `${song.title} - ${singerNames}`
}

export const getSongsChatBot = (songs) => {
	return songs.map(song => getSongChatBot(song)).join(", \n ");
}

export const getSongsChatBotWithoutSingerName = (songs) => {
	return songs.map(song => getSongChatBot(song)).join(", \n ");
}
