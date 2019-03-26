import React, { Component } from 'react';
import Project from '../Project/Project';
import './ProjectList.styles.css';
import {row, MDBCol, MDBRow} from 'mdbreact';

export default class ProjectList extends Component {
    render() {
        return (
            <MDBRow>
                {this.props.projectsListData
                .filter((element) => {
                    if (this.props.projectsDirection && this.props.projectsDirection.toLowerCase() === 'all') {
                        return element;
                    } else {
                        return element.projectDirection === this.props.projectsDirection;
                    }
                })
                .filter((element) => {
                    if (this.props.projectsSkill && this.props.projectsSkill.toLowerCase() === 'all') {
                        return element;
                    } else {
                        return element.projectSkills.includes(this.props.projectsSkill);
                    }
                })
                .filter((element) => element.projectName.toLowerCase().includes(this.props.searchProjectName.toLowerCase()))
                .map((element) => 
                    <MDBCol key={element.projectName + '_' +element.projectId}
                            xs="12" sm="6" md="6" lg="4" xl="4"
                    >
                        <Project
                            projectName={element.projectName}
                            projectDescription={element.projectDescription}
                            projectDirection={element.projectDirection}
                            projectSkills={element.projectSkills}
                            projectProgress={element.projectProgress}
                            projectId={element.projectId}
                            projectTasks={element.projectTasks}
                        />
                    </MDBCol>
                )}
            </MDBRow>
        );
    }
};
