import React, { Component } from 'react';
import Header from '../Header/Header';
import './MyPage.styles.css';
export default class MyPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="page">
                    My page
                </div>
            </div>
        );
    }
};