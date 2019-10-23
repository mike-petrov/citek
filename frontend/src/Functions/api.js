import axios from 'axios';

const server = 'http://7813677c.ngrok.io';

function serverRequest(link) {
    const json = {
        name: 'Leonid',
    };
    return axios.post(server + link, json);
}

export function getCards() {
	return new Promise((resolve) => {
        serverRequest('/cards').then((res) => {
            resolve(res.data);
        });
	});
}

export function rateCard(_cardId, _type) {
	return new Promise((resolve) => {
        serverRequest(`/card/${_cardId}/like/${_type}`).then((res) => {
            resolve(res.data);
        });
	});
}
