import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.styles.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <nav className="navigation">
                    <Link className="navigation-link" to='/my-projects'>My projects</Link>
                    <Link className="navigation-link" to='/participantes-projects'>Participation</Link>
                    <Link className="navigation-link" to='/projects-catalog'>Projects</Link>
                    <Link className="navigation-link" to='/jobs-catalog'>Tasks</Link>
                    <Link className="navigation-link" to='/my-page'>My page</Link>
                    <Link className="navigation-link" to='/'>Log out</Link>
                </nav>
            </div>
        );
    }
};