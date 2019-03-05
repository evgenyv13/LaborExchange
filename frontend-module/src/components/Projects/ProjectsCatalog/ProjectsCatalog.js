import React, {Component} from 'react';
import ProjectList from '../ProjectList/ProjectList';
import './ProjectsCatalog.style.css';
import ReactPaginate from 'react-paginate';
import {Col, Row,} from 'reactstrap';
import UserService from '../../UserService';
import SearchCard from "../../Search/SearchCard/SearchCard";

const testProjectsData = [
    {
        projectName: 'Test 1',
        projectDescription: 'Test description',
        projectDirection: 'Test direction',
        projectSkills: [],
        projectProgress: 10,
        projectId: '1209830918',
        projectTasks: [],
    },
    {
        projectName: 'Test 1',
        projectDescription: 'Test description',
        projectDirection: 'Test direction',
        projectSkills: [],
        projectProgress: 10,
        projectId: '1209830918',
        projectTasks: [],
    },
    {
        projectName: 'Test 1',
        projectDescription: 'Test description',
        projectDirection: 'Test direction',
        projectSkills: [],
        projectProgress: 10,
        projectId: '1209830918',
        projectTasks: [],
    },
]

export default class ProjectsCatalog extends Component {
    constructor() {
        super();
        this.UserService = new UserService();
    }

    state = {
        projectsListData: [],
        currentPage: 1,
    };

    componentDidMount() {
        this.updateProjectsCatalog();
    }

    updateProjectsCatalog = async () => {
        const value = await this.UserService.getProjects(this.state.currentPage);
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
            this.setState({
                projectsListData: projectList,
                totalPages: value.totalPages
            });
        }       
    }

    updateData = (value) => {
        this.setState(value)
    }

    handlePageChange = (data) => {
        let selected = data.selected + 1;

        this.setState({currentPage: selected}, () => {
            this.updateProjectsCatalog();
        });
    };

    render() {
        return (
            <div className="projects-catalog">
                <div className="projects-catalog-wrapper">
                    <Row>
                        <SearchCard updateData={this.updateData} />
                        <Col
                            xs={{ size: 12, offset: 0 }}
                            sm={{ size: 12, offset: 0 }}
                            md={{ size: 12, offset: 0 }}
                            lg={{ size: 9, offset: 0 }}
                            xl={{ size: 9, offset: 0 }}
                        >
                            <ProjectList
                                    projectsListData={testProjectsData}
                                    projectsDirection={this.state.selectedDirection}
                                    projectsSkill={this.state.selectedSkill}
                                    searchProjectName={this.state.searchProjectName}
                                />
                           
                        </Col>
                    </Row>
                </div>
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
