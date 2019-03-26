import React, {Component} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBCollapse,
    MDBIcon,
    MDBRow,
    row,
} from 'mdbreact';
import UserService from '../../UserService';
import './UserPage.styles.css';
import UserPageHeader from "../InfoMyPageComponents/UserPageHeader";
import AboutMe from "../InfoMyPageComponents/AboutMe";
import Comments from "../InfoMyPageComponents/Comments";
import LastActiveProjects from "../InfoMyPageComponents/LastActiveProjects";
import Contacts from "../InfoMyPageComponents/Contacts";

export default class UserPage extends Component {
    constructor() {
        super();
        this.UserService = new UserService();
    }
    state = {
        user: {
            name: '',
            currentRole: 'Web App Developer',
            email: 'somemail@gmail.com',
            websiteLink: 'www.coolsite.com',
            skills: [],
            education: [],
            experience: [],
            languages: [],
            conferences: [
                {
                    name: "WWDC 2014",
                    city: "San Francisco"
                },
                {
                    name: "Hive",
                    city: "Seattle"
                },
            ],
        },
        preview: '',
        collapsePersonalData: false,
        collapseProjects: false,
        collapseReviews: false,
        collapseAboutMe: true,
        projectsListData: [],
        commentsListData: [],
    }

    componentDidMount() {
        const { match } = this.props;
        const userId = match.params.id;
        this.setUserInfo(userId);
    }

    setUserInfo = async (userId) => {
        const gotUser = await this.UserService.getInfoAboutUser(userId);
        if (gotUser) {

            const updatedUser = {
                ...this.state.user,
                name: gotUser.username,
                email: gotUser.mail,
                skills: gotUser.skills.split(" "),
                websiteLink: gotUser.website,
                languages: gotUser.languageLevels,
                education: gotUser.educations,
                experience: gotUser.workExperiences,
                linkedin: gotUser.linkedin,
                github: gotUser.github,
                gmail: gotUser.gmail,
                twitter: gotUser.twitter,
                youtube: gotUser.youtube,
                aboutMe: gotUser.aboutMe,
            }
            this.setState({
                user: updatedUser,
            });

        }
    }

    setProjectsForUser = async () => {
        const { match } = this.props;
        const userId = match.params.id;
        const userProjects = await this.UserService.getUserProjects(userId);
        if (userProjects && userProjects.content && userProjects.content.length) {
            let projectList = [];
            userProjects.content.forEach(project => {
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
            });
        }
    }

    setCommentsForUser = async () => { 
        const { match } = this.props;
        const userId = match.params.id;
        const commentsForUser = await this.UserService.getCommentsForUser(userId);
        if (commentsForUser && commentsForUser.length) {
            let commentsList = [];
            commentsForUser.forEach(comment => {
                const commentTemplate = {
                    commentId:  comment.id,
                    commentText: comment.commentaryText,
                    commentDate: comment.commentaryDate,
                    commentFrom: comment.fromUser.username,
                };
                commentsList.push(commentTemplate);
            });
            this.setState({
                commentsListData: commentsList,
            });
        }
    }

    toggleProjects = () => {
        this.setState({
            collapseProjects: !this.state.collapseProjects,
            collapseAboutMe: false,
            collapseReviews: false,
        });
        this.setProjectsForUser();
    }

    toggleReviews = () => {
        this.setState({
            collapseReviews: !this.state.collapseReviews,
            collapseProjects: false,
            collapseAboutMe: false,
        });
        this.setCommentsForUser();
    }

    toggleAboutMe = () => {
        this.setState({
            collapseAboutMe: !this.state.collapseAboutMe,
            collapseProjects: false,
            collapseReviews: false,
        });
    }

    editProfile = () => {
        this.props.history.push(`/account/edit-user`);
    }

    render() {

        return (
            <div>
                <MDBRow>
                    <MDBCol lg="12">
                        <UserPageHeader user={this.state.user}/>
                    </MDBCol>

                    <MDBCol xs="10" sm="10" md="6" lg="6" xl="7"
                            className="offset-xs-0 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1"
                    >
                        <MDBCollapse isOpen={this.state.collapseAboutMe}>
                            <AboutMe user={this.state.user} />
                        </MDBCollapse>

                        <MDBCollapse isOpen={this.state.collapseReviews}>
                            <Comments
                                commentsListData={this.state.commentsListData}
                            />
                        </MDBCollapse>

                        <MDBCollapse isOpen={this.state.collapseProjects}>
                            <LastActiveProjects projectsListData={this.state.projectsListData} />
                        </MDBCollapse>

                    </MDBCol>

                    <MDBCol xs="10" sm="10" md="4" lg="4" xl="3">
                        <MDBCol xs="12">
                            <MDBCard
                                style={{marginBottom: "10px"}}
                            >
                                <MDBCardBody>
                                    <MDBCardTitle>Views</MDBCardTitle>
                                    <MDBCardText>
                                        Panel to control view of your content goes here. Click buttons to manipulate order of your content.
                                    </MDBCardText>

                                    <MDBBtn onClick={this.toggleAboutMe} className="col-7">
                                        <MDBIcon fub icon="user"/> About Me
                                    </MDBBtn>
                                    <MDBBtn onClick={this.toggleReviews} className="col-7">
                                        <MDBIcon fub icon="comments"/> Comments
                                    </MDBBtn>
                                    <MDBBtn onClick={this.toggleProjects} className="col-7">
                                        <MDBIcon fub icon="briefcase"/> Projects
                                    </MDBBtn>

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol xs="12">
                            <Contacts
                                email={this.state.user.email}
                                websiteLink={this.state.user.websiteLink}
                            />
                        </MDBCol>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }
};
