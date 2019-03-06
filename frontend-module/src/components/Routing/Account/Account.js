import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MyPage from '../../User/MyPage/MyPage';
import ProjectsCatalog from '../../Projects/ProjectsCatalog/ProjectsCatalog';
import Header from '../../Header/Header';
import AuthService from '../../AuthService';
import withAuth from '../../withAuth';
import Error from '../Error/Error';
import "./Account.styles.css";

const Auth = new AuthService();

class Account extends Component {

    handleLogout = () => {
    AuthService.logout();
    this.props.history.replace('/');
  };

  render() {
    return (
      <Router>
        <div>
          <Header handleLogout={this.handleLogout} />
          <div className="content-background">
            <Switch>
              <Route path="/account/my-page" component={MyPage} />
              <Route path="/account/projects-catalog" component={ProjectsCatalog} />
              <Route component={Error}/>
            </Switch>
          </div>
        </div>
      </Router>

    );
  }
}

export default withAuth(Account);