import React, {Component} from 'react';
import ProjectList from '../ProjectList/ProjectList';
import './ParticipantesProjects.styles.css';
import ReactPaginate from 'react-paginate';
import {MDBCol, MDBRow, row,} from 'mdbreact';
import UserService from '../../UserService';
import SearchCard from "../../Search/SearchCard/SearchCard";

export default class ProjectsCatalog extends Component {
    constructor() {
        super();
        this.UserService = new UserService();
    }

    state = {
        projectsListData: [],
        currentPage: 1,
    };

    updateData = (value) => {
        this.setState(value)
    }

    componentDidMount() {
        this.updateParticipantesProjects();
    }

    updateParticipantesProjects = async () => {
        const value = await this.UserService.getParticipantesProjects(this.state.currentPage);
        if (value) {
            let projectList = [];
            value.content.forEach(project => {
                const projectTemplate = {
                    projectId:  project.id,
                    projectName: project.name,
                    projectDescription: project.description,
                    projectDirection: '',
                    projectSkills: [],
                    projectProgress: 0,
                };
               projectList.push(projectTemplate);
            });
            if (projectList) {
                this.setState({
                    projectsListData: projectList,
                    totalPages: value.totalPages
                });
            }
        }
        
    }

    handlePageChange = (data) => {
        let selected = data.selected + 1;

        this.setState({currentPage: selected}, () => {
            this.updateParticipantesProjects();
        });
    };

    render() {
        return (
            <div>
                <MDBRow style={{margin: "30px", marginLeft: "30px"}}>
                    <MDBCol xs="12" sm="12" md="7" lg="3" xl="3">
                        <SearchCard updateData={this.updateData} />
                    </MDBCol>
                    <MDBCol xs="12" sm="12" md="7" lg="8" xl="9">
                        <ProjectList
                            projectsListData={this.state.projectsListData}
                            projectsDirection={this.state.selectedDirection}
                            projectsSkill={this.state.selectedSkill}
                            searchProjectName={this.state.searchProjectName}
                        />
                    </MDBCol>
                </MDBRow>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"pagination-break"}
                    pageCount={this.state.totalPages}
                    marginPagesDisplayed={1} // number of pages after break ...
                    pageRangeDisplayed={4} // number of pages before break ...
                    onPageChange={this.handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active-page"}
                />
            </div>
        );
    }
};