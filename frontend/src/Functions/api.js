import axios from 'axios';

const server = 'http://localhost:5500';

function serverRequest(link) {
    const json = {
        name: 'Leonid',
    };
    return axios.post(server + link, json);
}

export function getProjects() {
	return new Promise((resolve) => {
        serverRequest('/projects').then((res) => {
            resolve(res.data);
        });
	});
}

export function getProject(_projectId) {
	return new Promise((resolve) => {
        serverRequest(`/project/${_projectId}`).then((res) => {
            resolve(res.data);
        });
	});
}

export function rateProject(_projectId, _type) {
	return new Promise((resolve) => {
        serverRequest(`/project/${_projectId}/like/${_type}`).then((res) => {
            resolve(res.data);
        });
	});
}
