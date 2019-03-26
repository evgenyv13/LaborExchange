import React, {Component} from 'react';
import {MDBCol, MDBRow, row} from 'mdbreact';
import ReactPaginate from 'react-paginate';
import {withRouter} from 'react-router-dom';
import ProjectList from '../ProjectList/ProjectList';
import './MyProjects.styles.css';
import UserService from '../../UserService';
import SearchCard from "../../Search/SearchCard/SearchCard";

class MyProjects extends Component {
    constructor(props) {
        super(props);
        this.UserService = new UserService();
    }

    state = {
        projectsListData: [],
        totalPages: '1',
        currentPage: 1,
    };

    componentDidMount() {
        this.updateMyProjects();
    }

    updateMyProjects = async () => {
        const value = await this.UserService.getMyProjects(this.state.currentPage);
        console.log(value);
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
            if (projectList && value) {
                this.setState({
                    projectsListData: projectList,
                    totalPages: value.totalPages
                });
            }
        }      
    };

    updateData = (value) => {
        this.setState(value);
    };

    handlePageChange = (data) => {
        let selected = data.selected + 1;

        this.setState({currentPage: selected}, () => {
            this.updateMyProjects();
        });
    };

    createProject = () => {
        const { history } = this.props;
        history.push({
            pathname: '/account/create-project',
        });
    }


    render() {
        console.log(this.state.selectedPage);
        return (
            <div>
                <MDBRow style={{margin: "30px", marginLeft: "30px"}}>
                    <MDBCol xs="12" sm="12" md="4" lg="3" xl="3">
                        <SearchCard updateData={this.updateData} />
                    </MDBCol>
                    <MDBCol xs="12" sm="12" md="8" lg="9" xl="9">
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
}

export default withRouter(MyProjects);