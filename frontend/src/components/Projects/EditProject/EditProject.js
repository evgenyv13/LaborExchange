import React, {Component} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBInput,
    MDBBtnGroup,
    row,
    MDBBtn,
    MDBRow,
    MDBIcon,
    MDBCardTitle
} from 'mdbreact';
import './EditProject.styles.css';
import UserService from "../../UserService";

export default class editProject extends Component {

    constructor(props) {
        super(props);
        this.UserService = new UserService();
        this.state = {
            name: '',
            contacts: '',
            description: '',
            linkedin: '',
            github: '',
            gmail: '',
            twitter: '',
            youtube: '',
            projectSubCategorys: [],
            subCategoryId: 1,

            selectedSubCategory: '',
            subCategories: [
                {
                    id: 1,
                    name: 'Web',
                },
                {
                    id: 2,
                    name: 'Mobile',
                },
                {
                    id: 3,
                    name: 'Soft',
                },
            ],

            category: [
                {
                    id: 1,
                    name: 'IT',
                    subCategory: [
                        {
                            id: 1,
                            name: 'Web',
                        },
                        {
                            id: 2,
                            name: 'Mobile',
                        },
                        {
                            id: 3,
                            name: 'Soft',
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Service',
                    subCategory: [
                        {
                            id: 4,
                            name: 'Building',
                        },
                        {
                            id: 5,
                            name: 'Cleaning',
                        },
                        {
                            id: 6,
                            name: 'Banking',
                        },
                    ],
                },
                {
                    id: 3,
                    name: 'Education',
                    subCategory: [
                        {
                            id: 7,
                            name: 'For students',
                        },
                        {
                            id: 8,
                            name: 'For teachers',
                        },
                    ],
                },
            ],
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeContacts = this.handleChangeContacts.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);

        this.handleChangeLinkedin = this.handleChangeLinkedin.bind(this);
        this.handleChangeGithub = this.handleChangeGithub.bind(this);
        this.handleChangeTwitter = this.handleChangeTwitter.bind(this);
        this.handleChangeGmail = this.handleChangeGmail.bind(this);
        this.handleChangeYoutube = this.handleChangeYoutube.bind(this);

        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeSubCategory = this.handleChangeSubCategory.bind(this);
    }

    componentDidMount() {
        const { match } = this.props;
        const projectId = match.params.id;
        this.setProjInfo(projectId);
    }

    setProjInfo = async (projectId) => {
        const gotProject = await this.UserService.getProject(projectId);
        console.log(gotProject);
        if (gotProject) {
            this.setState({
                    projectId: projectId,
                    name: gotProject.name,
                    contacts: gotProject.contacts,
                    description: gotProject.description,

                    linkedin: gotProject.linkedin,
                    github: gotProject.github,
                    gmail: gotProject.gmail,
                    twitter: gotProject.twitter,
                    youtube: gotProject.youtube,
                    projectSubCategorys: gotProject.projectSubCategorys,
                }
            );
        }
    };

    sendForm = async () => {
        console.log(this.state);
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('contacts', this.state.contacts);
        formData.append('description', this.state.description);

        formData.append('linkedin', this.state.linkedin);
        formData.append('github', this.state.github);
        formData.append('gmail', this.state.gmail);
        formData.append('twitter', this.state.twitter);
        formData.append('youtube', this.state.youtube);

        const response = await this.UserService.updateProject(this.state.projectId, formData);
        console.log(response);
        const { history } = this.props;
        history.push({
            pathname: `/account/project/${this.state.projectId}`,
        });
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

    handleChangeLinkedin(event) {
        this.setState({linkedin: event.target.value});
    }

    handleChangeGithub(event) {
        this.setState({github: event.target.value});
    }

    handleChangeYoutube(event) {
        this.setState({youtube: event.target.value});
    }

    handleChangeGmail(event) {
        this.setState({gmail: event.target.value});
    }

    handleChangeTwitter(event) {
        this.setState({twitter: event.target.value});
    }

    handleChangeCategory(event) {
        const gotName = event.target.value;
        const arr = this.state.category;
        for (let MDBIcon=0; MDBIcon<arr.length;MDBIcon++) {
            if (arr[MDBIcon].name === gotName) {
                this.setState({
                    selectedCategory: gotName,
                    subCategories: arr[MDBIcon].subCategory,
                });
                break;
            }
        }
    }

    handleChangeSubCategory(event) {
        const gotName = event.target.value;
        const arr = this.state.subCategories;
        for (let MDBIcon=0; MDBIcon<arr.length;MDBIcon++) {
            if (arr[MDBIcon].name === gotName) {
                this.setState({
                    subCategoryId: arr[MDBIcon].id,
                });
                break;
            }
        }
        //this.setState({ subCategory: event.target.value });
    }

    addCategory = async () => {
        const formData = new FormData();
        console.log(this.state.subCategoryId);
        formData.append('idOfProjectSubCategory', this.state.subCategoryId);
        const response = await this.UserService.addCategory(this.state.projectId, formData);
        if (response) {
            this.setState(
                {
                    projectSubCategorys: [...this.state.projectSubCategorys, response],
                });
        }
    };

    deleteCategory = async (event) => {
        const id = event.target.id;
        const formData = new FormData();
        formData.append('subCategoryId', id);
        console.log(this.state.projectId);
        console.log(id);
        const response = await this.UserService.deleteCategory(this.state.projectId, formData);
        let array;
        if (response) {
            array = [...this.state.projectSubCategorys];
            for (let MDBIcon = 0; MDBIcon < array.length; MDBIcon++) {
                {
                    if (array[MDBIcon].id === id) {
                        array.splice(MDBIcon, 1);
                        break;
                    }
                }
            }
            this.setState({projectSubCategorys: array});
        }
    };

    render() {
        return (
            <MDBCol xs="12" sm="12" md="10" lg="8" xl="8"
                    className="offset-xs-0 offset-sm-0 offset-md-1 offset-lg-2 offset-xl-2"
                    style={{marginTop: "30px", marginBottom: "30px"}}
            >
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>Edit project</MDBCardTitle>
                    <MDBInput
                        type="text"
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleChangeName}
                        icon="globe"
                    />

                    <MDBInput
                        type="text"
                        label="Contacts"
                        value={this.state.contacts}
                        onChange={this.handleChangeContacts}
                        icon="envelope"
                    />

                    <MDBInput
                        type="text"
                        label="Linkedin"
                        value={this.state.linkedin}
                        onChange={this.handleChangeLinkedin}
                    />

                    <MDBInput
                        type="text"
                        label="Github"
                        value={this.state.github}
                        onChange={this.handleChangeGithub}
                        className={"create-project-MDBInput"}
                    />

                    <MDBInput
                        type="text"
                        label="Gmail"
                        value={this.state.gmail}
                        onChange={this.handleChangeGmail}
                        className={"create-project-MDBInput"}
                    />

                    <MDBInput
                        type="text"
                        label="Twitter"
                        value={this.state.twitter}
                        onChange={this.handleChangeTwitter}
                        className={"create-project-MDBInput"}
                    />

                    <MDBInput
                        type="text"
                        label="Youtube"
                        value={this.state.youtube}
                        onChange={this.handleChangeYoutube}
                        className={"create-project-MDBInput"}
                    />

                    <MDBInput
                        type="textarea"
                        label="Description"
                        value={this.state.description}
                        onChange={this.handleChangeDescription}
                    />
                    <MDBCol xs="12" sm="8" md="6" lg="3" xl="3"
                        className="offset-xs-0 offset-sm-2 offset-md-3 offset-lg-9 offset-xl-9"
                    >
                        <MDBBtn className="save-MDBBtn" onClick={this.sendForm}>Edit project</MDBBtn>
                    </MDBCol>
                </MDBCardBody>

                {/*<row>*/}
                    {/*<MDBCol*/}
                        {/*xs={{ size: 12, offset: 0 }}*/}
                        {/*sm={{ size: 4, offset: 0 }}*/}
                        {/*md={{ size: 4, offset: 0 }}*/}
                        {/*lg={{ size: 3, offset: 0 }}*/}
                        {/*xl={{ size: 2, offset: 0 }}*/}
                    {/*>*/}
                        {/*<div>Add category:</div>*/}
                    {/*</MDBCol>*/}
                    {/*<MDBCol*/}
                        {/*xs={{ size: 12, offset: 0 }}*/}
                        {/*sm={{ size: 6, offset: 0 }}*/}
                        {/*md={{ size: 6, offset: 0 }}*/}
                        {/*lg={{ size: 6, offset: 0 }}*/}
                        {/*xl={{ size: 5, offset: 0 }}*/}
                    {/*>*/}
                    {/*<div className={"field_input"}>*/}
                        {/*<div className={"double-MDBInput-wrapper"}>*/}
                            {/*<MDBInput type="select" value={this.state.selectedCategory} onChange={this.handleChangeCategory}>*/}
                                {/*{this.state.category*/}
                                    {/*.map((category) =>*/}
                                        {/*<option key={category.id} value={`${category.name}`}>{category.name}</option>*/}
                                    {/*)*/}
                                {/*}*/}
                            {/*</MDBInput>*/}
                            {/*<MDBInput type="select" onChange={this.handleChangeSubCategory}>*/}
                                {/*{this.state.subCategories*/}
                                    {/*.map((category) =>*/}
                                        {/*<option key={category.id} value={`${category.name}`}>{category.name}</option>*/}
                                    {/*)*/}
                                {/*}*/}
                            {/*</MDBInput>*/}
                        {/*</div>*/}
                        {/*<MDBBtnGroup className="plus" style={{*/}
                            {/*color: "#42444587",*/}
                            {/*backgroundColor: "rgba(84, 86, 87, 0)",*/}
                            {/*borderColor: "#cccccc",*/}
                        {/*}}  onClick={this.addCategory}> </MDBBtnGroup>*/}
                    {/*</div>*/}
                    {/*</MDBCol>*/}
                {/*</row>*/}
            </MDBCard>

            </MDBCol>

        );
    }
};
