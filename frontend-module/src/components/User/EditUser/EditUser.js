import React, {Component} from 'react';
import {Card, CardBody, Col, Input, Row} from 'reactstrap';
import './EditUser.styles.css';
import UserService from "../../UserService";

export default class EditUser extends Component {
    constructor() {
        super();
        this.UserService = new UserService();
        this.state = {
            mail: '',
            website: '',
            skills: [],
            linkedin: '',
            github: '',
            gmail: '',
            twitter: '',
            youtube: '',
            aboutMe: '',
            languageLevels: [],
            educations: [],
            workExperiences: [],
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
        this.handleChangeSkill = this.handleChangeSkill.bind(this);
        this.handleChangeLinkedin = this.handleChangeLinkedin.bind(this);
        this.handleChangeGithub = this.handleChangeGithub.bind(this);
        this.handleChangeTwitter = this.handleChangeTwitter.bind(this);
        this.handleChangeGmail = this.handleChangeGmail.bind(this);
        this.handleChangeYoutube = this.handleChangeYoutube.bind(this);
        this.handleChangeAboutMe = this.handleChangeAboutMe.bind(this);

        this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
        this.handleChangeLanguageLevel = this.handleChangeLanguageLevel.bind(this);
        this.handleChangeEducation = this.handleChangeEducation.bind(this);
        this.handleChangeWorkPlace = this.handleChangeWorkPlace.bind(this);
        this.handleChangePosition = this.handleChangePosition.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);

        this.deleteLanguage = this.deleteLanguage.bind(this);
        this.deleteEducation = this.deleteEducation.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
    }

    componentDidMount() {
        this.setUserInfo();
    }

    setUserInfo = async () => {
        const gotUser = await this.UserService.getInfoAboutMe();
        if (gotUser) {
            this.setState({
                    mail: gotUser.mail,
                    website: gotUser.website,
                    skills: gotUser.userSkills,
                    linkedin: gotUser.linkedin,
                    github: gotUser.github,
                    gmail: gotUser.gmail,
                    twitter: gotUser.twitter,
                    youtube: gotUser.youtube,
                    aboutMe: gotUser.aboutMe,
                    languageLevels: gotUser.languageLevels,
                    workExperiences: gotUser.workExperiences,
                    educations: gotUser.educations,
                }
            );
        }
    };

    sendForm = async () => {
        const formData = new FormData();
        formData.append('mail', this.state.mail);
        formData.append('website', this.state.website);
        formData.append('linkedin', this.state.linkedin);
        formData.append('github', this.state.github);
        formData.append('gmail', this.state.gmail);
        formData.append('twitter', this.state.twitter);
        formData.append('youtube', this.state.youtube);
        formData.append('aboutMe', this.state.aboutMe);
        const response = await this.UserService.updateUser(formData);
        console.log(response);
        this.props.history.push(`/account/projects-catalog`);
    };


    handleChangeEmail(event) {
        this.setState({mail: event.target.value});
    }
    handleChangeWebsite(event) {
        this.setState({website: event.target.value});
    }
    handleChangeSkill(event) {
        this.setState({newSkill: event.target.value});
    }

    handleChangeLinkedin(event) {
        this.setState({linkedin: event.target.value});
    }

    handleChangeGithub(event) {
        this.setState({github: event.target.value});
    }

    handleChangeYoutube(event) {
        this.setState({youtube: event.target.value});
    }

    handleChangeGmail(event) {
        this.setState({gmail: event.target.value});
    }

    handleChangeTwitter(event) {
        this.setState({twitter: event.target.value});
    }

    handleChangeAboutMe(event) {
        this.setState({aboutMe: event.target.value});
    }

    handleChangeLanguage(event) {
        this.setState({newLanguage: event.target.value});
    }

    handleChangeLanguageLevel(event) {
        this.setState({newLanguageLevel: event.target.value});
    }

    handleChangeEducation(event) {
        this.setState({education: event.target.value});
    }

    handleChangeWorkPlace(event) {
        this.setState({newWorkplace: event.target.value});
    }

    handleChangePosition(event) {
        this.setState({newPosition: event.target.value});
    }

    handleChangeDescription(event) {
        this.setState({newDescription: event.target.value});
    }

