import React, { Component } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  row,
  MDBBtn,
  MDBIcon,
  MDBCardTitle,
  MDBRow
} from 'mdbreact';
import './EditUser.styles.css';
import UserService from '../../UserService';

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
      workExperiences: []
    };
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
        educations: gotUser.educations
      });
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
    this.props.history.push(`/account/my-page`);
  };

  handleChangeEmail = event => {
    this.setState({ mail: event.target.value });
  };
  handleChangeWebsite = event => {
    this.setState({ website: event.target.value });
  };
  handleChangeSkill = event => {
    this.setState({ newSkill: event.target.value });
  };

  handleChangeLinkedin = event => {
    this.setState({ linkedin: event.target.value });
  };

  handleChangeGithub = event => {
    this.setState({ github: event.target.value });
  };

  handleChangeYoutube = event => {
    this.setState({ youtube: event.target.value });
  };

  handleChangeGmail = event => {
    this.setState({ gmail: event.target.value });
  };

  handleChangeTwitter = event => {
    this.setState({ twitter: event.target.value });
  };

  handleChangeAboutMe = event => {
    this.setState({ aboutMe: event.target.value });
  };

  handleChangeLanguage = event => {
    this.setState({ newLanguage: event.target.value });
  };

  handleChangeLanguageLevel = event => {
    this.setState({ newLanguageLevel: event.target.value });
  };

  handleChangeEducation = event => {
    this.setState({ education: event.target.value });
  };

  handleChangeWorkPlace = event => {
    this.setState({ newWorkplace: event.target.value });
  };

  handleChangePosition = event => {
    this.setState({ newPosition: event.target.value });
  };

  handleChangeDescription = event => {
    this.setState({ newDescription: event.target.value });
  };

  clearLanguageInputs = () => {
    this.inputLanguage.value = '';
    this.inputLanguageLevel.value = '';
  };
  clearEducationInputs = () => {
    this.inputEducation.value = '';
  };
  clearWorkExperienceInputs = () => {
    this.inputWorkPlace.value = '';
    this.inputPosition.value = '';
    this.inputWorkDescription.value = '';
  };

  clearSkillsInputs = () => {
    this.inputSkill.value = '';
  };

  addLanguage = async () => {
    const formData = new FormData();
    formData.append('language', this.state.newLanguage);
    formData.append('language_level', this.state.newLanguageLevel);
    const response = await this.UserService.addLanguage(formData);
    if (response) {
      this.clearLanguageInputs();
      this.setState({
        languageLevels: [...this.state.languageLevels, response]
      });
    }
  };

  deleteLanguage = async event => {
    const id = event.target.id;
    const response = await this.UserService.deleteLanguageLevel(id);
    let array;
    if (response) {
      array = [...this.state.languageLevels];
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          array.splice(i, 1);
          break;
        }
      }
      this.setState({ languageLevels: array });
    }
  };

  addSkill = async () => {
    const formData = new FormData();
    formData.append('skill', this.state.newSkill);
    const response = await this.UserService.addSkill(formData);
    if (response) {
      this.clearSkillsInputs();
      this.setState({
        skills: [...this.state.skills, response]
      });
    }
  };

  deleteSkill = async event => {
    const id = event.target.id;
    const response = await this.UserService.deleteSkill(id);
    let array;
    if (response) {
      array = [...this.state.skills];
      for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) {
          array.splice(i, 1);
          break;
        }
      }
      this.setState({ skills: array });
    }
  };

  addEducation = async () => {
    const formData = new FormData();
    formData.append('university', this.state.education);
    const response = await this.UserService.addEducation(formData);
    if (response) {
      this.clearEducationInputs();
      this.setState({
        educations: [...this.state.educations, response]
      });
    }
  };

  deleteEducation = async event => {
    const id = event.target.id;
    const response = await this.UserService.deleteEducation(id);
    let array;
    if (response) {
      array = [...this.state.educations];
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          array.splice(i, 1);
          break;
        }
      }
      this.setState({ educations: array });
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
      this.setState({
        workExperiences: [...this.state.workExperiences, response]
      });
    }
  };

  deleteWorkingPlace = async event => {
    const id = event.target.id;
    const response = await this.UserService.deleteWorkingPlace(id);
    let array;
    if (response) {
      array = [...this.state.workExperiences];
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          array.splice(i, 1);
          break;
        }
      }
      this.setState({ workExperiences: array });
    }
  };

  render() {
    return (
      <MDBCard>
        <MDBCol
          xs="12"
          sm="12"
          md="12"
          lg="10"
          xl="8"
          className="offset-lg-1 offset-xl-2"
        >
          <MDBCardBody>
            <MDBCardTitle>Main</MDBCardTitle>
            <MDBInput
              type="text"
              label="Email"
              value={this.state.mail}
              onChange={this.handleChangeEmail}
              className={'create-project-MDBInput'}
              outline
              fas
              icon="envelope"
            />

            <MDBInput
              type="text"
              label="Website"
              outline
              fas
              icon="globe"
              value={this.state.website}
              onChange={this.handleChangeWebsite}
              className={'create-project-MDBInput'}
            />

            <MDBCardTitle>Links</MDBCardTitle>
            <MDBInput
              type="text"
              label="Linkedin"
              value={this.state.linkedin}
              onChange={this.handleChangeLinkedin}
            />

            <MDBInput
              type="text"
              label="Github"
              value={this.state.github}
              onChange={this.handleChangeGithub}
              className={'create-project-MDBInput'}
            />

            <MDBInput
              type="text"
              label="Gmail"
              value={this.state.gmail}
              onChange={this.handleChangeGmail}
              className={'create-project-MDBInput'}
            />

            <MDBInput
              type="text"
              label="Twitter"
              value={this.state.twitter}
              onChange={this.handleChangeTwitter}
              className={'create-project-MDBInput'}
            />

            <MDBInput
              type="text"
              label="Youtube"
              value={this.state.youtube}
              onChange={this.handleChangeYoutube}
              className={'create-project-MDBInput'}
            />

            <MDBCardTitle>Additional</MDBCardTitle>

            <MDBInput
              label="About me"
              type="textarea"
              name="text"
              value={this.state.aboutMe}
              onChange={this.handleChangeAboutMe}
            />
            <div className={'field_input'}>
              <MDBInput
                type="text"
                ref={el => (this.inputSkill = el)}
                onChange={this.handleChangeSkill}
                label="Skill"
              />
              <MDBBtn className={'add-MDBBtn'} onClick={this.addSkill}>
                add
              </MDBBtn>
            </div>
            <row>
              <MDBCol>
                <div className="MDBInput-wrapper">
                  <row>
                    <MDBCol
                      xs={{ size: 12, offset: 0 }}
                      sm={{ size: 4, offset: 0 }}
                      md={{ size: 4, offset: 0 }}
                      lg={{ size: 3, offset: 0 }}
                      xl={{ size: 2, offset: 0 }}
                    >
                      <div>Add skill:</div>
                    </MDBCol>
                    <div className="MDBCol-12 offset-0 MDBCol-sm-8 offset-sm-0 MDBCol-md-8 offset-md-0 MDBCol-lg-9 offset-lg-0 MDBCol-xl-10 offset-xl-0" />
                    <MDBCol
                      xs={{ size: 12, offset: 0 }}
                      sm={{ size: 4, offset: 0 }}
                      md={{ size: 4, offset: 0 }}
                      lg={{ size: 3, offset: 0 }}
                      xl={{ size: 2, offset: 0 }}
                    >
                      <div>Skills:</div>
                    </MDBCol>
                    <div className="MDBCol-12 offset-0 MDBCol-sm-8 offset-sm-0 MDBCol-md-8 offset-md-0 MDBCol-lg-9 offset-lg-0 MDBCol-xl-10 offset-xl-0">
                      {this.state.skills.map(element => (
                        <div className={'field_enum'}>
                          <div className="MDBCol-xs-8">{element.skill}</div>
                          <div className="deleteIcon">
                            {' '}
                            <i
                              id={element.id}
                              className="fa fa-times"
                              onClick={this.deleteSkill}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </row>
                </div>
              </MDBCol>
            </row>

            <row>
              <MDBCol>
                <div className="MDBInput-wrapper">
                  <row>
                    <div>Add language:</div>

                    <div className={'double-MDBInput-wrapper'}>
                      <MDBInput
                        type="text"
                        ref={el => (this.inputLanguage = el)}
                        onChange={this.handleChangeLanguage}
                        hint="Language"
                      />
                      <MDBInput
                        type="text"
                        ref={el => (this.inputLanguageLevel = el)}
                        onChange={this.handleChangeLanguageLevel}
                        hint="Lvl"
                      />
                      <MDBBtn
                        className={'add-MDBBtn'}
                        onClick={this.addLanguage}
                      >
                        add
                      </MDBBtn>
                    </div>

                    <div>Language level:</div>
                    <div className="MDBCol-12 offset-0 MDBCol-sm-8 offset-sm-0 MDBCol-md-8 offset-md-0 MDBCol-lg-9 offset-lg-0 MDBCol-xl-10 offset-xl-0">
                      {this.state.languageLevels.map(element => (
                        <div className={'field_enum'}>
                          <div className="MDBCol-xs-8">
                            {' '}
                            {element.language} / {element.language_level}
                          </div>
                          <div className="deleteIcon">
                            {' '}
                            <i
                              id={element.id}
                              onClick={this.deleteLanguage}
                              className="fa fa-times"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </row>
                </div>
              </MDBCol>
            </row>

            <row>
              <MDBCol>
                <div className="MDBInput-wrapper">
                  <row>
                    <div>Add education:</div>
                    <div className="MDBCol-12 offset-0 MDBCol-sm-8 offset-sm-0 MDBCol-md-8 offset-md-0 MDBCol-lg-9 offset-lg-0 MDBCol-xl-10 offset-xl-0">
                      <div className={'field_input'}>
                        <MDBInput
                          type="text"
                          ref={el => (this.inputEducation = el)}
                          onChange={this.handleChangeEducation}
                          hint="Education"
                        />
                        <MDBBtn
                          className={'add-MDBBtn'}
                          onClick={this.addEducation}
                        >
                          add
                        </MDBBtn>
                      </div>
                    </div>
                    <div>Education:</div>
                    <div className="MDBCol-12 offset-0 MDBCol-sm-8 offset-sm-0 MDBCol-md-8 offset-md-0 MDBCol-lg-9 offset-lg-0 MDBCol-xl-10 offset-xl-0">
                      {this.state.educations.map(element => (
                        <div className={'field_enum'}>
                          <div className="MDBCol-xs-8">
                            {element.university}
                          </div>
                          <div className="deleteIcon">
                            {' '}
                            <i
                              id={element.id}
                              className="fa fa-times"
                              onClick={this.deleteEducation}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </row>
                </div>
              </MDBCol>
            </row>

            <MDBCol>
              <div>Add work experience:</div>
              <div className={'double-MDBInput-wrapper'}>
                <MDBInput
                  type="text"
                  ref={el => (this.inputWorkPlace = el)}
                  onChange={this.handleChangeWorkPlace}
                  hint="WorkPlace"
                />
                <MDBInput
                  type="text"
                  ref={el => (this.inputPosition = el)}
                  onChange={this.handleChangePosition}
                  hint="Position"
                />
                <MDBBtn onClick={this.addWorkExperience}>add</MDBBtn>
              </div>
              <MDBInput
                type="textarea"
                ref={el => (this.inputWorkDescription = el)}
                onChange={this.handleChangeDescription}
                hint="Description"
              />
              <div>Work experience:</div>
              <div className="MDBCol-12 offset-0 MDBCol-sm-8 offset-sm-0 MDBCol-md-8 offset-md-0 MDBCol-lg-9 offset-lg-0 MDBCol-xl-10 offset-xl-0">
                {this.state.workExperiences.map(element => (
                  <div className={'field_enum'}>
                    <div>
                      {' '}
                      {element.companyName} / {element.position}
                    </div>
                    <div className="deleteIcon">
                      {' '}
                      <i
                        id={element.id}
                        className="fa fa-times"
                        onClick={this.deleteWorkingPlace}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </MDBCol>

            <MDBCol
              xs={{ size: 12, offset: 0 }}
              sm={{ size: 4, offset: 8 }}
              md={{ size: 4, offset: 8 }}
              lg={{ size: 3, offset: 9 }}
              xl={{ size: 3, offset: 9 }}
            >
              <MDBBtn
                className="save-MDBBtn"
                style={{ fontSize: '17px' }}
                onClick={this.sendForm}
              >
                Save
              </MDBBtn>
            </MDBCol>
          </MDBCardBody>
        </MDBCol>
      </MDBCard>
    );
  }
}
