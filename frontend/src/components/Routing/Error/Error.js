import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Alert} from "mdbreact"

class Error extends Component {
    render() {
        return (
            <div className="contentWrapper">
                <Alert color="danger">Path not exist!!!</Alert>
            </div>
        );
    }
}

export default withRouter(Error);
