import axios from 'axios';

const server = 'https://askpro.online/api'; // server
//const server = 'http://4cc7c665.ngrok.io'; // localhost

function serverRequest(link, json = {}) {
    if (JSON.parse(localStorage.getItem('user')).mail !== undefined) {
        json.user_mail = JSON.parse(localStorage.getItem('user')).mail;
    }
    return axios.post(server + link, json);
}

export function getProjects() {
    return new Promise((resolve) => {
        serverRequest('/projects').then((res) => {
            resolve(res.data);
        });
    });
}

export function getProjectsFilter(json) {
    return new Promise((resolve) => {
        serverRequest('/projects/filter', json).then((res) => {
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

export function authSocialAccount(json) {
    return new Promise((resolve) => {
        serverRequest('/social', json).then((res) => {
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
