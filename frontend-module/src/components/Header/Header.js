import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.styles.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <nav className="navigation">
                    <Link className="navigation-link" to='/my-projects'>Мои проекты</Link>
                    <Link className="navigation-link" to='/participantes-projects'>Участвую</Link>
                    <Link className="navigation-link" to='/projects-catalog'>Каталог проектов</Link>
                    <Link className="navigation-link" to='/jobs-catalog'>Каталог вакансий</Link>
                    <Link className="navigation-link" to='/my-page'>Моя страница</Link>
                    <Link className="navigation-link" to='/'>Log out</Link>
                </nav>
            </div>
        );
    }
};