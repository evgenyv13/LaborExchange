import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyPage from '../../User/MyPage/MyPage';
import MyProjects from '../../Projects/MyProjects/MyProjects';
import ParticipantesProjects from '../../Projects/ParticipantesProjects/ParticipantesProjects';
import ProjectsCatalog from '../../Projects/ProjectsCatalog/ProjectsCatalog';
import Header from '../../Header/Header';
import CreateProject from '../../Projects/CreateProject/CreateProject';
import ProjectPage from '../../Projects/ProjectPage/ProjectPage';
import TaskPage from '../../Tasks/TaskPage/TaskPage';
import AuthService from '../../AuthService';
import withAuth from '../../withAuth';
import TasksCatalog from '../../Tasks/TasksCatalog/TasksCatalog';
import CreateTask from '../../Tasks/CreateTask/CreateTask';
import EditUser from '../../User/EditUser/EditUser';
import EditProject from '../../Projects/EditProject/EditProject';
import UserPage from '../../User/UserPage/UserPage';
import Error from '../Error/Error';
import './Account.styles.css';
import LandingPage from '../../Landing/LandingPage/LandingPage';
import Exchange from '../../Exchange/Exchange';

const Auth = new AuthService();

class Account extends Component {
  handleLogout = () => {
    AuthService.logout();
    this.props.history.replace('/');
  };

  handleClickOnSiteName = () => {
    this.props.history.replace('/');
  };

  render() {
    return (
      <Router>
        <div>
          <Header
            handleLogout={this.handleLogout}
            handleClickOnSiteName={this.handleClickOnSiteName}
          />
          <div className="content-background">
            <Switch>
              <Route path="/account/my-projects" component={MyProjects} />
              <Route
                path="/account/participantes-projects"
                component={ParticipantesProjects}
              />
              <Route
                path="/account/projects-catalog"
                component={ProjectsCatalog}
              />
              <Route path="/account/create-project" component={CreateProject} />
              <Route path="/account/project/:id" component={ProjectPage} />
              <Route path="/account/edit-project/:id" component={EditProject} />
              <Route component={Error} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default withAuth(Account);
