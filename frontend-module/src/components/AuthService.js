import decode from 'jwt-decode';
export default class AuthService {
    constructor() {
        AuthService.fetch = AuthService.fetch.bind(this);
        this.login = this.login.bind(this);
        AuthService.getProfile = AuthService.getProfile.bind(this);
    }

    login(formData) {
        return AuthService.fetch(`http://localhost:8080/auth`, {
            method: 'POST',
            body: formData
        }).then(res => {
            AuthService.setToken(res.token, formData.username, res.role);
            return Promise.resolve(res);
            
        })
    }

    static signUp(formData) {
        return AuthService.fetch(`http://localhost:8080/registration`, {
            method: 'POST',
            body: formData
        }).then(res => {
            return res;
        })
    }

    static loggedIn() {
        const token = AuthService.getToken();
        return !!token && !AuthService.isTokenExpired(token)
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

    static setToken(token, username, role) {
        localStorage.setItem('Auth-token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
    }

    static getToken() {
        return localStorage.getItem('Auth-token')
    }

    static logout() {
        localStorage.removeItem('Auth-token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
    }

    static getProfile() {
        return decode(AuthService.getToken());
    }


    static fetch(url, options) {
        const headers = {};
        return fetch(url, {
            headers,
            ...options
        })
            .then(AuthService._checkStatus)
            .then(response => response.json())
    }

    static _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            let error = new Error(response.statusText)
            error.response = response;
            throw error
        }
    }
}