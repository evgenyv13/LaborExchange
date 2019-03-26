import React, {Component} from 'react';
import {MDBCard, MDBCardBody, MDBCol, MDBInput, row, MDBBtn, MDBRow, MDBCardTitle} from 'mdbreact';
import './CreateTask.styles.css';
import UserService from "../../UserService";


// name, category, payment percent, description, MDBProgress
export default class CreateTask extends Component {

    constructor() {
        super();
        this.UserService = new UserService();
        this.state = {
            name: '',
            description: '',
            MDBProgress: '',
            paymentPercent: '',
            category: '',
            skills: '',
            project_id: '',
            //creating_date: '',
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeProgress = this.handleChangeProgress.bind(this);
        this.handleChangePaymentPercent = this.handleChangePaymentPercent.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeSkills = this.handleChangeSkills.bind(this);
        //this.handleChangeCreatingDate = this.handleChangeCreatingDate.bind(this);
    }

    componentDidMount() {
        const { match } = this.props;
        this.setState({
            project_id: match.params.id,
        });
    }

    sendForm = async () => {
        const response = await this.UserService.createTask(this.state);
        console.log(response);
        this.props.history.push(`/account/project/${this.state.project_id}`);
    };

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }
    handleChangeDescription(event) {
        this.setState({description: event.target.value});
    }
    handleChangeProgress(event) {
        this.setState({MDBProgress: event.target.value});
    }
    handleChangePaymentPercent(event) {
        this.setState({paymentPercent: event.target.value});
    }
    handleChangeCategory(event) {
        this.setState({category: event.target.value});
    }
    handleChangeSkills(event) {
        this.setState({skills: event.target.value});
    }
    // handleChangeCreatingDate(event) {
    //     this.setState({creating_date: event.target.value});
    // }

    render() {
        return (
            <MDBCol xl="8"
                className="offset-xl-2"
                style={{marginTop: "20px"}}
            >
                <MDBCard
                    style={{marginBottom: "30px"}}
                >
                    <MDBCardBody>
                        <MDBCardTitle>Creating task</MDBCardTitle>
                        <MDBInput
                            type="text"
                            label="Task name"
                            value={this.state.name}
                            onChange={this.handleChangeName}
                            className={"create-project-MDBInput"}
                            outline fas icon="tag"
                        />

                        <MDBInput
                            type="text"
                            label="Category"
                            outline fas icon="bars"
                            value={this.state.category}
                            onChange={this.handleChangeCategory}
                            className={"create-project-MDBInput"}
                        />
                        <MDBInput
                            type="text"
                            label="Payment percent"
                            outline fas icon="percent"
                            value={this.state.paymentPercent}
                            onChange={this.handleChangePaymentPercent}
                            className={"create-project-MDBInput"}
                        />

                        <MDBInput
                            type="text"
                            label="Progress"
                            outline fas icon="flag-checkered"
                            value={this.state.MDBProgress}
                            onChange={this.handleChangeProgress}
                            className={"create-project-MDBInput"}
                        />

                        <MDBInput
                            label="Task description"
                            type="textarea"
                            name="text"
                            value={this.state.description}
                            onChange={this.handleChangeDescription}
                        />

                        <MDBInput
                            label="Skill and technologies"
                            type="textarea"
                            name="text"
                            value={this.state.skills}
                            onChange={this.handleChangeSkills}
                        />
                        <MDBCol xl="3"
                            className="offset-xl-9"
                        >
                            <MDBBtn className="save-MDBBtn" onClick={this.sendForm}>Create task</MDBBtn>
                        </MDBCol>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
};
