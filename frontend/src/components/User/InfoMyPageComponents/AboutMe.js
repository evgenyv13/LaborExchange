import React from 'react';
import PropTypes from 'prop-types';
import { MDBCard, MDBCardBody, MDBProgress } from 'mdbreact';

class AboutMe extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      aboutMe: PropTypes.string,
      workExperiences: PropTypes.arrayOf(PropTypes.shape),
      userSkills: PropTypes.arrayOf(PropTypes.shape),
      education: PropTypes.arrayOf(PropTypes.shape),
      languages: PropTypes.arrayOf(PropTypes.shape),
      conferences: PropTypes.arrayOf(PropTypes.shape)
    })
  };

  static defaultProps = {
    user: {}
  };

  renderExperience = experience =>
    experience.map(item => (
      <div className={'MDBCard-content-item'}>
        <div className={'experience-title-wrapper'}>
          <div className={'experience-position'}>{item.position}</div>
          <div className={'experience-company'}>{item.companyName}</div>
        </div>
        <div>{item.description}</div>
      </div>
    ));

  renderSkills = skills =>
    skills.map(userSkill => (
      <div>
        <div className={'skill'}>{userSkill.skill}</div>
        <MDBProgress
          color="success"
          value={(userSkill.skill.length * 25) % 100}
          style={{ height: '10px' }}
        />
      </div>
    ));

  renderEducations = educations =>
    educations.map(item => (
      <div className={'education-item'}>
        <div className={'education-name'}>
          {' '}
          <i class="fa fa-graduation-cap" /> {item.university}
        </div>
      </div>
    ));

  renderLanguages = languages =>
    languages.map(language => (
      <div className={'language-item'}>
        <div className={'language-name'}>{language.language}</div>
        <div className={'language-level'}>{language.language_level}</div>
      </div>
    ));

  renderConferences = conferences =>
    conferences.map(conference => (
      <div className={'conference-item'}>
        <i class="fa fa-calendar" />{' '}
        {`${conference.name} (${conference.city}) `}
      </div>
    ));

  render() {
    const {
      user: {
        aboutMe,
        workExperiences,
        userSkills,
        educations,
        languageLevels,
        conferences
      }
    } = this.props;

    return (
      <MDBCard style={{ marginBottom: '30px' }}>
        <MDBCardBody>
          {aboutMe && (
            <>
              <div className={'MDBCard-title'}>About Me</div>
              <div className={'MDBCard-content-item'}>{aboutMe || ''}</div>
            </>
          )}
          {Array.isArray(workExperiences) && (
            <>
              <div className={'MDBCard-title'}>Work Experience</div>
              {this.renderExperience(workExperiences)}
            </>
          )}
          {Array.isArray(userSkills) && (
            <>
              <div className={'MDBCard-title'}>Skills</div>
              <div className={'MDBCard-content-item'}>
                <div className={'MDBCard-text'}>
                  Intro about your skills goes here. Keep the list lean and only
                  show your primary skillset. You can always provide a link to
                  your Linkedin or Coderwall profile so people can get more info
                  there.
                </div>
                {this.renderSkills(userSkills)}
              </div>
            </>
          )}
          {Array.isArray(educations) && (
            <>
              <div className={'MDBCard-title'}>Education</div>
              <div className={'MDBCard-content-item'}>
                {this.renderEducations(educations)}
              </div>
            </>
          )}
          {Array.isArray(languageLevels) && (
            <>
              <div className={'MDBCard-title'}>Languages</div>
              <div className={'MDBCard-content-item'}>
                {this.renderLanguages(languageLevels)}
              </div>
            </>
          )}
          {Array.isArray(conferences) && (
            <>
              <div className={'MDBCard-title'}>Conferences</div>
              <div className={'MDBCard-content-item'}>
                {this.renderConferences(conferences)}
              </div>
            </>
          )}
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default AboutMe;
