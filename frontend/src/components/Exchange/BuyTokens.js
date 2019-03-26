import React, { PureComponent } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow
} from 'mdbreact';

export default class BuyTokens extends PureComponent {
  render() {
    return (
      <MDBRow center>
        <MDBCol xs="8" sm="8" md="4" lg="4" xl="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Buy Token</MDBCardTitle>
              <MDBCardText>Here you can buy token</MDBCardText>
              <MDBBtn href="#">Buy Token</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xs="8" sm="8" md="4" lg="4" xl="4">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Sell Token</MDBCardTitle>
              <MDBCardText>Here you can sell token</MDBCardText>
              <MDBBtn href="#">Sell Token</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}
