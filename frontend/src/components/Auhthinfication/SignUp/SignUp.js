import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBRow, row} from 'mdbreact';
import AuthService from '../../AuthService';
import LandingHeader from "../../Landing/LandingHeader/LandingHeader";
import './SignUp.styles.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        let tokenValue = document.location.href.split("=")[1];
        this.changeInput = this.changeInput.bind(this);
        this.sendFetch = this.sendFetch.bind(this);
        this.Auth = new AuthService();
        this.state = {
            username: '',
            password: '',
            token: tokenValue
        }
    }

    componentDidMount(){
        if(AuthService.loggedIn())
            this.props.history.replace('/account/my-page');
    }

    changeInput(event) {
        this.setState({
            [event.target.id]: [event.target.value]
        });
    }

    sendFetch() {
        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        //formData.append('token', this.state.token);
        if (formData) {
            AuthService.signUp(formData)
            .then(res =>{
                console.log(res);
               this.props.history.replace('/signin');
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
            <div className="sign-up-page">
                <LandingHeader />
                <MDBRow className="h-75">
                    <MDBCard className="card-style">
                        <MDBCardBody className="inner-card-text">
                            <MDBCardTitle>Sign up</MDBCardTitle>
                            <MDBInput
                                onChange={this.changeInput}
                                type="text"
                                placeHolder="UserName"
                                style={{marginBottom: "10px"}}
                            />
                            <MDBInput
                                onChange={this.changeInput}
                                type="password"
                                id="password"
                                placeHolder="Password"
                                required=""
                                style={{marginBottom: "10px"}}
                            />
                            <MDBInput
                                onChange={this.changeInput}
                                type="password"
                                id="confirm-password"
                                placeHolder="Confirm Password"
                                style={{marginBottom: "10px"}}
                            />
                            <span style={{color: 'red'}} id="error-span"/>
                            <MDBBtn
                                id="loginbutton"
                                onClick={this.sendFetch}
                                block
                                style={{marginBottom: "10px"}}
                            >
                                Sign Up
                            </MDBBtn>
                            <div>Already have an account?</div>
                            <div><Link to="/signin">Sign In</Link> here!</div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
            </div>
        );
    }
}

export default withRouter(SignUp);
