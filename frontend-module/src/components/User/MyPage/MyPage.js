import React, {Component} from 'react';
import './MyPage.styles.css';
import 'font-awesome/css/font-awesome.min.css';


export default class MyPage extends Component {
    render() {
        return (
            <div className={"my-page"}>
                <div className={"my-page-wrapper"}>
                    <p style={{textAlign: "center", fontSize: "24px"}}>MyPage</p>
                </div>
            </div>
        );
    }
};
