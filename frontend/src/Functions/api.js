import axios from 'axios';

const server = 'https://askpro.online:5500';

function serverRequest(link, json = {}) {
    json.name = 'Leonid';
    return axios.post(server + link, json);
}

export function getProjects() {
	return new Promise((resolve) => {
        serverRequest('/projects').then((res) => {
            resolve(res.data);
        });
	});
}

export function getProject(json) {
	return new Promise((resolve) => {
        serverRequest('/project', json).then((res) => {
            resolve(res.data);
        });
	});
}

export function rateProject(json) {
	return new Promise((resolve) => {
        serverRequest('/project/like', json).then((res) => {
            resolve(res.data);
        });
	});
}