    clearLanguageInputs() {
        this.inputLanguage.value = "";
        this.inputLanguageLevel.value = "";
    }
    clearEducationInputs() {
        this.inputEducation.value = "";
    }
    clearWorkExperienceInputs() {
        this.inputWorkPlace.value = "";
        this.inputPosition.value = "";
        this.inputWorkDescription.value = "";
    }

    clearSkillsInputs() {
        this.inputSkill.value = "";
    }

    addLanguage = async () => {
       const formData = new FormData();
       formData.append('language', this.state.newLanguage);
       formData.append('language_level', this.state.newLanguageLevel);
       const response = await this.UserService.addLanguage(formData);
       if (response) {
           this.clearLanguageInputs();
           this.setState(
               {
                   languageLevels: [...this.state.languageLevels, response],
               });
       }
    };

    deleteLanguage = async (event) => {
        const id = event.target.id;
        const response = await this.UserService.deleteLanguageLevel(id);
        let array;
        if (response) {
            array = [...this.state.languageLevels];
            for (let i = 0; i < array.length; i++) {
                {
                    if (array[i].id == id) {
                        array.splice(i, 1);
                        break;
                    }
                }
            }
            this.setState({languageLevels: array});
        }
    };

    addSkill = async () => {
        const formData = new FormData();
        formData.append('skill', this.state.newSkill);
        const response = await this.UserService.addSkill(formData);
        if (response) {
            this.clearSkillsInputs();
            this.setState(
                {
                    skills: [...this.state.skills, response],
                });
        }
    };

    deleteSkill = async (event) => {
        const id = event.target.id;
        const response = await this.UserService.deleteSkill(id);
        let array;
        if (response) {
            array = [...this.state.skills];
            for (let i = 0; i < array.length; i++) {
                {
                    if (array[i].id == id) {
                        array.splice(i, 1);
                        break;
                    }
                }
            }
            this.setState({skills: array});
        }
    };

    addEducation = async () => {
        const formData = new FormData();
        formData.append('university', this.state.education);
        const response = await this.UserService.addEducation(formData);
        if (response) {
            this.clearEducationInputs();
            this.setState(
                {
                    educations: [...this.state.educations, response],
                });
        }
    };

    deleteEducation = async  (event) => {
        const id = event.target.id;
        const response = await this.UserService.deleteEducation(id);
        let array;
        if (response) {
            array = [...this.state.educations];
            for (let i = 0; i < array.length; i++) {
                {
                    if (array[i].id == id) {
                        array.splice(i, 1);
                        break;
                    }
                }
            }
            this.setState({educations: array});
        }
    };

    addWorkExperience = async () => {
        const formData = new FormData();
        formData.append('companyName', this.state.newWorkplace);
        formData.append('position', this.state.newPosition);
        formData.append('description', this.state.newDescription);
        const response = await this.UserService.addWorkExperience(formData);
        if (response) {
            this.clearWorkExperienceInputs();
            this.setState(
                {
                    workExperiences: [...this.state.workExperiences, response],
                });
        }
    };

    deleteWorkingPlace = async (event) => {
        const id = event.target.id;
        const response = await this.UserService.deleteWorkingPlace(id);
        let array;
        if (response) {
            array = [...this.state.workExperiences];
            for (let i = 0; i < array.length; i++) {
                {
                    if (array[i].id == id) {
                        array.splice(i, 1);
                        break;
                    }
                }
            }
            this.setState({workExperiences: array});
        }
    };

