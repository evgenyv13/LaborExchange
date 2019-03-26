import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './TaskPage.styles.css';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCol,
    MDBInput,
    MDBProgress,
    MDBRow
} from 'mdbreact';
import UserService from '../../UserService';
import Default from '../../../common/images/Startups.png';
import UserIcon from '../../../common/images/UserIcon.jpg';

export default class TaskPage extends Component {
    constructor(props) {
        super(props);
        this.UserService = new UserService();
        this.handleChangeReplyDescription = this.handleChangeReplyDescription.bind(this);
        this.handleChangeReplyWantedPercent = this.handleChangeReplyWantedPercent.bind(this);
    }

    state = {
        task: {
            category: '',
            description: '',
            name: '',
            paymentPercent: 10,
            MDBProgress: 20,
            project: '',
            replyingTasks: [],
            skills: [],
            userAccepteed: ''
        },
        replyDescription: '',
        replyWantedPercent: '',
    };

    componentDidMount() {
        const { match } = this.props;
        const taskId = match.params.id;
        this.updateTask(taskId);
    }

    updateTask = async (taskId) => {
        const task = await this.UserService.getTaskData(taskId);
        this.setState({
           task
        });
        console.log(task);
    };

    sendRequestOnTask = async () => {
        const formData = new FormData();
        formData.append("task", this.props.match.params.id);
        formData.append("description", this.state.replyDescription);
        formData.append("wantedPercent", this.state.replyWantedPercent);

        await this.UserService.sendRequestOnTaskExecution(formData).then(
            (result) => console.log(result),
        );
    };

    approveUserForTaskExec = async () => {
        const formData = new FormData();
        formData.append("taskReplyId", this.props.match.params.id);
        console.log(this.UserService);
        await this.UserService.approveUserOnTaskExecution(formData)
            .then(
                (result) => console.log(result)
            );
        this.updateTask(this.props.match.params.id);
    };


    handleChangeReplyDescription(event) {
        this.setState({replyDescription: event.target.value});
    }

    handleChangeReplyWantedPercent(event) {
        this.setState({replyWantedPercent: event.target.value});
    }

    render() {
        return (
            <MDBCol xs="12" style={{marginBottom: "30px"}}>
                <MDBCard
                    style={{marginBottom: "30px"}}
                >
                    <MDBRow
                        style={{paddingTop: "30px", paddingBottom: "30px"}}
                    >
                        <MDBCol xs="6" sm="5" md="5" lg="3" xl="2"
                                className="offset-xs-3 offset-sm-3 offset-md-1 offset-lg-1 offset-xl-1"
                        >
                            <MDBCardImage
                                top
                                width="100%"
                                src={Default}
                                alt="Project image"
                            />
                        </MDBCol>
                        <MDBCol xs="2" sm="3" md="3" lg="4" xl="5"
                                className="offset-xs-3 offset-sm-3 offset-md-0 offset-lg-0 offset-xl-0"
                        >
                            <div>
                                <MDBCardTitle className={"personal-data-item"}>
                                    <div className={"user-name"}>{this.state.task && this.state.task.name || ''}</div>
                                </MDBCardTitle>

                                <div className={"personal-data-item"}>
                                    <div className={"user-profession"}>{this.state.task && this.state.task.category || ''}</div>
                                </div>
                                <div className={"personal-data-item"}>
                                    <h6>{`Task MDBProgress: ${this.state.task && this.state.task.MDBProgress || 0}%`}</h6>
                                    <MDBProgress color="success" value={this.state.task && this.state.task.MDBProgress || 0} />
                                </div>
                            </div>
                        </MDBCol>

                    </MDBRow>
                </MDBCard>

            <MDBCol xs="12"
                    style={{paddingTop: "20px"}}
            >
                {this.state.task && this.state.task.replyingTasks && this.state.task.replyingTasks.map(reply => {
                    return (
                    <MDBRow style={{marginBottom: "20px"}}>
                        <MDBCol xl="8"
                            className="offset-xl-2"
                        >
                        <MDBCard>
                            <MDBCardBody>
                                <MDBRow>
                                <MDBCol xs="10" sm="6" md="2" lg="2" xl="2"
                                >
                                    <Link to={`/account/user-page/${reply.user.id}`}>
                                        <MDBCardImage top width="100%" src={UserIcon} alt="Profile image" />
                                    </Link>
                                </MDBCol>
                                <MDBCol xs="10" sm="6" md="2" lg="2" xl="2"
                                >
                                    <div className={"reply-item"}>{reply.user.username}</div>
                                </MDBCol>

                                <MDBCol xs="10" sm="6" md="2" lg="2" xl="2"
                                >
                                    <div className={"reply-item"}>{`${reply.wantedPercent}%`}</div>
                                </MDBCol>

                                <MDBCol xs="10" sm="6" md="3" lg="4" xl="3"
                                >
                                    <div className={"reply-item"}>{reply.description}</div>
                                </MDBCol>
                                <MDBCol xs="10" sm="6" md="4" lg="3" xl="3"
                                >
                                    <div className="reply-item">
                                        <MDBBtn onClick={this.approveUserForTaskExec} className="approve-MDBBtn-MDBBtn"><i className="fa fa-briefcase"/> Approve</MDBBtn>
                                    </div>
                                </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    );
                    })}
                </MDBCol>

                <MDBRow>
                    <MDBCol xl="8"
                        className="offset-xl-2"
                    >
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCol xs="12" xl="3"
                                    className="offset-xl-3"
                            >

                                <MDBInput style={{marginTop: "15px", marginBottom: "5px"}}
                                       label={"Wanted persents"}
                                       value={this.state.replyWantedPercent}
                                       onChange={this.handleChangeReplyWantedPercent}
                                />
                            </MDBCol>

                            <MDBCol xs="12" xl="6"
                                    className="offset-xl-3"
                            >
                                <MDBInput
                                       type="textarea"
                                       label="Type your reply"
                                       name="text"
                                       value={this.state.replyDescription}
                                       onChange={this.handleChangeReplyDescription}
                                />
                            </MDBCol>

                            <MDBCol xs="12" xl="6"
                                    className="offset-xl-3"
                            >
                                <div className="task-MDBBtn-wrapper">
                                    <MDBBtn className="approve-MDBBtn-MDBBtn" onClick={this.sendRequestOnTask}>Send Request</MDBBtn>
                                </div>
                            </MDBCol>
                        </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBCol>
        );
    }
};
