import React, {Component} from 'react';
import UserService from "../../UserService";
import TaskList from "../TaskList/TaskList";
import ReactPaginate from 'react-paginate';
import {MDBCol, MDBRow, row,} from 'mdbreact';
import './TasksCatalog.css';
import SearchCard from "../../Search/SearchCard/SearchCard";

export default class TasksCatalog extends Component {
    constructor() {
        super();
        this.UserService = new UserService();
    }

    state = {
        tasksListData: [],
        currentPage: 1,
    };

    componentDidMount() {
        this.updateProjectsJobs();
    }
    updateProjectsJobs = () => {
        this.UserService.getAllTasks(this.state.currentPage).then((value)=>{
            if (value) {
                let tasksList = [];
                value.content.forEach(task => {
                    const taskTemplate = {
                        taskId:  task.id,
                        taskName: task.name,
                        taskDescription: task.description,
                        taskCategory: task.category,
                        taskProgress: task.MDBProgress,
                        taskPercents: task.paymentPercent,
                        taskSkills: task.skills,
                        //taskReplyingTasks: task.replyingTasks,
                    };
                    tasksList.push(taskTemplate);
                });
                console.log(tasksList);
                this.setState({
                    tasksListData: tasksList,
                    totalPages: value.totalPages
                });
            }
        });
    };

    updateData = (value) => {
        this.setState(value)
    };


    handlePageChange = (data) => {
        let selected = data.selected + 1;

        this.setState({currentPage: selected}, () => {
            this.updateProjectsJobs();
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
                        <TaskList
                            tasksListData={this.state.tasksListData}
                            tasksDirection={this.state.selectedDirection}
                            tasksSkill={this.state.selectedSkill}
                            searchTasksName={this.state.searchProjectName}
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
