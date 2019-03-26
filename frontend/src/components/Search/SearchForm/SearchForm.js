import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBFormGroup, MDBInput, MDBLabel} from 'mdbreact';

export default class SearchForm extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.handleDataInput = this.handleDataInput.bind(this);
        this.state = {
            searchProjectName: '',
            selectedDirection: 'all',
            selectedSkill: 'all',
            directions: ['All', 'Desktop', 'Mobile', 'Web'],
            skills: ['All', 'C', 'C++', 'C#', 'Java', 'Javascript', 'Objective-C'],
        };
    }

    // handleDataInput(event){
    //     this.setState({ searchProjectName: event.target.value });
    //     this.props.handleWrite(event);
    // }

    handleChangeDirection = (event) => {
        this.setState({ selectedDirection: event.target.value });
    }

    handleChangeSkill = (event) => {
        this.setState({ selectedSkill: event.target.value });
    }

    handleChangeSearch = (event) => {
        this.setState({ searchProjectName: event.target.value });
    }

    render() {
        return (
            <MDBCard style={{marginBottom: "30px"}}>
                <MDBCardBody>
                    <MDBFormGroup>
                        <MDBLabel>Search</MDBLabel>
                        <MDBInput placeholder="Search" value={this.state.searchProjectName} onChange={this.handleChangeSearch}  style={{padding: "0",  textIndent: "5px"}} />
                    </MDBFormGroup>
                    <MDBFormGroup>
                        <MDBLabel>Direction</MDBLabel>
                        <MDBInput type="select" value={this.state.selectedDirection} onChange={this.handleChangeDirection}>
                            {this.state.directions
                                .map((direction) =>
                                    <option key={direction} value={`${direction.toLowerCase()}`}>{direction}</option>
                                )
                            }
                        </MDBInput>
                    </MDBFormGroup>
                    <MDBFormGroup>
                        <MDBLabel>Skills</MDBLabel>
                        <MDBInput type="select" value={this.state.selectedSkill} onChange={this.handleChangeSkill}>
                            {this.state.skills
                                .map((skill) =>
                                    <option key={skill} value={`${skill}`}>{skill}</option>
                                )
                            }
                        </MDBInput>
                    </MDBFormGroup>
                    <MDBFormGroup>
                        <MDBBtn color="success" onClick={() => {}} block>Search</MDBBtn>
                    </MDBFormGroup>
                </MDBCardBody>
            </MDBCard>
        );
    }
};
