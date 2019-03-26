import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCol
} from 'mdbreact';

class LastActiveProjects extends React.PureComponent {
  render() {
    return (
      <MDBCol xs="12">
        <MDBCard style={{ marginBottom: '30px' }}>
          {this.props.projectsListData && this.props.projectsListData.length && (
            <div className={'MDBCard-content'}>
              <div className={'MDBCard-title'}>Latest projects</div>
              {this.props.projectsListData.map(project => {
                return (
                  <div className="my-page-project">
                    <MDBCard key={project.id}>
                      <MDBCardBody>
                        <MDBCardTitle>{project.name}</MDBCardTitle>
                        <MDBCardText>{project.description}</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                );
              })}
            </div>
          )}
        </MDBCard>
      </MDBCol>
    );
  }
}

export default LastActiveProjects;
