import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBRow, row} from 'mdbreact';
import {Link, withRouter} from 'react-router-dom';
import AuthService from '../../AuthService';
import LandingHeader from "../../Landing/LandingHeader/LandingHeader";
import "./SignIn.styles.css";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.processLogin = this.processLogin.bind(this);
        this.Auth = new AuthService();
    }

    componentDidMount(){
        if(AuthService.loggedIn())
            this.props.history.replace('/account/my-page');
    }

    setUsername(event) {
        this.setState({
            email: event.target.value
        })
    }

    setPassword(event) {
        this.setState({
            password: event.target.value
        })
    }
    processLogin() {
        let username = this.state.email;
        let password = this.state.password;
        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        if (formData) {
            this.Auth.login(formData)
            .then(res =>{
               this.props.history.replace('/account/my-page');
            })
            .catch(err =>{
                alert(err);
            })
        } else {
            alert(`Username and Password can't be empty`);
        }

    }

    render() {
        return (
            <div className="sign-in-page">
                <LandingHeader />
                <MDBRow className="h-75">
                    <MDBCard className="card-style">
                        <MDBCardBody className="inner-card-text">
                            <MDBCardTitle>Sign in</MDBCardTitle>
                            <MDBInput
                                type="text"
                                value={this.state.email}
                                onChange={this.setUsername}
                                placeHolder="Login"
                                style={{marginBottom: "10px"}}
                            />
                            <MDBInput
                                type="password"
                                value={this.state.password}
                                onChange={this.setPassword}
                                placeHolder="Password"
                                required=""
                                style={{marginBottom: "10px"}}
                            />
                            <MDBBtn
                                id="loginbutton"
                                onClick={this.processLogin}
                                block
                                style={{marginBottom: "10px"}}
                            >
                                Sign In
                            </MDBBtn>
                            <div>Don't have an account?</div>
                            <div><Link to="/signup">Sign Up</Link> here!</div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
            </div>               
        );
    }

}

export default withRouter(SignIn);
