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

    ////DONE////
    //////////////////////*********ABOUT ME***********///////////////////////////
    getInfoAboutMe = () => {
        return this.fetch(`http://localhost:8080/api/users/myPage/getDetailUserInfo`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    getMyTasks = () => {
        return this.fetch(`http://localhost:8080/api/users/myPage/getMyTasks`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    getMyProjects = (page = 1) => {
        return this.fetch(`http://localhost:8080/api/users/my-id/ownedProjects?page=${page}`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    getParticipantesProjects = (page) => {
        return this.fetch(`http://localhost:8080/api/users/myPage/partnershipProjects?page=${page}`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    getCommentsForMe = () => {
        return this.fetch(`http://localhost:8080/api/users/myPage/comments`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    ////DONE/////
    //////////////////////*********EDIT INFO ABOUT ME**********///////////////////////////

    updateUser = (user) => {
        console.log("USER ");
        return this.fetch(`http://localhost:8080/api/users/myPage/update`, {
            method: 'PUT',
            body: user,
        }).then(res => {
            return res;
        })
    };

    addLanguage = (data) => {
        return this.fetch(`http://localhost:8080/api/users/myPage/update/createLanguageLevel`, {
            method: 'POST',
            body: data,
        }).then(res => {
            return res;
        })
    };

    deleteLanguageLevel = (id) => {
        return this.fetch(`http://localhost:8080/api/users/myPage/update/deleteLanguageLevel"`, {
            method: 'DELETE',
            body: id,
        }).then(res => {
            return res;
        })
    };

    addEducation = (data) => {
        return this.fetch(`http://localhost:8080/api/users/myPage/update/deleteEducation`, {
            method: 'POST',
            body: data,
        }).then(res => {
            return res;
        })
    };

    deleteEducation = (id) => {
        return this.fetch(`http://localhost:8080/api/users/myPage/update/deleteEducation`, {
            method: 'DELETE',
            body: id,
        }).then(res => {
            return res;
        })
    };

    addSkill = (data) => {
        return this.fetch(`http://localhost:8080/api/users/myPage/update/createUserSkill`, {
            method: 'POST',
            body: data,
        }).then(res => {
            return res;
        })
    };

    deleteSkill = (id) => {
        return this.fetch(`http://localhost:8080/api/users/myPage/update/deleteUserSkill`, {
            method: 'DELETE',
            body: id,
        }).then(res => {
            return res;
        })
    };

    addWorkExperience = (data) => {
        return this.fetch(`http://localhost:8080/api/users/myPage/update/createWorkExperience`, {
            method: 'POST',
            body: data,
        }).then(res => {
            return res;
        })
    };

    deleteWorkingPlace = (id) => {
        return this.fetch(`http://localhost:8080/api/users/myPage/update/deleteWorkExperience`, {
            method: 'DELETE',
            body: id,
        }).then(res => {
            return res;
        })
    };

    //////////////////////*********ABOUT USERS**********///////////////////////////

    getInfoAboutUser = (userId) => {
        return this.fetch(`http://localhost:8080/api/user/${userId}`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    getUserProjects = (userId) => {
        return this.fetch(`http://localhost:8080/api/user/${userId}/projects`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    getCommentsForUser = (userId) => {
        return this.fetch(`http://localhost:8080/api/user/${userId}/comments`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    //////////////////////*********Project**********///////////////////////////

    getProject = (projectId) => {
        return this.fetch(`http://localhost:8080/api/projects/${projectId}`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    getProjects = (page) => {
        return this.fetch(`http://localhost:8080/api/projects?page=${page}`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    createProject = (project) => {
        const formData = new FormData();
        for (let key in project) {
            formData.append(key, project[key]);
        }
        for (let key of formData.keys()) {
            console.log(key + ': ' + formData.get(key));
        }
        return this.fetch(`http://localhost:8080/api/projects/createProject`, {
            method: 'POST',
            body: formData,
        }).then(res => {
            return res;
        })
    };

    //////////////////////*********EDIT PROJECT**********///////////////////////////

    updateProject = (id, data) => {
        console.log(data);
        return this.fetch(`http://localhost:8080/api/projects/${id}/update/`, {
            method: 'POST',
            body: data,
        }).then(res => {
            return res;
        })
    };

    addCategory = (id, data) => {
        return this.fetch(`/api/projects/${id}/addProjectSubCategory`, {
            method: 'POST',
            body: data,
        }).then(res => {
            return res;
        })
    };

    deleteCategory = (id, data) => {
        return this.fetch(`/api/projects/${id}/deleteProjectSubCategory`, {
            method: 'DELETE',
            body: data,
        }).then(res => {
            return res;
        })
    };

    //////////////////////*********Tasks**********///////////////////////////

    getAllTasks = (page) => {
        return this.fetch(`http://localhost:8080/api/tasks?page=${page}`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    getProjectTasks = (projectId) => {
        return this.fetch(`http://localhost:8080/api/projects/${projectId}/tasks`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    getTaskData = (taskId) => {
        return this.fetch(`http://localhost:8080/api/tasks/getTask/${taskId}`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    getActiveTasks = (projectId, page = 1) => {
        return this.fetch(`http://localhost:8080/api/projects/${projectId}/tasks/tasksRunning?page=${page}`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    getOpenedTasks = (projectId, page = 1) => {
        return this.fetch(`http://localhost:8080/api/projects/${projectId}/tasks/tasksOpened?page=${page}`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    getClosedTasks = (projectId, page = 1) => {
        return this.fetch(`http://localhost:8080/api/projects/${projectId}/tasks/tasksClosed?page=${page}`, {
            method: 'GET',
        }).then(res => {
            return res;
        })
    };

    createTask = (task) => {
        const formData = new FormData();
        for (let key in task) {
            formData.append(key, task[key]);
        }
        for (let key of formData.keys()) {
            console.log(key + ': ' + formData.get(key));
        }
        return this.fetch(`http://localhost:8080/api/projects/${task.project_id}/newTask`, {
            method: 'POST',
            body: formData,
        }).then(res => {
            return res;
        })
    };

    sendRequestOnTaskExecution = (projectId, formData) => {
        return this.fetch(`http://localhost:8080/api/projects/${projectId}/tasks/newTaskReply`, {
            method: 'POST',
            body: formData,
        }).then(res => {
            return res;
        })
    };

    /////////////////////////********************************///////////////////////////////

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