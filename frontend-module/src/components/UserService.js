import React from 'react';
import decode from 'jwt-decode';

export default class UserService {
    constructor() {
        this.fetch = this.fetch.bind(this)
        UserService.getProfile = UserService.getProfile.bind(this)
    }

    static loggedIn() {
        const token = UserService.getToken()
        return !!token && !UserService.isTokenExpired(token)
    }

    static isTokenExpired(token) {
        try {
            const decoded = decode(token);
            return decoded.exp < Date.now() / 1000;
        }
        catch (err) {
            return false;
        }
    }

    static getProfile() {
        return decode(UserService.getToken());
    }

    static getToken() {
        return localStorage.getItem('Auth-token')
    }

    fetch(url, options) {
        const headers = {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json'
        };

        if (UserService.loggedIn()) {
            headers['Auth-Token'] = UserService.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(UserService._checkStatus)
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    static _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}