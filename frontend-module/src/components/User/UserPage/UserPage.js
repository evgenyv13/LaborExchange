import React, {Component} from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Collapse, Progress, Row,} from 'reactstrap';
import UserService from '../../UserService';
import UserIcon from '../../../common/images/UserIcon.jpg';
import './UserPage.styles.css';
import 'font-awesome/css/font-awesome.min.css';


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
            console.log(gotUser);

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
            console.log(updatedUser);
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
            <div className={"user-page"}>
                <div className={"user-page-wrapper"}>
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
                                <Row
                                    style={{paddingTop: "30px", paddingBottom: "30px"}}
                                >
                                    <Col
                                        xs={{ size: 6, offset: 3 }}
                                        sm={{ size: 6, offset: 3 }}
                                        md={{ size: 3, offset: 1 }}
                                        lg={{ size: 2, offset: 1 }}
                                        xl={{ size: 2, offset: 1 }}
                                        
                                    >
                                        <CardImg 
                                            top
                                            width="100%"
                                            src={UserIcon}
                                            alt="Profile image"
                                            style={{borderRadius: '50%' }}
                                        />
                                    </Col>
                                    <Col
                                        xs={{ size: 6, offset: 3 }}
                                        sm={{ size: 6, offset: 3 }}
                                        md={{ size: 3, offset: 0 }}
                                        lg={{ size: 5, offset: 0 }}
                                        xl={{ size: 5, offset: 0 }}                                    
                                    >
                                        <div className={"personal-data"}>
                                            <div className={"personal-data-item"}><div className={"user-name"}>{this.state.user.name}</div></div>
                                            <div className={"personal-data-item"}><div className={"user-profession"}>{this.state.user.currentRole}</div></div>
                                            <div className={"personal-data-item"}>
                                                <ul class="social list-inline">
                                                    {this.state.user.twitter &&
                                                        <li><a href={this.state.user.twitter}><i class="fa fa-twitter"/></a></li>
                                                    }
                                                    {this.state.user.gmail &&
                                                        <li><a href={this.state.user.gmail}><i class="fa fa-google-plus"/></a></li>
                                                    }
                                                    {this.state.user.linkedin && 
                                                        <li><a href={this.state.user.linkedin}><i class="fa fa-linkedin"/></a></li>
                                                    }
                                                    {this.state.user.github &&
                                                        <li><a href={this.state.user.github}><i class="fa fa-github-alt"/></a></li>
                                                    }
                                                    {this.state.user.youtube &&
                                                        <li><a href={this.state.user.youtube}><i class="fa fa-youtube-play"/></a></li>
                                                    }
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                        </Col>                                          
                                    <Col
                                        xs={{ size: 6, offset: 3 }}
                                        sm={{ size: 6, offset: 3 }}
                                        md={{ size: 4, offset: 0 }}
                                        lg={{ size: 3, offset: 0 }}
                                        xl={{ size: 3, offset: 0 }}                                        
                                    >
                                        <div className={"personal-buttons"}>
                                            <button className={"contact-button"}><i class="fa fa-paper-plane"/>&nbsp;CONTACT USER</button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                    </Col>
                    <Col
                        xs={{ size: 12, offset: 0 }}
                        sm={{ size: 12, offset: 0 }}
                        md={{ size: 12, offset: 0 }}
                        lg={{ size: 12, offset: 0 }}
                        xl={{ size: 12, offset: 0 }}
                       
                    >
                        <Row>
                            <Col
                                xs={{ size: 10, offset: 1 }}
                                sm={{ size: 10, offset: 1 }}
                                md={{ size: 6, offset: 1 }}
                                lg={{ size: 6, offset: 1 }}
                                xl={{ size: 7, offset: 1 }}
                               
                            >   
                                <Collapse isOpen={this.state.collapseProjects}>
                                    <Col
                                        xs={{ size: 12, offset: 0 }}
                                        sm={{ size: 12, offset: 0 }}
                                        md={{ size: 12, offset: 0 }}
                                        lg={{ size: 12, offset: 0 }}
                                        xl={{ size: 12, offset: 0 }}
                                    >
                                        <Card
                                            style={{marginBottom: "30px"}}
                                        >
                                            <div className={"card-content"}>
                                                <div className={"card-title"}>Latest projects</div>
                                                {this.state.projectsListData.map((project) => {
                                                    return (
                                                        <div className="user-page-project">
                                                            <Card key={project.projectId}>
                                                                <CardBody>
                                                                    <CardTitle>{project.projectName}</CardTitle>
                                                                    <CardText>{project.projectDescription}</CardText>
                                                                </CardBody>
                                                            </Card>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </Card>
                                    </Col>
                                </Collapse>
                                <Collapse isOpen={this.state.collapseReviews}>
                                    <Col
                                        xs={{ size: 12, offset: 0 }}
                                        sm={{ size: 12, offset: 0 }}
                                        md={{ size: 12, offset: 0 }}
                                        lg={{ size: 12, offset: 0 }}
                                        xl={{ size: 12, offset: 0 }}
                                    
                                    >
                                        <Card
                                            style={{marginBottom: "30px"}}
                                        >
                                            <div className={"card-content"}>
                                                <div className={"card-title"}>Comments</div>
                                                {this.state.commentsListData.map((review) => {
                                                    console.log(review);

                                                    return (
                                                        <div className="user-page-project">
                                                            <Card key={review.commentId}>
                                                                <CardBody>
                                                                    <CardTitle>{review.commentFrom}</CardTitle>
                                                                    <CardText>{review.commentText}</CardText>
                                                                </CardBody>
                                                            </Card>
                                                        </div>

                                                    );
                                                })}
                                            </div>
                                        </Card>
                                    </Col>
                                </Collapse>
                                <Collapse isOpen={this.state.collapseAboutMe}>
                                    <Col
                                        xs={{ size: 12, offset: 0 }}
                                        sm={{ size: 12, offset: 0 }}
                                        md={{ size: 12, offset: 0 }}
                                        lg={{ size: 12, offset: 0 }}
                                        xl={{ size: 12, offset: 0 }}
                                    
                                    >
                                        <Card
                                            style={{marginBottom: "30px"}}
                                        >
                                            <div className={"card-content"}>
                                                {this.state.user && this.state.user.aboutMe && <div className={"card-title"}>About User</div>}
                                                {this.state.user && this.state.user.aboutMe &&
                                                    <div className={"card-content-item"}>{this.state.user && this.state.user.aboutMe || ''}</div>
                                                }
                                                {this.state.user && this.state.user.experience && <div className={"card-title"}>Work Experience</div>}
                                                {this.state.user && this.state.user.experience &&
                                                    this.state.user.experience.map(item => 
                                                        <div className={"card-content-item"}>
                                                            <div className={"experience-title-wrapper"}>
                                                                <div className={"experience-position"}>{item.position}</div>
                                                                <div className={"experience-company"}>{item.companyName}</div>
                                                            </div>
                                                            <div>{item.description}</div>
                                                        </div>
                                                    )
                                                }
                                                {this.state.user && this.state.user.skills &&
                                                    <div>
                                                        <div className={"card-title"}>Skills</div>
                                                        <div className={"card-content-item"}>
                                                            <div className={"card-text"}>
                                                                Intro about your skills goes here. Keep the list lean and only show your primary skillset. You can always provide a link to your Linkedin or Coderwall profile so people can get more info there.
                                                            </div>
                                                            {this.state.user && this.state.user.skills &&
                                                                this.state.user.skills.map((skill) =>
                                                                    <div>
                                                                        <div className={"skill"}>{skill}</div>
                                                                        <Progress color="success" value={(skill.length * 25) % 100} style={{height: "10px" }} />
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                                {this.state.user && this.state.user.education && 
                                                    <div>
                                                        <div className={"card-title"}>Education</div>
                                                        <div className={"card-content-item"}>
                                                            {this.state.user && this.state.user.education &&
                                                                this.state.user.education.map((item) => 
                                                                    <div className={"education-item"}>
                                                                        <div className={"education-name"}> <i class="fa fa-graduation-cap"/> {item.university}</div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                                {this.state.user && this.state.user.languages &&
                                                    <div>
                                                        <div className={"card-title"}>Languages</div>
                                                        <div className={"card-content-item"}>
                                                        {this.state.user && this.state.user.languages &&
                                                            this.state.user.languages.map((language) => 
                                                                <div className={'language-item'}>
                                                                    <div className={"language-name"}>{language.language}</div>
                                                                    <div className={"language-level"}>{language.language_level}</div>
                                                                </div>
                                                            )
                                                        }
                                                        </div>
                                                    </div>
                                                }
                                                {this.state.user && this.state.user.conferences &&
                                                    <div>
                                                        <div className={"card-title"}>Conferences</div>
                                                        <div className={"card-content-item"}>
                                                        {this.state.user && this.state.user.conferences &&
                                                            this.state.user.conferences.map(conference => 
                                                                <div className={"conference-item"}>
                                                                    <i class="fa fa-calendar"/> {`${conference.name} (${conference.city}) `}
                                                                </div>    
                                                            )
                                                        }
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            
                                        </Card>
                                    </Col>
                                </Collapse>
                                
                                
                                
                            </Col>
                            
                            <Col
                                xs={{ size: 10, offset: 1 }}
                                sm={{ size: 10, offset: 1 }}
                                md={{ size: 4, offset: 0 }}
                                lg={{ size: 4, offset: 0 }}
                                xl={{ size: 3, offset: 0 }}
                                 
                               
                            >
                                <Col
                                    xs={{ size: 12, offset: 0 }}
                                    sm={{ size: 12, offset: 0 }}
                                    md={{ size: 12, offset: 0 }}
                                    lg={{ size: 12, offset: 0 }}
                                    xl={{ size: 12, offset: 0 }}
                                
                                >
                                    <Card
                                        style={{marginBottom: "30px"}}
                                    >
                                        <div className={"card-content"}>
                                            <div className={"card-title"}>Views</div>
                                            <div className={"card-text"}>
                                                Panel to control view of your content goes here. Click buttons to manipulate order of your content.
                                            </div>
                                            <div class="view-Info-Buttons">
                                                <Row
                                                    style={{ margin: '0px'}}
                                                >
                                                    <Col
                                                        xs={{ size: 12, offset: 0 }}
                                                        sm={{ size: 12, offset: 0 }}
                                                        md={{ size: 12, offset: 0 }}
                                                        lg={{ size: 12, offset: 0 }}
                                                        xl={{ size: 10, offset: 1 }}
                                                    >
                                                        <Button onClick={this.toggleAboutMe} block><i className="fa fa-user"/> About User</Button>
                                                    </Col>
                                                    <Col
                                                        xs={{ size: 12, offset: 0 }}
                                                        sm={{ size: 12, offset: 0 }}
                                                        md={{ size: 12, offset: 0 }}
                                                        lg={{ size: 12, offset: 0 }}
                                                        xl={{ size: 10, offset: 1 }}
                                                    >
                                                        <Button onClick={this.toggleReviews} block><i className="fa fa-comments"/> Comments</Button>
                                                    </Col>
                                                    <Col
                                                        xs={{ size: 12, offset: 0 }}
                                                        sm={{ size: 12, offset: 0 }}
                                                        md={{ size: 12, offset: 0 }}
                                                        lg={{ size: 12, offset: 0 }}
                                                        xl={{ size: 10, offset: 1 }}
                                                    >
                                                        <Button onClick={this.toggleProjects} block><i className="fa fa-briefcase"/> Projects</Button>
                                                    </Col>
                                                </Row>
                                                
                                               
                                            </div>
                                        </div>
                                    </Card>  
                                </Col> 
                                <Col
                                    xs={{ size: 12, offset: 0 }}
                                    sm={{ size: 12, offset: 0 }}
                                    md={{ size: 12, offset: 0 }}
                                    lg={{ size: 12, offset: 0 }}
                                    xl={{ size: 12, offset: 0 }}
                                
                                >
                                    <Card
                                        style={{marginBottom: "30px"}}
                                    >
                                        <div className={"card-content"}>
                                            <div className={"card-title"}>Contacts</div>
                                            <div className={"contacts-item"}>{this.state.user.email}</div>
                                            <div className={"contacts-item"}>{this.state.user.websiteLink}</div>
                                        </div>
                                    </Card>  
                                </Col>   
                            </Col>
                        </Row>
                       

                        
                    </Col>
                    

                </Row>
                </div>
            </div>
        );
    }
};
