import React from 'react';
import PropTypes from 'prop-types';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle } from 'mdbreact';

class Comments extends React.PureComponent {
  static propTypes = {
    commentsListData: PropTypes.arrayOf(
      PropTypes.shape({
        commentFrom: PropTypes.string.isRequired,
        commentText: PropTypes.string.isRequired
      })
    )
  };

  render() {
    const { commentsListData } = this.props;
    return (
      <MDBCard style={{ marginBottom: '30px' }}>
        {(Array.isArray(commentsListData) && commentsListData && (
          <div className={'MDBCard-content'}>
            <div className={'MDBCard-title'}>Comments</div>
            {commentsListData.map(review => {
              return (
                <div className="my-page-project">
                  <MDBCard key={review.commentId}>
                    <MDBCardBody>
                      <MDBCardTitle>{review.commentFrom}</MDBCardTitle>
                      <MDBCardText>{review.commentText}</MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </div>
              );
            })}
          </div>
        )) ||
          null}
      </MDBCard>
    );
  }
}
export default Comments;
