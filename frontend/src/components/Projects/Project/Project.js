import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Project.styles.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBRow,
  row
} from 'mdbreact';
import Default from '../../../common/images/Startups.png';

class Project extends Component {
  projectClickHandler = () => {
    const { history } = this.props;
    history.push({
      pathname: `/account/project/${this.props.projectId}`
    });
  };

  formatString = (data, length) => {
    const slicedData = data.slice(0, length);
    if (length > data.length) {
      return slicedData + ' '.repeat(length - data.length);
    }
    return slicedData;
  };

  render() {
    const { projectName, projectDescription } = this.props;
    const descriptionLength = 80;
    const nameLength = 12;
    const description = this.formatString(
      projectDescription,
      descriptionLength
    );
    const name = this.formatString(projectName, nameLength);
    return (
      <MDBCard
        style={{ marginBottom: '20px' }}
        onClick={this.projectClickHandler}
      >
        <MDBCardBody>
          <MDBCardImage top width="100%" src={Default} alt="Project image" />
          <MDBRow>
            <MDBCol>
              <div className={'project-item-title'}>{name}</div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <div
                className={'project-item-description'}
              >{`${description}...`}</div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="justify-content-center">
            <MDBCol xs="4">
              <div className="icons-style">
                <MDBIcon fas icon="thumbs-up">
                  &nbsp;{projectName.length}
                </MDBIcon>
              </div>
            </MDBCol>
            <MDBCol xs="4">
              <div className="icons-style">
                <MDBIcon fas icon="eye">
                  &nbsp;{projectName.length}
                </MDBIcon>
              </div>
            </MDBCol>
            <MDBCol xs="4">
              <div className="icons-style">
                <MDBIcon fas icon="comments">
                  &nbsp;{projectName.length}
                </MDBIcon>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default withRouter(Project);
