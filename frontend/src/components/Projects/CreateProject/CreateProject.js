import React, {Component} from 'react';
import {MDBCard, MDBCardBody, MDBCol, MDBInput, row , MDBBtn} from 'mdbreact';
import './CreateProject.styles.css';
import UserService from "../../UserService";

export default class CreateProject extends Component {

    constructor() {
        super();
        this.UserService = new UserService();
        this.state = {
            name: '',
            contacts: '',
            description: '',
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeContacts = this.handleChangeContacts.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeSubCategory = this.handleChangeSubCategory.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories = async () => {
        // const gotProject = await this.UserService.getProject();
        // if (gotProject) {
        //     this.setState({
        //             projectId: projectId,
        //             name: gotProject.name,
        //             contacts: gotProject.contacts,
        //             description: gotProject.description,
        //
        //             linkedin: gotProject.linkedin,
        //             github: gotProject.github,
        //             gmail: gotProject.gmail,
        //             twitter: gotProject.twitter,
        //             youtube: gotProject.youtube,
        //
        //         }
        //     );
        // }
    };

    sendForm = async () => {
        const response = await this.UserService.createProject(this.state);
        console.log(response);
        this.props.history.push(`/account/my-projects`);
    };

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeContacts(event) {
        this.setState({contacts: event.target.value});
    }

    handleChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    handleChangeCategory(event) {
        const gotName = event.target.value;
        const arr = this.state.category;
        for (let i=0; i<arr.length;i++) {
            if (arr[i].name === gotName) {
                this.setState({
                    selectedCategory: gotName,
                    subCategories: arr[i].subCategory,
                });
                break;
            }
        }
    }

    handleChangeSubCategory(event) {
        this.setState({ subCategory: event.target.value });
    }

    render() {
        return (
            <div className="create-project-wrapper">
                <div className="create-project-content">
                    <row>
                        <MDBCol
                            xs={{ size: 12, offset: 0 }}
                            sm={{ size: 12, offset: 0 }}
                            md={{ size: 12, offset: 0 }}
                            lg={{ size: 10, offset: 1 }}
                            xl={{ size: 8, offset: 2 }}
                        >
                            <MDBCard>
                                <MDBCardBody>
                                    <div className="MDBInput-wrapper">
                                        {/*<row style={{paddingBottom: '15px'}}>*/}
                                            {/*<MDBCol*/}
                                                {/*xs={{ size: 12, offset: 0 }}*/}
                                                {/*sm={{ size: 4, offset: 0 }}*/}
                                                {/*md={{ size: 4, offset: 0 }}*/}
                                                {/*lg={{ size: 3, offset: 0 }}*/}
                                                {/*xl={{ size: 3, offset: 0 }}*/}
                                            {/*>*/}
                                                {/*<MDBCardImage*/}
                                                    {/*className="imgProject"*/}
                                                    {/*top*/}
                                                    {/*width="100%"*/}
                                                    {/*src={UserIcon}*/}
                                                    {/*alt="Profile image"*/}
                                                    {/*style={{borderRadius: '50%'}}*/}
                                                {/*/>*/}
                                            {/*</MDBCol>*/}
                                        {/*</row>*/}
                                        <row>
                                            <MDBCol
                                                xs={{ size: 12, offset: 0 }}
                                                sm={{ size: 4, offset: 0 }}
                                                md={{ size: 4, offset: 0 }}
                                                lg={{ size: 3, offset: 0 }}
                                                xl={{ size: 2, offset: 0 }}
                                            >
                                                <div>Name:</div>
                                            </MDBCol>
                                            <MDBCol
                                                xs={{ size: 12, offset: 0 }}
                                                sm={{ size: 8, offset: 0 }}
                                                md={{ size: 8, offset: 0 }}
                                                lg={{ size: 9, offset: 0 }}
                                                xl={{ size: 10, offset: 0 }}
                                            >
                                              <div className={"create-project-MDBInput-wrapper"}>
                                                <div className={'create-project-MDBInput-icon'}>
                                                  <i class="fa fa-globe"/>
                                                </div>
                                                <MDBInput
                                                  type="text"
                                                  value={this.state.name}
                                                  onChange={this.handleChangeName}
                                                  placeholder="Type project name"
                                                  className={"create-project-MDBInput"}
                                                />
                                              </div>
                                            </MDBCol>
                                        </row>
                                    </div>

                                    <div className="MDBInput-wrapper">
                                        <row>
                                            <MDBCol
                                                xs={{ size: 12, offset: 0 }}
                                                sm={{ size: 4, offset: 0 }}
                                                md={{ size: 4, offset: 0 }}
                                                lg={{ size: 3, offset: 0 }}
                                                xl={{ size: 2, offset: 0 }}
                                            >
                                                <div>Contacts:</div>
                                            </MDBCol>
                                            <MDBCol
                                                xs={{ size: 12, offset: 0 }}
                                                sm={{ size: 8, offset: 0 }}
                                                md={{ size: 8, offset: 0 }}
                                                lg={{ size: 9, offset: 0 }}
                                                xl={{ size: 10, offset: 0 }}
                                            >
                                                <div className={"create-project-MDBInput-wrapper"}>
                                                    <div className={'create-project-MDBInput-icon'}>
                                                        <i className="fa fa-envelope"/>
                                                    </div>
                                                    <MDBInput
                                                        type="text"
                                                        value={this.state.contacts}
                                                        onChange={this.handleChangeContacts}
                                                        placeholder="Type your contact"
                                                        className={"create-project-MDBInput"}
                                                    />
                                                </div>
                                            </MDBCol>
                                        </row>
                                    </div>

                                    <div className="MDBInput-wrapper">
                                        <row>
                                            <MDBCol
                                                xs={{ size: 12, offset: 0 }}
                                                sm={{ size: 4, offset: 0 }}
                                                md={{ size: 4, offset: 0 }}
                                                lg={{ size: 3, offset: 0 }}
                                                xl={{ size: 2, offset: 0 }}
                                            >
                                                <div>Description:</div>
                                            </MDBCol>
                                            <MDBCol
                                                xs={{ size: 12, offset: 0 }}
                                                sm={{ size: 8, offset: 0 }}
                                                md={{ size: 8, offset: 0 }}
                                                lg={{ size: 9, offset: 0 }}
                                                xl={{ size: 10, offset: 0 }}
                                            >
                                                <MDBInput
                                                    className="inputTextArea"
                                                    type="textarea" value={this.state.description}
                                                    onChange={this.handleChangeDescription}
                                                    placeholder="Type project description..."
                                                />
                                            </MDBCol>
                                        </row>
                                    </div>

                                    <div className="MDBInput-wrapper">
                                        <row>
                                            <MDBCol
                                                xs={{ size: 12, offset: 0 }}
                                                sm={{ size: 12, offset: 0 }}
                                                md={{ size: 12, offset: 0 }}
                                                lg={{ size: 12, offset: 0 }}
                                                xl={{ size: 12, offset: 0 }}
                                            >
                                                <div className={"create-project-MDBBtn"}>
                                                    <MDBBtn className="save-MDBBtn" onClick={this.sendForm}>Create project</MDBBtn>
                                                </div>
                                            </MDBCol>
                                        </row>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </row>
                </div>
            </div>
        );
    }
};
