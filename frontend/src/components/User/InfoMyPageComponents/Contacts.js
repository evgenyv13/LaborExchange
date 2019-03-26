import {MDBCard, MDBCardBody, MDBCardTitle} from "mdbreact";
import React from "react";

class Contacts extends React.PureComponent{
    render() {
        return (
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>Contacts</MDBCardTitle>
                    <div className={"contacts-item"}>{this.props.email}</div>
                    <div className={"contacts-item"}>{this.props.websiteLink}</div>
                </MDBCardBody>
            </MDBCard>
        )
    }
}
export default Contacts;
