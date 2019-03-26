import decode from 'jwt-decode';

export default class UserService {
  constructor() {
    this.fetch = this.fetch.bind(this);
    UserService.getProfile = UserService.getProfile.bind(this);
  }

  static loggedIn() {
    const token = UserService.getToken();
    return !!token && !UserService.isTokenExpired(token);
  }

  static isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  static getProfile() {
    return decode(UserService.getToken());
  }

  static getToken() {
    return localStorage.getItem('Auth-token');
  }

  static _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  fetch(url, options) {
    const headers = {
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json'
    };

    if (UserService.loggedIn()) {
      headers['Auth-Token'] = UserService.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(UserService._checkStatus)
      .then(response => response.json())
      .catch(error => {
        return error;
      });
  }

  ////DONE////
  //////////////////////*********ABOUT ME***********///////////////////////////
  getInfoAboutMe = () => {
    return this.fetch(
      `http://localhost:8080/api/users/myPage/getDetailUserInfo`,
      {
        method: 'GET'
      }
    );
  };

  getMyTasks = () => {
    return this.fetch(`http://localhost:8080/api/users/myPage/getMyTasks`, {
      method: 'GET'
    });
  };

  getMyProjects = (page = 1) => {
    return this.fetch(
      `http://localhost:8080/api/users/myPage/ownedProjects?page=${page}`,
      {
        method: 'GET'
      }
    );
  };

  getParticipantesProjects = page => {
    return this.fetch(
      `http://localhost:8080/api/users/myPage/partnershipProjects?page=${page}`,
      {
        method: 'GET'
      }
    );
  };

  getCommentsForMe = () => {
    return this.fetch(`http://localhost:8080/api/users/myPage/comments`, {
      method: 'GET'
    });
  };

  ////DONE/////
  //////////////////////*********EDIT INFO ABOUT ME**********///////////////////////////

  updateUser = user => {
    return this.fetch(`http://localhost:8080/api/users/myPage/update`, {
      method: 'PUT',
      body: user
    });
  };

  addLanguage = data => {
    return this.fetch(
      `http://localhost:8080/api/users/myPage/update/createLanguageLevel`,
      {
        method: 'POST',
        body: data
      }
    );
  };

  deleteLanguageLevel = id => {
    return this.fetch(
      `http://localhost:8080/api/users/myPage/update/deleteLanguageLevel"`,
      {
        method: 'DELETE',
        body: id
      }
    );
  };

  addEducation = data => {
    return this.fetch(
      `http://localhost:8080/api/users/myPage/update/deleteEducation`,
      {
        method: 'POST',
        body: data
      }
    );
  };

  deleteEducation = id => {
    return this.fetch(
      `http://localhost:8080/api/users/myPage/update/deleteEducation`,
      {
        method: 'DELETE',
        body: id
      }
    );
  };

  addSkill = data => {
    return this.fetch(
      `http://localhost:8080/api/users/myPage/update/createUserSkill`,
      {
        method: 'POST',
        body: data
      }
    );
  };

  deleteSkill = id => {
    return this.fetch(
      `http://localhost:8080/api/users/myPage/update/deleteUserSkill`,
      {
        method: 'DELETE',
        body: id
      }
    );
  };

  addWorkExperience = data => {
    return this.fetch(
      `http://localhost:8080/api/users/myPage/update/createWorkExperience`,
      {
        method: 'POST',
        body: data
      }
    );
  };

  deleteWorkingPlace = id => {
    return this.fetch(
      `http://localhost:8080/api/users/myPage/update/deleteWorkExperience`,
      {
        method: 'DELETE',
        body: id
      }
    );
  };

  //////////////////////*********ABOUT USERS**********///////////////////////////

  getInfoAboutUser = userId => {
    return this.fetch(`http://localhost:8080/api/users/${userId}`, {
      method: 'GET'
    });
  };

  getUserProjects = userId => {
    return this.fetch(`http://localhost:8080/api/user/${userId}/projects`, {
      method: 'GET'
    });
  };

  getCommentsForUser = userId => {
    return this.fetch(`http://localhost:8080/api/user/${userId}/comments`, {
      method: 'GET'
    });
  };

  //////////////////////*********Project**********///////////////////////////

  getProject = projectId => {
    return this.fetch(`http://localhost:8080/api/projects/${projectId}`, {
      method: 'GET'
    });
  };

  getProjects = page => {
    return this.fetch(`http://localhost:8080/api/projects?page=${page}`, {
      method: 'GET'
    });
  };

  createProject = project => {
    const formData = new FormData();
    for (let key in project) {
      formData.append(key, project[key]);
    }
    return this.fetch(`http://localhost:8080/api/projects/createProject`, {
      method: 'POST',
      body: formData
    });
  };

  //////////////////////*********EDIT PROJECT**********///////////////////////////

  updateProject = (id, data) => {
    return this.fetch(`http://localhost:8080/api/projects/${id}/update/`, {
      method: 'POST',
      body: data
    });
  };

  addCategory = (id, data) => {
    return this.fetch(`/api/projects/${id}/addProjectSubCategory`, {
      method: 'POST',
      body: data
    });
  };

  deleteCategory = (id, data) => {
    return this.fetch(`/api/projects/${id}/deleteProjectSubCategory`, {
      method: 'DELETE',
      body: data
    });
  };

  //////////////////////*********Tasks**********///////////////////////////

  getAllTasks = page => {
    return this.fetch(`http://localhost:8080/api/tasks?page=${page}`, {
      method: 'GET'
    });
  };

  getProjectTasks = projectId => {
    return this.fetch(`http://localhost:8080/api/projects/${projectId}/tasks`, {
      method: 'GET'
    });
  };

  getTaskData = taskId => {
    return this.fetch(
      `http://localhost:8080/api/projects/allProjects/tasks/${taskId}`,
      {
        method: 'GET'
      }
    );
  };

  getActiveTasks = (projectId, page = 1) => {
    return this.fetch(
      `http://localhost:8080/api/projects/${projectId}/tasks/tasksRunning?page=${page}`,
      {
        method: 'GET'
      }
    );
  };

  getOpenedTasks = (projectId, page = 1) => {
    return this.fetch(
      `http://localhost:8080/api/projects/${projectId}/tasks/tasksOpened?page=${page}`,
      {
        method: 'GET'
      }
    );
  };

  getClosedTasks = (projectId, page = 1) => {
    return this.fetch(
      `http://localhost:8080/api/projects/${projectId}/tasks/tasksClosed?page=${page}`,
      {
        method: 'GET'
      }
    );
  };

  createTask = task => {
    const formData = new FormData();
    for (let key in task) {
      formData.append(key, task[key]);
    }
    return this.fetch(
      `http://localhost:8080/api/projects/${task.project_id}/newTask`,
      {
        method: 'POST',
        body: formData
      }
    );
  };

  sendRequestOnTaskExecution = formData => {
    return this.fetch(
      `http://localhost:8080/api/projects/projectId/tasks/newTaskReply`,
      {
        method: 'POST',
        body: formData
      }
    );
  };

  approveUserOnTaskExecution = formData => {
    return this.fetch(
      `http://localhost:8080/api/projects/projectId/tasks/acceptTaskReply`,
      {
        method: 'PUT',
        body: formData
      }
    );
  };

  ///////////////////////////// TOKENS ///////////////////////////////////////////

  sellProjectTokens = (projectId, tokensAmount) => {
    return this.fetch(
      `http://localhost:8080/api/projects/${projectId}/tokens`,
      {
        method: 'POST',
        body: tokensAmount
      }
    );
  };

  getProjectOwners = (projectId, page) => {
    return this.fetch(
      `http://localhost:8080/api/projects/${projectId}/projectTokenOwners?page=${page}`,
      {
        method: 'GET'
      }
    );
  };

  getProjectTokenSalary = (projectId, page) => {
    return this.fetch(
      `http://localhost:8080/api/projects/${projectId}/projectSalaryTokens?page=${page}`,
      {
        method: 'GET'
      }
    );
  };

  setProjectTokenPrice = (projectId, tokenPrice) => {
    return this.fetch(
      `http://localhost:8080/api/projects/${projectId}/tokens/setTokenPrice`,
      {
        method: 'POST',
        body: tokenPrice
      }
    );
  };

  backSellProjectTokens = (projectId, tokensAmount) => {
    return this.fetch(
      `http://localhost:8080/api/projects/${projectId}/tokens`,
      {
        method: 'DELETE',
        body: tokensAmount
      }
    );
  };

  buyToken = tokenAmount => {
    return this.fetch(`http://localhost:8080/api/tokens/buyToken`, {
      method: 'POST',
      body: tokenAmount
    });
  };

  getTokenTrading = page => {
    return this.fetch(
      `http://localhost:8080/api/projects/tokenTrading?page=${page}`,
      {
        method: 'GET'
      }
    );
  };

  getUserTokens = page => {
    return this.fetch(`http://localhost:8080/api/users/myTokens?page=${page}`, {
      method: 'GET'
    });
  };
}
