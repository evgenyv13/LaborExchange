import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Landing extends Component {
    render() {
        return (
            <div className="landing-page">
                <div className="landing-header">
                    <div className="landing-navigation">
                        <Link className="landing-navigation-link" to='/sign-in'>Sign In</Link>
                        <Link className="landing-navigation-link" to='/sign-up'>Sign Up</Link>
                    </div>
                </div>
                <div className="landing-content">
                    <div>
                        Landing
                    </div>
                </div>
            </div>
        );
    }
};