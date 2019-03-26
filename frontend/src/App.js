import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import SignIn from './components/Auhthinfication/SignIn/SignIn';
import SignUp from './components/Auhthinfication/SignUp/SignUp';
import Landing from './components/Landing/LandingPage/LandingPage';
import Account from './components/Routing/Account/Account';

export default class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={Landing} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/account" component={Account} />
          </div>
        </Router>
    );
  }
}
