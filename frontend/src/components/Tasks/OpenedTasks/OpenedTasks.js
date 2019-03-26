import React, { Component } from 'react';
import TaskList from "../TaskList/TaskList";
import { MDBCol, row } from 'mdbreact';
import UserService from '../../UserService';
import './OpenedTasks.styles.css';
import ReactPaginate from "react-paginate";

export default class OpenedTasks extends Component {
  constructor() {
    super();
    this.UserService = new UserService();
  }

  state = {
    tasksListData: [],
    currentPage: 1,
  };

  componentDidMount() {
      const { match } = this.props;
      const projectId = match.params.id;
      this.setState({
          projectId: projectId,
      });
    this.updateOpenedTasks(projectId);
  }

  updateOpenedTasks = async (projectId) => {
    const value = await this.UserService.getOpenedTasks(projectId, this.state.currentPage);
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
          };
          tasksList.push(taskTemplate);
      });
      this.setState({
          tasksListData: tasksList,
          totalPages: value.totalPages,
      });
    }
  };

    handlePageChange = (data) => {
        let selected = data.selected + 1;

        this.setState({currentPage: selected}, () => {
            this.updateOpenedTasks(this.state.projectId);
        });
    };

  render() {
    console.log(this.state);
      return (
        <div className="opened-tasks">
          <div className="opened-tasks-wrapper">
            <row>
              <MDBCol
                  xs={{ size: 12, offset: 0 }}
                  sm={{ size: 12, offset: 0 }}
                  md={{ size: 10, offset: 1 }}
                  lg={{ size: 8, offset: 2 }}
                  xl={{ size: 8, offset: 2 }}
              >
                  <TaskList
                    tasksListData={this.state.tasksListData}
                  />
              </MDBCol>
            </row>
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
