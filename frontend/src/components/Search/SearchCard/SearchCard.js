import React, {Component} from 'react';
import UserService from '../../UserService';
import {MDBBadge, MDBBtn, MDBBtnGroup, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBInput, row} from 'mdbreact';
import Select from '@material/react-select';
import '@material/react-select/dist/select.css';

export default class SearchCard extends Component {

    constructor(props) {
        super(props);
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
        console.log(event.target.value);
        this.setState(
            { selectedDirection: event.target.value },
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
                <MDBBtnGroup>
                    <div className="create-project-MDBBtn">
                        <MDBBtn onClick={this.props.createProject} block>Create project</MDBBtn>
                    </div>
                </MDBBtnGroup>
            );
        }
    }

    render() {
        return (
            <MDBCard className="card-style">
                <MDBCardBody>
                    <MDBCardTitle>Search</MDBCardTitle>
                    <MDBInput
                        hint="Project name"
                        type="text"
                        onChange={this.handleChangeSearch}
                    />

                    <MDBBadge color="default">Direction:</MDBBadge>
                    <Select
                        value={this.state.selectedDirection}
                        onChange={this.handleChangeDirection}
                        className="met"
                    >
                        {this.state.directions
                            .map((direction) =>
                                <option key={direction} value={`${direction}`}>{direction}</option>
                            )
                        }
                    </Select>

                    {/*<row>*/}
                        {/*<MDBBadge color="default">Skills:</MDBBadge>*/}
                        {/*<Select*/}
                            {/*value={this.state.selectedSkill}*/}
                            {/*onChange={this.handleChangeSkill}*/}
                        {/*>*/}
                            {/*{this.state.skills*/}
                                {/*.map((skill) =>*/}
                                    {/*<option key={skill} value={`${skill}`}>{skill}</option>*/}
                                {/*)*/}
                            {/*}*/}
                        {/*</Select>*/}
                    {/*</row>*/}
                </MDBCardBody>
                {/*<MDBCard style={{marginBottom: "30px"}}>*/}
                {/*<MDBCardBody>*/}
                {/*<MDBBtnGroup>*/}
                {/*<MDBBadge>Search</MDBBadge>*/}
                {/*<div className={"create-project-MDBInput-wrapper"}>*/}
                {/*<div className={'create-project-MDBInput-icon'}>*/}
                {/*<i className="fa fa-search"/>*/}
                {/*</div>*/}
                {/*<MDBInput*/}
                {/*type="text"*/}
                {/*onChange={this.handleChangeSearch}*/}
                {/*placeholder="Search"*/}
                {/*className={"create-project-MDBInput"}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*</MDBBtnGroup>*/}
                {/*<MDBBtnGroup>*/}
                {/*<MDBBadge>Direction</MDBBadge>*/}
                {/*<MDBInput type="select" value={this.state.selectedDirection} onChange={this.handleChangeDirection}>*/}
                {/*{this.state.directions*/}
                {/*.map((direction) =>*/}
                {/*<option key={direction} value={`${direction.toLowerCase()}`}>{direction}</option>*/}
                {/*)*/}
                {/*}*/}
                {/*</MDBInput>*/}
                {/*</MDBBtnGroup>*/}
                {/*<MDBBtnGroup>*/}
                {/*<MDBBadge>Skills</MDBBadge>*/}
                {/*<MDBInput type="select" value={this.state.selectedSkill} onChange={this.handleChangeSkill}>*/}
                {/*{this.state.skills*/}
                {/*.map((skill) =>*/}
                {/*<option key={skill} value={`${skill}`}>{skill}</option>*/}
                {/*)*/}
                {/*}*/}
                {/*</MDBInput>*/}
                {/*</MDBBtnGroup>*/}
                {/*<MDBBtnGroup>*/}
                {/*<MDBBtn color="success" onClick={() => {this.updateProps();}} block>Search</MDBBtn>*/}
                {/*</MDBBtnGroup>*/}
                {/*{this.createProjectButton()}*/}
                {/*</MDBCardBody>*/}
                {/*</MDBCard>*/}
                {/*</div>*/}
            </MDBCard>


        );
    }
};