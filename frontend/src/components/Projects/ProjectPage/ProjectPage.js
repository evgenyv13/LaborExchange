import React, { Component } from 'react';
import TaskList from '../../Tasks/TaskList/TaskList';
import './ProjectPage.styles.css';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBRow,
  row
} from 'mdbreact';
import UserService from '../../UserService';
import Default from '../../../common/images/Startups.png';
import { Link } from 'react-router-dom';

export default class ProjectPage extends Component {
  constructor() {
    super();
    this.UserService = new UserService();
  }

  state = {
    project: {},
    user: {},
    showOpenedTasks: false,
    showActiveTasks: false,
    showClosedTasks: false
  };

  componentDidMount() {
    const { match } = this.props;
    const projectId = match.params.id;
    this.updateProject(projectId);
    this.updateUser();
  }

  updateProject = async projectId => {
    const projectData = await this.UserService.getProject(projectId);

    if (projectData) {
      this.setState({
        project: projectData,
        projectTasks: projectData.projectTasks
      });
    }
  };

  updateOpenedTasks = async projectId => {
    const value = await this.UserService.getOpenedTasks(
      projectId,
      this.state.currentPage
    );
    if (value) {
      let tasksList = [];
      value.content.forEach(task => {
        const taskTemplate = {
          taskId: task.id,
          taskName: task.name,
          taskDescription: task.description,
          taskCategory: task.category,
          taskProgress: task.MDBProgress,
          taskPercents: task.paymentPercent,
          taskSkills: task.skills
        };
        tasksList.push(taskTemplate);
      });
      this.setState({
        tasksListData: tasksList,
        totalPages: value.totalPages,
        showOpenedTasks: !this.state.showOpenedTasks,
        showActiveTasks: false,
        showClosedTasks: false
      });
    }
  };

  updateActiveTasks = async projectId => {
    const value = await this.UserService.getActiveTasks(
      projectId,
      this.state.currentPage
    );
    if (value) {
      let tasksList = [];
      value.content.forEach(task => {
        const taskTemplate = {
          taskId: task.id,
          taskName: task.name,
          taskDescription: task.description,
          taskCategory: task.category,
          taskProgress: task.MDBProgress,
          taskPercents: task.paymentPercent,
          taskSkills: task.skills
        };
        tasksList.push(taskTemplate);
      });
      this.setState({
        tasksListData: tasksList,
        totalPages: value.totalPages,
        showOpenedTasks: false,
        showActiveTasks: !this.state.showActiveTasks,
        showClosedTasks: false
      });
    }
  };

  updateClosedTasks = async projectId => {
    const value = await this.UserService.getClosedTasks(
      projectId,
      this.state.currentPage
    );
    if (value) {
      let tasksList = [];
      value.content.forEach(task => {
        const taskTemplate = {
          taskId: task.id,
          taskName: task.name,
          taskDescription: task.description,
          taskCategory: task.category,
          taskProgress: task.MDBProgress,
          taskPercents: task.paymentPercent,
          taskSkills: task.skills
        };
        tasksList.push(taskTemplate);
      });
      this.setState({
        tasksListData: tasksList,
        totalPages: value.totalPages,
        showOpenedTasks: false,
        showActiveTasks: false,
        showClosedTasks: !this.state.showClosedTasks
      });
    }
  };

  updateUser = async () => {
    const user = await this.UserService.getInfoAboutMe();
    if (user) {
      this.setState({ user });
    }
  };

  createTask = () => {
    const { history } = this.props;
    history.push({
      pathname: `/account/create-task/${this.state.project.id}`
    });
  };

  editProject = () => {
    const { history } = this.props;
    history.push({
      pathname: `/account/edit-project/${this.state.project.id}`
    });
  };

