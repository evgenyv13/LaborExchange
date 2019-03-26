import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBCollapse,
  MDBIcon,
  MDBRow
} from 'mdbreact';
import { connect } from 'react-redux';
import './MyPage.styles.css';
import 'font-awesome/css/font-awesome.min.css';
import Contacts from '../InfoMyPageComponents/Contacts';
import UserPageHeader from '../InfoMyPageComponents/UserPageHeader';
import Comments from '../InfoMyPageComponents/Comments';
import LastActiveProjects from '../InfoMyPageComponents/LastActiveProjects';
import AboutMe from '../InfoMyPageComponents/AboutMe';
import { getInfoAboutMe, getUserComments } from '../../../actions/user';
import { getUserProjects } from '../../../actions/project';

class MyPage extends Component {
  static defaultProps = {
    user: {},
    comments: {},
    projects: {}
  };

  static propTypes = {
    user: PropTypes.shape.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape).isRequired,
    projects: PropTypes.shape.isRequired
  };

  state = {
    collapsePersonalData: false,
    collapseProjects: false,
    collapseReviews: false,
    collapseAboutMe: true
  };

  componentDidMount() {
    this.props.onGetInfoAboutMe();
  }

  toggleProjects = () => {
    this.props.onGetUserProjects();
    this.setState({
      collapseProjects: !this.state.collapseProjects,
      collapseAboutMe: false,
      collapseReviews: false
    });
  };

  toggleReviews = () => {
    this.props.onGetMyComments();
    this.setState({
      collapseReviews: !this.state.collapseReviews,
      collapseProjects: false,
      collapseAboutMe: false
    });
  };

  toggleAboutMe = () => {
    this.setState({
      collapseAboutMe: !this.state.collapseAboutMe,
      collapseProjects: false,
      collapseReviews: false
    });
  };

  render() {
    const {
      user,
      user: { mail, website },
      comments,
      projects: { content }
    } = this.props;

    const { collapseAboutMe, collapseReviews, collapseProjects } = this.state;
    return (
      <MDBRow>
        <MDBCol lg="12">
          <UserPageHeader user={user} />
        </MDBCol>

        <MDBCol
          xs="10"
          sm="10"
          md="6"
          lg="6"
          xl="7"
          className="offset-xs-0 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1"
        >
          <MDBCollapse isOpen={collapseAboutMe}>
            <AboutMe user={user} />
          </MDBCollapse>

          <MDBCollapse isOpen={collapseReviews}>
            <Comments commentsListData={comments} />
          </MDBCollapse>

          <MDBCollapse isOpen={collapseProjects}>
            <LastActiveProjects projectsListData={content} />
          </MDBCollapse>
        </MDBCol>

        <MDBCol xs="10" sm="10" md="4" lg="4" xl="3">
          <MDBCol xs="12">
            <MDBCard style={{ marginBottom: '10px' }}>
              <MDBCardBody>
                <MDBCardTitle>Views</MDBCardTitle>
                <MDBCardText>
                  Panel to control view of your content goes here. Click buttons
                  to manipulate order of your content.
                </MDBCardText>

                <MDBBtn onClick={this.toggleAboutMe} className="col-7">
                  <MDBIcon fub icon="user" /> About Me
                </MDBBtn>
                <MDBBtn onClick={this.toggleReviews} className="col-7">
                  <MDBIcon fub icon="comments" /> Comments
                </MDBBtn>
                <MDBBtn onClick={this.toggleProjects} className="col-7">
                  <MDBIcon fub icon="briefcase" /> Projects
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol xs="12">
            <Contacts email={mail} websiteLink={website} />
          </MDBCol>
        </MDBCol>
      </MDBRow>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  comments: state.user.comments,
  projects: state.project.userProjects
});

const mapDispatchToProps = dispatch => ({
  onGetInfoAboutMe: () => dispatch(getInfoAboutMe()),
  onGetMyComments: () => dispatch(getUserComments()),
  onGetUserProjects: () => dispatch(getUserProjects())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage);
