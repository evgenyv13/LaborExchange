import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MyPage from '../../User/MyPage/MyPage';
import Header from '../../Header/Header';
import AuthService from '../../AuthService';
import withAuth from '../../withAuth';
import Error from '../Error/Error';
import "./Account.styles.css";

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
              <Route component={Error}/>
            </Switch>
          </div>
        </div>
      </Router>

    );
  }
}

export default withAuth(Account);