  render() {
    return (
      <MDBCol xs="12">
        <MDBCard style={{ marginBottom: '30px' }}>
          <MDBRow style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <MDBCol
              xs="6"
              sm="5"
              md="5"
              lg="3"
              xl="2"
              className="offset-xs-3 offset-sm-3 offset-md-1 offset-lg-1 offset-xl-1"
            >
              <MDBCardImage
                top
                width="100%"
                src={Default}
                alt="Profile image"
              />
            </MDBCol>
            <MDBCol
              xs="2"
              sm="3"
              md="3"
              lg="4"
              xl="5"
              className="offset-xs-3 offset-sm-3 offset-md-0 offset-lg-0 offset-xl-0"
            >
              <div>
                <div className={'personal-data-item'}>
                  <div className={'user-name'}>{this.state.project.name}</div>
                </div>
                <div className={'personal-data-item'}>
                  <div className={'user-profession'}>
                    {this.state.project.contacts}
                  </div>
                </div>
                <div className={'personal-data-item'}>
                  <ul class="social list-inline">
                    {this.state.project.twitter && (
                      <li>
                        <a href={this.state.project.twitter}>
                          <MDBIcon fab icon="twitter" />
                        </a>
                      </li>
                    )}
                    {this.state.project.gmail && (
                      <li>
                        <a href={this.state.project.gmail}>
                          <MDBIcon fab icon="google-plus" />
                        </a>
                      </li>
                    )}
                    {this.state.project.linkedin && (
                      <li>
                        <a href={this.state.project.linkedin}>
                          <MDBIcon fab icon="linkedin" />
                        </a>
                      </li>
                    )}
                    {this.state.project.github && (
                      <li>
                        <a href={this.state.project.github}>
                          <MDBIcon fab icon="github-alt" />
                        </a>
                      </li>
                    )}
                    {this.state.project.youtube && (
                      <li>
                        <a href={this.state.project.youtube}>
                          <MDBIcon fab icon="youtube" />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </MDBCol>
            <MDBCol>
              <div className={'personal-buttons'}>
                <MDBBtn className={'contact-MDBBtn'} onClick={this.createTask}>
                  <MDBIcon fub icon="edit" />
                  CREATE TASK
                </MDBBtn>
                <MDBBtn className={'edit-MDBBtn'} onClick={this.editProject}>
                  <MDBIcon fub icon="edit" />
                  &nbsp;EDIT PROJECT
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCard>
        <MDBRow>
          <MDBCol
            xs="12"
            sm="12"
            md="7"
            lg="7"
            xl="7"
            className="offset-md-1 offset-lg-1 offset-xl-1"
          >
            {this.state.showOpenedTasks && (
              <MDBCol xs="12">
                <TaskList tasksListData={this.state.tasksListData} />
              </MDBCol>
            )}
            {this.state.showActiveTasks && (
              <MDBCol xs="12">
                <TaskList tasksListData={this.state.tasksListData} />
              </MDBCol>
            )}
            {this.state.showClosedTasks && (
              <MDBCol xs="12">
                <TaskList tasksListData={this.state.tasksListData} />
              </MDBCol>
            )}
            {!this.state.showClosedTasks &&
              !this.state.showActiveTasks &&
              !this.state.showOpenedTasks && (
                <MDBCol xs="12">
                  <MDBCard>
                    <MDBCardBody>
                      <MDBCardTitle>Description </MDBCardTitle>
                      <MDBCardText>
                        {this.state.project.description || ''}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              )}
          </MDBCol>

          <MDBCol xs="12" sm="12" md="3" lg="3" xl="3">
            <MDBCard>
              <MDBCardBody>
                <MDBCardText>
                  Here you can find all tasks from the project. Also you can
                  approve a candidate to perform a task, whick was selected by
                  the candidate or check current state of a task.
                </MDBCardText>
                <MDBCol
                  xs="12"
                  sm="6"
                  md="12"
                  lg="12"
                  xl="10"
                  className="offset-sm-3  offset-md-0 offset-lg-0 offset-xl-1"
                >
                  <div>
                    {this.state.showOpenedTasks ? (
                      <MDBBtn
                        className={'task-MDBBtn--active'}
                        onClick={() => {}}
                      >
                        Close opened tasks
                      </MDBBtn>
                    ) : (
                      <MDBBtn className={'task-MDBBtn'} onClick={() => {}}>
                        View opened tasks
                      </MDBBtn>
                    )}
                  </div>
                </MDBCol>
                <MDBCol
                  xs="12"
                  sm="6"
                  md="12"
                  lg="12"
                  xl="10"
                  className="offset-sm-3 offset-xl-1 offset-md-0 offset-lg-0 offset-xl-0"
                >
                  {this.state.user.id &&
                    this.state.project.projectOwner &&
                    this.state.project.projectOwner.id &&
                    this.state.user.id ===
                      this.state.project.projectOwner.id && (
                      <div>
                        {this.state.showActiveTasks ? (
                          <MDBBtn
                            className={'task-MDBBtn--active'}
                            onClick={() => {}}
                          >
                            Close active tasks
                          </MDBBtn>
                        ) : (
                          <MDBBtn className={'task-MDBBtn'} onClick={() => {}}>
                            View active tasks
                          </MDBBtn>
                        )}
                      </div>
                    )}
                </MDBCol>
                <MDBCol
                  xs="12"
                  sm="6"
                  md="12"
                  lg="12"
                  xl="10"
                  className="offset-sm-3 offset-xl-1 offset-md-0 offset-lg-0 offset-xl-0"
                >
                  {this.state.user.id &&
                    this.state.project.projectOwner &&
                    this.state.project.projectOwner.id &&
                    this.state.user.id ===
                      this.state.project.projectOwner.id && (
                      <div>
                        {this.state.showClosedTasks ? (
                          <MDBBtn
                            className={'task-MDBBtn--active'}
                            onClick={() => {}}
                          >
                            Close closed tasks
                          </MDBBtn>
                        ) : (
                          <MDBBtn className={'task-MDBBtn'} onClick={() => {}}>
                            View closed tasks
                          </MDBBtn>
                        )}
                      </div>
                    )}
                </MDBCol>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBCol>
    );
  }
}
