import React, {Component} from 'react';
import './ProjectPage.styles.css';
import {Card, CardBody, CardImg, CardText, Col, Row} from 'reactstrap';
import UserService from '../../UserService';
import Default from '../../../common/images/Startups.png';
import 'font-awesome/css/font-awesome.min.css';

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
        showClosedTasks: false,
    };

    componentDidMount() {
        const { match } = this.props;
        const projectId = match.params.id;
        this.updateProject(projectId);
        this.updateUser();
    }

    updateProject = async (projectId) => {
        const projectData = await this.UserService.getProject(projectId);
        
        if (projectData) {
            this.setState({
                project: projectData,
                projectTasks: projectData.projectTasks,
            });
        }
    };

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
                  taskProgress: task.progress,
                  taskPercents: task.paymentPercent,
                  taskSkills: task.skills,
              };
              tasksList.push(taskTemplate);
          });
          this.setState({
              tasksListData: tasksList,
              totalPages: value.totalPages,
              showOpenedTasks: !this.state.showOpenedTasks,
              showActiveTasks: false,
              showClosedTasks: false,
          });
        }
    };

    updateActiveTasks = async (projectId) => {
        const value = await this.UserService.getActiveTasks(projectId, this.state.currentPage);
        if (value) {
          let tasksList = [];
          value.content.forEach(task => {
              const taskTemplate = {
                  taskId:  task.id,
                  taskName: task.name,
                  taskDescription: task.description,
                  taskCategory: task.category,
                  taskProgress: task.progress,
                  taskPercents: task.paymentPercent,
                  taskSkills: task.skills,
              };
              tasksList.push(taskTemplate);
          });
          this.setState({
              tasksListData: tasksList,
              totalPages: value.totalPages,
              showOpenedTasks: false,
              showActiveTasks: !this.state.showActiveTasks,
              showClosedTasks: false,
          });
        }
    };
  
    updateClosedTasks = async (projectId) => {
        const value = await this.UserService.getClosedTasks(projectId, this.state.currentPage);
        if (value) {
          let tasksList = [];
          value.content.forEach(task => {
              const taskTemplate = {
                  taskId:  task.id,
                  taskName: task.name,
                  taskDescription: task.description,
                  taskCategory: task.category,
                  taskProgress: task.progress,
                  taskPercents: task.paymentPercent,
                  taskSkills: task.skills,
              };
              tasksList.push(taskTemplate);
          });
          this.setState({
              tasksListData: tasksList,
              totalPages: value.totalPages,
              showOpenedTasks: false,
              showActiveTasks: false,
              showClosedTasks:  !this.state.showClosedTasks,
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
            pathname: `/account/create-task/${this.state.project.id}`,
        });
    };

    editProject = () => {
        const { history } = this.props;
        history.push({
            pathname: `/account/edit-project/${this.state.project.id}`,
        });
    };

    render() {
        return (
            <div className="project-page">
                <div className="project-page-wrapper">
                    <Row>
                    <Col
                        xs={{ size: 12, offset: 0 }}
                        sm={{ size: 12, offset: 0 }}
                        md={{ size: 12, offset: 0 }}
                        lg={{ size: 12, offset: 0 }}
                        xl={{ size: 12, offset: 0 }}
                        style={{ padding: '0px', margin: '0px' }}
                    >
                            <Card
                                style={{marginBottom: "50px"}}
                            >
                            <Col
                            xs={{ size: 12, offset: 0 }}
                            sm={{ size: 12, offset: 0 }}
                            md={{ size: 10, offset: 1 }}
                            lg={{ size: 10, offset: 1 }}
                            xl={{ size: 10, offset: 1 }}
                            >
                                <Row
                                    style={{paddingTop: "30px", paddingBottom: "30px"}}
                                >
                                    <Col
                                        xs={{ size: 6, offset: 3 }}
                                        sm={{ size: 6, offset: 3 }}
                                        md={{ size: 3, offset: 0 }}
                                        lg={{ size: 2, offset: 0 }}
                                        xl={{ size: 2, offset: 0 }}
                                        
                                    >
                                        <CardImg 
                                            top
                                            width="100%"
                                            src={Default}
                                            alt="Profile image"
                                            style={{borderRadius: '50%' }}
                                        />
                                    </Col>
                                    <Col
                                        xs={{ size: 6, offset: 3 }}
                                        sm={{ size: 6, offset: 3 }}
                                        md={{ size: 5, offset: 0 }}
                                        lg={{ size: 6, offset: 0 }}
                                        xl={{ size: 6, offset: 0 }}                                     
                                    >
                                        <div className={"personal-data"}>
                                            <div className={"personal-data-item"}><div className={"user-name"}>{this.state.project.name}</div></div>
                                            <div className={"personal-data-item"}><div className={"user-profession"}>{this.state.project.contacts}</div></div>
                                            <div className={"personal-data-item"}>
                                                <ul class="social list-inline">
                                                    {this.state.project.twitter &&
                                                        <li><a href={this.state.project.twitter}><i class="fa fa-twitter"/></a></li>
                                                    }
                                                    {this.state.project.gmail &&
                                                        <li><a href={this.state.project.gmail}><i class="fa fa-google-plus"/></a></li>
                                                    }
                                                    {this.state.project.linkedin && 
                                                        <li><a href={this.state.project.linkedin}><i class="fa fa-linkedin"/></a></li>
                                                    }
                                                    {this.state.project.github &&
                                                        <li><a href={this.state.project.github}><i class="fa fa-github-alt"/></a></li>
                                                    }
                                                    {this.state.project.youtube &&
                                                        <li><a href={this.state.project.youtube}><i class="fa fa-youtube-play"/></a></li>
                                                    }
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                        </Col>                                          
                                    <Col
                                        xs={{ size: 6, offset: 3 }}
                                        sm={{ size: 6, offset: 3 }}
                                        md={{ size: 4, offset: 0 }}
                                        lg={{ size: 4, offset: 0 }}
                                        xl={{ size: 4, offset: 0 }}                                     
                                    >
                                        <div className={"personal-buttons"}>
                                            {this.state.user.id && this.state.project.projectOwner && this.state.project.projectOwner.id && this.state.user.id === this.state.project.projectOwner.id &&
                                                <button className={"contact-button"} onClick={this.createTask}><i
                                                 className="fa fa-paper-plane"/>&nbsp;CREATE TASK</button>
                                            }
                                            {this.state.user.id && this.state.project.projectOwner && this.state.project.projectOwner.id && this.state.user.id === this.state.project.projectOwner.id &&
                                                <button className={"edit-button"} onClick={this.editProject}><i className="fa fa-edit"/>&nbsp;Edit Project</button>
                                            }
                                            {/*<Link to="/account/edit-user">Edit profile</Link>*/}

                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            </Card>
                        </Col>
                    </Row>
                </div>

            </div>
        );
    }
};
