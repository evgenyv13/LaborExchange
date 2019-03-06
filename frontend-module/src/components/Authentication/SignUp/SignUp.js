import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Row, Col, Input, Card, CardBody } from 'reactstrap';
import AuthService from '../../AuthService';
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
            token: tokenValue,
            error: false,	
            exists: false,
            confirm_password: '',
        }
    }

    componentDidMount(){
        if(AuthService.loggedIn())
            this.props.history.replace('/account/projects-catalog');
    }

    changeInput(event) {
        this.setState({
            [event.target.id]: event.target.value,
            error: false,
            exists: false,
        });
    }

    sendFetch() {
        let formData = new FormData();
        let password = this.state.password;	
        let confirm_password = this.state.confirm_password;	
        if (password.length < 4 || confirm_password.length < 4 || password !== confirm_password) {	
            this.setState({error: true, exists: false});	
            return ;	
        }
        formData.append('username', this.state.username);
        formData.append('password', password);
        //formData.append('token', this.state.token);
        if (formData) {
            AuthService.signUp(formData)
            .then(res =>{
                console.log(res.error);	                
                if (res.error === "user exists") {
                    this.setState({exists: true, error: false});	
                    return ;	
                }
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
                <div className="sign-up-content">
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
                                <form id={'reg-from'}>
                                    <div className="sign-up-form">
                                        <div className="sign-up-title">Sign Up</div>
                                        <Input
                                            onChange={this.changeInput}
                                            type="text"
                                            className="sign-up-input"
                                            id="username"
                                            placeholder="user name"
                                            required=""
                                            style={{marginBottom: "10px"}}
                                        />
                                        <Input
                                            onChange={this.changeInput}
                                            type="password" 
                                            className="sign-up-input"
                                            name="password"
                                            id="password"
                                            placeholder="password"
                                            required=""
                                            style={{marginBottom: "10px"}}
                                        />
                                        <Input
                                            onChange={this.changeInput}
                                            type="password"
                                            className="sign-up-input"
                                            name="confirm_password"
                                            id="confirm_password"
                                            placeholder="confirm password"
                                            required=""
                                            style={{marginBottom: "10px"}}
                                        />
                                        <span style={{color: 'red'}} id="error-span"/>
                                        {this.state.error ?	
                                            <p style={{color: 'red', fontSize: '13px'}}>	
                                                Wrong data, name and password should be equal and more than 5 symbols	
                                            </p>	
                                            : null	
                                        }	
                                        {this.state.exists ?	
                                            <p style={{color: 'red', fontSize: '13px'}}>	
                                                This username is already exists, try another one	
                                            </p>	
                                            : null	
                                        }
                                        <Button
                                            color="success"
                                            id="loginbutton"
                                            onClick={this.sendFetch}
                                            block
                                            style={{marginBottom: "10px"}}
                                        >
                                            Sign Up
                                        </Button>
                                        <div>Already signed up?</div>
                                        <div><Link to="/signin">Sign In</Link> here!</div>
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

export default withRouter(SignUp);
