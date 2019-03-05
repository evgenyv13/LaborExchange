import React, { Component } from 'react';
import { Row, Col, Button, Input, Card, CardBody } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import AuthService from '../../AuthService';
import './SignIn.styles.css';


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
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
                <div className="sign-in-content">
                <Row>
                    <Col
                        xs={{ size: 8, offset: 2 }}
                        sm={{ size: 8, offset: 2 }}
                        md={{ size: 6, offset: 3 }}
                        lg={{ size: 4, offset: 4 }}
                        xl={{ size: 2, offset: 5 }}
                    >
                        <Card>
                            <CardBody>
                                <form id="login-form">
                                    <div className="sign-in-form">
                                        <div className="sign-in-title">Sign In</div>
                                        <Input
                                            type="username"
                                            id="inputUsername"
                                            value={this.state.email}
                                            onChange={this.setUsername}
                                            placeholder="Login"
                                            required=""
                                            autoFocus=""
                                            style={{marginBottom: "10px"}}
                                        />
                                        <Input
                                            type="password"
                                            value={this.state.password}
                                            id="inputPassword"
                                            onChange={this.setPassword}
                                            placeholder="Password"
                                            required=""
                                            style={{marginBottom: "10px"}}
                                        />
                                        <span style={{color: 'red'}} id="error-span"/>
                                        <Button
                                            color="success"
                                            id="loginbutton"
                                            onClick={this.processLogin}
                                            block
                                            style={{marginBottom: "10px"}}
                                        >
                                            Sign In
                                        </Button>
                                        <div>Don't have an account?</div>
                                        <div><Link to="/signup">Sign Up</Link> here!</div>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                </div>
            </div>               
        );
    }

};

export default withRouter(SignIn);
