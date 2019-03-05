import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SignIn from './components/Auhthinfication/SignIn/SignIn';
import SignUp from './components/Auhthinfication/SignUp/SignUp';
import Landing from './components/Landing/Landing';
import Account from './components/Routing/Account/Account';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="open-pages-background">
            <Route exact path="/" component={Landing} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </div>
          <Route path="/account" component={Account} />
        </div>
      </Router>
    );
  }
}
