import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBProgress, row} from 'mdbreact';
import './Task.styles.css';
import Default from '../../../common/images/Startups.png';

class Task extends PureComponent {

    taskClickHandler = () =>  {
        const { history } = this.props;
        history.push({
            pathname: `/account/task/${this.props.taskId}`,
        });
    };

    render() {
        return (
            <MDBCard style={{marginBottom: "20px"}} onClick={this.taskClickHandler}>
                <MDBCardBody >
                    <MDBCardImage width="100%" src={Default} alt="Project image" />
                    <MDBCardTitle>{this.props.taskName}</MDBCardTitle>
                    <h6>{`Project part: ${this.props.taskPercents}%`}</h6>
                    <h6>{`Task MDBProgress: ${this.props.taskProgress}%`}</h6>
                    <MDBProgress color="success" value={this.props.taskProgress} style={{height: "10px"}} />
                </MDBCardBody>
            </MDBCard>
        );
    }
}

export default withRouter(Task);
