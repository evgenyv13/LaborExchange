import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './Landing.styles.css';
import 'mdbreact/dist/css/mdb.css';
import LandingHeader from "../LandingHeader/LandingHeader";

class LandingPage extends Component {

    render() {
        return (
            <div className="landing-page">
                <LandingHeader />
                <div className="landing-content">
                    <row>
                        <h1 className="boxed classH1">Stay hungry stay foolish</h1>
                        <p className="boxed classP">Steve Jobs</p>
                    </row>
                </div>
            </div>
        );
    }

}

export default withRouter(LandingPage);
