import axios from 'axios';

// const server = 'https://askpro.online/api'; // server
const server = 'http://4cc7c665.ngrok.io'; // localhost

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

export function authUser(json) {
	return new Promise((resolve) => {
        serverRequest('/auth', json).then((res) => {
            resolve(res.data);
        });
	});
}

export function regUser(json) {
	return new Promise((resolve) => {
        serverRequest('/reg', json).then((res) => {
            resolve(res.data);
        });
	});
}

export function createProject(json) {
	return new Promise((resolve) => {
        serverRequest('/project/create', json).then((res) => {
            resolve(res.data);
        });
	});
}
