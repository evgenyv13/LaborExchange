import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from "./components/Authinfication/SignIn/SignIn";
import SignUp from "./components/Authinfication/SignUp/SignUp";
import Landing from "./components/Landing/Landing";

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <div className="open-pages-background">
                    <Route exact path="/" component={Landing} />
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                </div>
            </div>
        </Router>
    );
  }
}

export default App;
