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
            token: tokenValue
        }
    }

    componentDidMount(){
        if(AuthService.loggedIn())
            this.props.history.replace('/account/projects-catalog');
    }

    changeInput(event) {
        this.setState({
            [event.target.id]: [event.target.value]
        });
    }

    sendFetch() {
        /*let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        formData.append('token', this.state.token);
        fetch(`http://localhost:8080/registration`, {
            method: "POST",
            body: formData
        }).then(response=>{
            return response.json()
        }).then(data=>{
            console.log(data);
            if (data.error === undefined){
                document.getElementById('doc-form').style.display = 'none';
                window.location.href = '/auth'
            }else{
                document.getElementById('error-span').style.color = "red";
                document.getElementById('error-span').innerText = "Invalid data";
            }

        })*/
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
                                            id="Login"
                                            placeholder="UserName"
                                            required=""
                                            style={{marginBottom: "10px"}}
                                        />
                                        <Input
                                            onChange={this.changeInput}
                                            type="password" 
                                            className="sign-up-input"
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            required=""
                                            style={{marginBottom: "10px"}}
                                        />
                                        <Input
                                            onChange={this.changeInput}
                                            type="confirm-password" 
                                            className="sign-up-input"
                                            name="confirm-password"
                                            id="confirm-password"
                                            placeholder="Confirm Password"
                                            required=""
                                            style={{marginBottom: "10px"}}
                                        />
                                        <span style={{color: 'red'}} id="error-span"/>
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
