import React from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardImage,
  MDBCol,
  MDBCollapse,
  MDBIcon,
  MDBProgress,
  MDBRow
} from 'mdbreact';
import UserIcon from '../../../common/images/UserIcon.jpg';
import { Link } from 'react-router-dom';

class UserPageHeader extends React.PureComponent {
  render() {
    return (
      <MDBCard style={{ marginBottom: '30px' }}>
        <MDBRow style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <MDBCol
            xl="2"
            lg="3"
            md="5"
            sm="5"
            xs="6"
            className="offset-xl-1 offset-lg-1 offset-md-1 offset-sm-0 offset-xs-0"
          >
            <MDBCardImage top width="100%" src={UserIcon} alt="Profile image" />
          </MDBCol>
          <MDBCol xl="5" lg="4" md="3" sm="3" xs="2">
            <div className={'personal-data'}>
              <div className={'personal-data-item'}>
                <div className={'user-name'}>{this.props.user.username}</div>
              </div>
              <div className={'personal-data-item'}>
                <div className={'user-profession'}>
                  {this.props.user.currentRole}
                </div>
              </div>
              <div className={'personal-data-item'}>
                <ul class="social list-inline">
                  {this.props.user.twitter && (
                    <li>
                      <a href={this.props.user.twitter}>
                        <MDBIcon fab icon="twitter" />
                      </a>
                    </li>
                  )}
                  {this.props.user.gmail && (
                    <li>
                      <a href={this.props.user.gmail}>
                        <MDBIcon fab icon="google-plus" />
                      </a>
                    </li>
                  )}
                  {this.props.user.linkedin && (
                    <li>
                      <a href={this.props.user.linkedin}>
                        <MDBIcon fab icon="linkedin" />
                      </a>
                    </li>
                  )}
                  {this.props.user.github && (
                    <li>
                      <a href={this.props.user.github}>
                        <MDBIcon fab icon="github-alt" />
                      </a>
                    </li>
                  )}
                  {this.props.user.youtube && (
                    <li>
                      <a href={this.props.user.youtube}>
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
              <MDBBtn className={'contact-MDBBtn'}>
                <MDBIcon fub icon="paper-plane" />
                &nbsp;CONTACT ME
              </MDBBtn>
              <Link to="/account/edit-user">
                <MDBBtn className={'edit-MDBBtn'} onClick={this.editProfile}>
                  <MDBIcon fub icon="edit" />
                  &nbsp;Edit profile
                </MDBBtn>
              </Link>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    );
  }
}

export default UserPageHeader;
