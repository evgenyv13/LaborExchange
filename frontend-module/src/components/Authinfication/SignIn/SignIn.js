import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sign.in.styles.css';

export default class SignIn extends Component {
    render() {
        return (
            <div className="sign-in-page">
                <div className="sign-in-title">Sign In</div>
                <form className="sign-in-form">
                    <input type="text" placeholder="E-mail" className="sign-in-input"/>
                    <input type="password" placeholder="Password" className="sign-in-input"/>
                    <Link to='/my-page' className="sign-in-submit">Submit</Link>
                </form>
            </div>
        );
    }
};