    render() {
        return (
            <div className="edit-user-wrapper">
              <div className="edit-user-content">
                <Row>
                  <Col
                    xs={{ size: 12, offset: 0 }}
                    sm={{ size: 12, offset: 0 }}
                    md={{ size: 12, offset: 0 }}
                    lg={{ size: 10, offset: 1 }}
                    xl={{ size: 8, offset: 2 }}
                  >
                    <Card>
                      <CardBody>
                      <Card
                        style={{border: "3px solid red"}}
                        style={{marginBottom: "30px"}}
                      >
                          <CardBody>
                          <Col
                              xs={{ size: 12, offset: 0 }}
                              sm={{ size: 12, offset: 0 }}
                              md={{ size: 12, offset: 0 }}
                              lg={{ size: 12, offset: 0 }}
                              xl={{ size: 12, offset: 0 }}
                          >
                              <h4 className="editUserHeader mainInfo">Main</h4>
                          </Col>
                            <div className="input-wrapper">
                              <Row>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 4, offset: 0 }}
                                      md={{ size: 4, offset: 0 }}
                                      lg={{ size: 3, offset: 0 }}
                                      xl={{ size: 2, offset: 0 }}
                                  >
                                      <div>Email:</div>
                                  </Col>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 8, offset: 0 }}
                                      md={{ size: 8, offset: 0 }}
                                      lg={{ size: 9, offset: 0 }}
                                      xl={{ size: 10, offset: 0 }}
                                  >
                                      <div className={"create-project-input-wrapper"}>
                                          <div className={'create-project-input-icon'}>
                                              <i className="fa fa-envelope"/>
                                          </div>
                                          <input
                                              type="text"
                                              value={this.state.mail}
                                              onChange={this.handleChangeEmail}
                                              placeholder="Type your email"
                                              className={"create-project-input"}
                                          />
                                      </div>
                                  </Col>
                              </Row>
                          </div>
                          <div className="input-wrapper">
                              <Row>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 4, offset: 0 }}
                                      md={{ size: 4, offset: 0 }}
                                      lg={{ size: 3, offset: 0 }}
                                      xl={{ size: 2, offset: 0 }}
                                  >
                                      <div>Website:</div>
                                  </Col>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 8, offset: 0 }}
                                      md={{ size: 8, offset: 0 }}
                                      lg={{ size: 9, offset: 0 }}
                                      xl={{ size: 10, offset: 0 }}
                                  >
                                      <div className={"create-project-input-wrapper"}>
                                          <div className={'create-project-input-icon'}>
                                              <i className="fa fa-globe"/>
                                          </div>
                                          <input
                                              type="text"
                                              value={this.state.website}
                                              onChange={this.handleChangeWebsite}
                                              placeholder="Type your website"
                                              className={"create-project-input"}
                                          />
                                      </div>
                                  </Col>
                              </Row>
                          </div>
                          </CardBody>
                      </Card>
                        <Card
                        style={{marginBottom: "30px"}}
                        >
                              <CardBody>
                              <Col
                                  xs={{ size: 12, offset: 0 }}
                                  sm={{ size: 12, offset: 0 }}
                                  md={{ size: 12, offset: 0 }}
                                  lg={{ size: 12, offset: 0 }}
                                  xl={{ size: 12, offset: 0 }}
                              >
                                  <h4 className="editUserHeader">Links</h4>
                              </Col>
                          <div className="input-wrapper">
                              <Row>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 4, offset: 0 }}
                                      md={{ size: 4, offset: 0 }}
                                      lg={{ size: 3, offset: 0 }}
                                      xl={{ size: 2, offset: 0 }}
                                  >
                                      <div>Linkedin:</div>
                                  </Col>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 8, offset: 0 }}
                                      md={{ size: 8, offset: 0 }}
                                      lg={{ size: 9, offset: 0 }}
                                      xl={{ size: 10, offset: 0 }}
                                  >
                                      <div className={"create-project-input-wrapper"}>
                                          <div className={'create-project-input-icon'}>
                                              <i className="fa fa-linkedin"/>
                                          </div>
                                          <input
                                              type="text"
                                              value={this.state.linkedin}
                                              onChange={this.handleChangeLinkedin}
                                              placeholder="Type your website"
                                              className={"create-project-input"}
                                          />
                                      </div>
                                  </Col>
                              </Row>
                          </div>
                          <div className="input-wrapper">
                              <Row>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 4, offset: 0 }}
                                      md={{ size: 4, offset: 0 }}
                                      lg={{ size: 3, offset: 0 }}
                                      xl={{ size: 2, offset: 0 }}
                                  >
                                      <div>Github:</div>
                                  </Col>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 8, offset: 0 }}
                                      md={{ size: 8, offset: 0 }}
                                      lg={{ size: 9, offset: 0 }}
                                      xl={{ size: 10, offset: 0 }}
                                  >
                                      <div className={"create-project-input-wrapper"}>
                                          <div className={'create-project-input-icon'}>
                                              <i className="fa fa-github"/>
                                          </div>
                                          <input
                                              type="text"
                                              value={this.state.github}
                                              onChange={this.handleChangeGithub}
                                              placeholder="Type your website"
                                              className={"create-project-input"}
                                          />
                                      </div>
                                  </Col>
                              </Row>
                          </div>
                          <div className="input-wrapper">
                              <Row>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 4, offset: 0 }}
                                      md={{ size: 4, offset: 0 }}
                                      lg={{ size: 3, offset: 0 }}
                                      xl={{ size: 2, offset: 0 }}
                                  >
                                      <div>Google:</div>
                                  </Col>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 8, offset: 0 }}
                                      md={{ size: 8, offset: 0 }}
                                      lg={{ size: 9, offset: 0 }}
                                      xl={{ size: 10, offset: 0 }}
                                  >
                                      <div className={"create-project-input-wrapper"}>
                                          <div className={'create-project-input-icon'}>
                                              <i className="fa fa-google-plus"/>
                                          </div>
                                          <input
                                              type="text"
                                              value={this.state.gmail}
                                              onChange={this.handleChangeGmail}
                                              placeholder="Type your website"
                                              className={"create-project-input"}
                                          />
                                      </div>
                                  </Col>
                              </Row>
                          </div>
                          <div className="input-wrapper">
                              <Row>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 4, offset: 0 }}
                                      md={{ size: 4, offset: 0 }}
                                      lg={{ size: 3, offset: 0 }}
                                      xl={{ size: 2, offset: 0 }}
                                  >
                                      <div>Twitter:</div>
                                  </Col>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 8, offset: 0 }}
                                      md={{ size: 8, offset: 0 }}
                                      lg={{ size: 9, offset: 0 }}
                                      xl={{ size: 10, offset: 0 }}
                                  >
                                      <div className={"create-project-input-wrapper"}>
                                          <div className={'create-project-input-icon'}>
                                              <i className="fa fa-twitter"/>
                                          </div>
                                          <input
                                              type="text"
                                              value={this.state.twitter}
                                              onChange={this.handleChangeTwitter}
                                              placeholder="Type your website"
                                              className={"create-project-input"}
                                          />
                                      </div>
                                  </Col>
                              </Row>
                          </div>
                          <div className="input-wrapper">
                              <Row>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 4, offset: 0 }}
                                      md={{ size: 4, offset: 0 }}
                                      lg={{ size: 3, offset: 0 }}
                                      xl={{ size: 2, offset: 0 }}
                                  >
                                      <div>Youtube:</div>
                                  </Col>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 8, offset: 0 }}
                                      md={{ size: 8, offset: 0 }}
                                      lg={{ size: 9, offset: 0 }}
                                      xl={{ size: 10, offset: 0 }}
                                  >
                                      <div className={"create-project-input-wrapper"}>
                                          <div className={'create-project-input-icon'}>
                                              <i className="fa fa-youtube-play"/>
                                          </div>
                                          <input
                                              type="text"
                                              value={this.state.youtube}
                                              onChange={this.handleChangeYoutube}
                                              placeholder="Type your website"
                                              className={"create-project-input"}
                                          />
                                      </div>
                                  </Col>
                              </Row>
                          </div>
                          </CardBody>
                      </Card>
                  <Card
                  style={{marginBottom: "30px"}}
                  >
                      <CardBody>
                          <Col
                              xs={{ size: 12, offset: 0 }}
                              sm={{ size: 12, offset: 0 }}
                              md={{ size: 12, offset: 0 }}
                              lg={{ size: 12, offset: 0 }}
                              xl={{ size: 12, offset: 0 }}
                          >
                              <h4 className="editUserHeader">Additional</h4>
                          </Col>

                          <div className="input-wrapper">
                              <Row>
                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 4, offset: 0 }}
                                      md={{ size: 4, offset: 0 }}
                                      lg={{ size: 3, offset: 0 }}
                                      xl={{ size: 2, offset: 0 }}
                                  >
                                      <div>About me:</div>
                                  </Col>

                                  <Col
                                      xs={{ size: 12, offset: 0 }}
                                      sm={{ size: 8, offset: 0 }}
                                      md={{ size: 8, offset: 0 }}
                                      lg={{ size: 9, offset: 0 }}
                                      xl={{ size: 10, offset: 0 }}
                                  >
                                      <Input placeholder="About me..."
                                             type="textarea"  style={{resize: "none"}}
                                             name="text" value={this.state.aboutMe}
                                             onChange={this.handleChangeAboutMe}/>
                                  </Col>
                              </Row>
                          </div>
                          <Row>
                              <Col>
                                  <div className="input-wrapper">
                                      <Row>
                                          <Col
                                              xs={{ size: 12, offset: 0 }}
                                              sm={{ size: 4, offset: 0 }}
                                              md={{ size: 4, offset: 0 }}
                                              lg={{ size: 3, offset: 0 }}
                                              xl={{ size: 2, offset: 0 }}
                                          >
                                              <div>Add skill:</div>
                                          </Col>
                                          <div className="col-12 offset-0 col-sm-8 offset-sm-0 col-md-8 offset-md-0 col-lg-9 offset-lg-0 col-xl-10 offset-xl-0">
                                              <div className={"field_input"}>
                                                  <input type="text" ref={el => this.inputSkill = el} onChange={this.handleChangeSkill} placeholder="Skill"/>
                                                  <button className={"add-button"} onClick={this.addSkill}>add</button>
                                              </div>
                                          </div>
                                          <Col
                                              xs={{ size: 12, offset: 0 }}
                                              sm={{ size: 4, offset: 0 }}
                                              md={{ size: 4, offset: 0 }}
                                              lg={{ size: 3, offset: 0 }}
                                              xl={{ size: 2, offset: 0 }}
                                          >
                                              <div>Skills:</div>
                                          </Col>
                                          <div className="col-12 offset-0 col-sm-8 offset-sm-0 col-md-8 offset-md-0 col-lg-9 offset-lg-0 col-xl-10 offset-xl-0">
                                              {this.state.skills
                                                  .map((element) =>
                                                      <div className={"field_enum"}>
                                                          <div className="col-xs-8">{element.skill}</div>
                                                          <div className="deleteIcon"> <i id={element.id}  className="fa fa-times" onClick={this.deleteSkill}/></div>
                                                      </div>

                                                  )
                                              }
                                          </div>

                                      </Row>
                                  </div>
                              </Col>
                          </Row>

                          <Row>
                              <Col>

                                  <div className="input-wrapper">
                                      <Row>
                                          <Col
                                              xs={{ size: 12, offset: 0 }}
                                              sm={{ size: 4, offset: 0 }}
                                              md={{ size: 4, offset: 0 }}
                                              lg={{ size: 3, offset: 0 }}
                                              xl={{ size: 2, offset: 0 }}
                                          >
                                              <div>Add language:</div>
                                          </Col>
                                          <div className="col-12 offset-0 col-sm-8 offset-sm-0 col-md-8 offset-md-0 col-lg-9 offset-lg-0 col-xl-10 offset-xl-0">
                                              <div className={"field_input"}>
                                                  <div className={"double-input-wrapper"}>
                                                      <input type="text" ref={el => this.inputLanguage = el} onChange={this.handleChangeLanguage} placeholder="Language" style={{margin: "0px"}}/>
                                                      <input type="text" ref={el => this.inputLanguageLevel = el} onChange={this.handleChangeLanguageLevel} placeholder="Lvl" style={{width: "60px"}}/>
                                                      <button className={"add-button"} onClick={this.addLanguage}>add</button>
                                                  </div>
                                              </div>
                                          </div>
                                          <Col
                                              xs={{ size: 12, offset: 0 }}
                                              sm={{ size: 4, offset: 0 }}
                                              md={{ size: 4, offset: 0 }}
                                              lg={{ size: 3, offset: 0 }}
                                              xl={{ size: 2, offset: 0 }}
                                          >
                                              <div>Language level:</div>
                                          </Col>
                                          <div className="col-12 offset-0 col-sm-8 offset-sm-0 col-md-8 offset-md-0 col-lg-9 offset-lg-0 col-xl-10 offset-xl-0">
                                              {this.state.languageLevels
                                                  .map((element) =>
                                                      <div className={"field_enum"}>
                                                          <div className="col-xs-8"> {element.language} / {element.language_level}</div>
                                                          <div className="deleteIcon"> <i id={element.id} onClick={this.deleteLanguage} className="fa fa-times"/></div>
                                                      </div>

                                                  )
                                              }
                                          </div>

                                      </Row>
                                  </div>
                              </Col>
                          </Row>

                          <Row>
                              <Col>
                                  <div className="input-wrapper">
                                      <Row>
                                          <Col
                                              xs={{ size: 12, offset: 0 }}
                                              sm={{ size: 4, offset: 0 }}
                                              md={{ size: 4, offset: 0 }}
                                              lg={{ size: 3, offset: 0 }}
                                              xl={{ size: 2, offset: 0 }}
                                          >
                                              <div>Add education:</div>
                                          </Col>
                                          <div className="col-12 offset-0 col-sm-8 offset-sm-0 col-md-8 offset-md-0 col-lg-9 offset-lg-0 col-xl-10 offset-xl-0">
                                              <div className={"field_input"}>
                                                  <input type="text" ref={el => this.inputEducation = el} onChange={this.handleChangeEducation} placeholder="Education"/>
                                                  <button className={"add-button"} onClick={this.addEducation}>add</button>
                                              </div>
                                          </div>
                                          <Col
                                              xs={{ size: 12, offset: 0 }}
                                              sm={{ size: 4, offset: 0 }}
                                              md={{ size: 4, offset: 0 }}
                                              lg={{ size: 3, offset: 0 }}
                                              xl={{ size: 2, offset: 0 }}
                                          >
                                              <div>Education:</div>
                                          </Col>
                                          <div className="col-12 offset-0 col-sm-8 offset-sm-0 col-md-8 offset-md-0 col-lg-9 offset-lg-0 col-xl-10 offset-xl-0">
                                              {this.state.educations
                                                  .map((element) =>
                                                      <div className={"field_enum"}>
                                                          <div className="col-xs-8">{element.university}</div>
                                                          <div className="deleteIcon"> <i id={element.id}  className="fa fa-times" onClick={this.deleteEducation}/></div>
                                                      </div>

                                                  )
                                              }
                                          </div>
                                      </Row>
                                  </div>
                              </Col>
                          </Row>

                          <Row>
                              <Col>

                                  <div className="input-wrapper">
                                      <Row>
                                          <Col
                                              xs={{ size: 12, offset: 0 }}
                                              sm={{ size: 4, offset: 0 }}
                                              md={{ size: 4, offset: 0 }}
                                              lg={{ size: 3, offset: 0 }}
                                              xl={{ size: 2, offset: 0 }}
                                          >
                                              <div>Add work experience:</div>
                                          </Col>
                                          <div className="col-10 offset-0 col-sm-8 offset-sm-0 col-md-8 offset-md-0 col-lg-9 offset-lg-0 col-xl-10 offset-xl-0">
                                              <div className={"field_input"}>
                                                  <div style={{display: "inline-grid"}}>
                                                      <div className={"double-input-wrapper"}>
                                                          <input type="text" ref={el => this.inputWorkPlace = el} onChange={this.handleChangeWorkPlace} placeholder="WorkPlace" style={{margin: "2px 6px 2px 0px"}}/>
                                                          <input className={"inputExperience"} type="text" ref={el => this.inputPosition = el} onChange={this.handleChangePosition} placeholder="Position" />
                                                      </div>
                                                      <textarea className={"textAreaExperience"} ref={el => this.inputWorkDescription = el} onChange={this.handleChangeDescription} placeholder="  Description"/>
                                                  </div>
                                                  <button style={{margin: "2px"}}   className="add-button" onClick={this.addWorkExperience}>add</button>
                                              </div>
                                          </div>
                                          <Col
                                              xs={{ size: 12, offset: 0 }}
                                              sm={{ size: 4, offset: 0 }}
                                              md={{ size: 4, offset: 0 }}
                                              lg={{ size: 3, offset: 0 }}
                                              xl={{ size: 2, offset: 0 }}
                                          >
                                              <div>Work experience:</div>
                                          </Col>
                                          <div className="col-12 offset-0 col-sm-8 offset-sm-0 col-md-8 offset-md-0 col-lg-9 offset-lg-0 col-xl-10 offset-xl-0">
                                              {this.state.workExperiences
                                                  .map((element) =>
                                                      <div className={"field_enum"}>
                                                          <div> {element.companyName} / {element.position}</div>
                                                          <div className="deleteIcon"> <i id={element.id}  className="fa fa-times" onClick={this.deleteWorkingPlace}/></div>
                                                      </div>

                                                  )
                                              }
                                          </div>
                                      </Row>
                                  </div>
                              </Col>
                          </Row>

                      </CardBody>
                  </Card>

                          <div className="input-wrapper">
                            <Row>
                              <Col
                                xs={{ size: 12, offset: 0 }}
                                sm={{ size: 4, offset: 8 }}
                                md={{ size: 4, offset: 8 }}
                                lg={{ size: 3, offset: 9 }}
                                xl={{ size: 3, offset: 9 }}
                              >
                                <button className="save-button" style={{fontSize: "17px"}} onClick={this.sendForm}>Save</button>
                              </Col>
                            </Row>
                          </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
        );
    }
};
