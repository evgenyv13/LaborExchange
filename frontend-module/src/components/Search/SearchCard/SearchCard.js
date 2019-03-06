import React, {Component} from 'react';
import './SearchCard.style.css';
import UserService from '../../UserService';
import {FormGroup, Label, Input, Button, CardBody, Card, Col} from 'reactstrap';


export default class SearchCard extends Component {
    constructor() {
        super();
        this.UserService = new UserService();
    }

    state = {
        searchProjectName: '',
        selectedDirection: 'all',
        selectedSkill: 'all',
        directions: ['All', 'Desktop', 'Mobile', 'Web'],
        skills: ['All', 'C', 'C++', 'C#', 'Java', 'Javascript', 'Objective-C'],
    };


    componentDidMount() {
        this.props.updateData(this.state);
    }

    updateProps() {
        this.props.updateData(this.state);
    }
    handleChangeDirection = (event) => {
        this.setState(
            { selectedDirection: event.target.value },
            function afterStateChange () {
                this.updateProps();
            }
        );
    };

    handleChangeSkill = (event) => {
        this.setState({ selectedSkill: event.target.value },
            function afterStateChange () {
                this.updateProps();
            });
    };

    handleChangeSearch = (event) => {
        this.setState({ searchProjectName: event.target.value },
            function afterStateChange () {
                this.updateProps();
            });
    };

    createProjectButton() {
        if (this.props.createProject) {
            return (
                <FormGroup>
                    <div className="create-project-Button">
                        <Button onClick={this.props.createProject} block>Create project</Button>
                    </div>
                </FormGroup>
            );
        }
    }

    render() {
        return (
            <Col
                xs={{ size: 12, offset: 0 }}
                sm={{ size: 8, offset: 2 }}
                md={{ size: 6, offset: 3 }}
                lg={{ size: 3, offset: 0 }}
                xl={{ size: 3, offset: 0 }}
            >
                <Card style={{marginBottom: "30px"}}>
                    <CardBody>
                        <FormGroup>
                            <Label>Search</Label>
                            <div className={"create-project-input-wrapper"}>
                                <div className={'create-project-input-icon'}>
                                    <i className="fa fa-search"/>
                                </div>
                                <input
                                    type="text"
                                    onChange={this.handleChangeSearch}
                                    placeholder="Search"
                                    className={"create-project-input"}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Direction</Label>
                            <Input type="select" value={this.state.selectedDirection} onChange={this.handleChangeDirection}>
                                {this.state.directions
                                    .map((direction) =>
                                        <option key={direction} value={`${direction.toLowerCase()}`}>{direction}</option>
                                    )
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Skills</Label>
                            <Input type="select" value={this.state.selectedSkill} onChange={this.handleChangeSkill}>
                                {this.state.skills
                                    .map((skill) =>
                                        <option key={skill} value={`${skill}`}>{skill}</option>
                                    )
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Button color="success" onClick={() => {this.updateProps();}} block>Search</Button>
                        </FormGroup>
                        {this.createProjectButton()}
                    </CardBody>
                </Card>
            </Col>
        );
    }
};