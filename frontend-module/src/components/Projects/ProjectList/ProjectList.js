import React, { Component } from 'react';
import Project from '../Project/Project';
import './ProjectList.styles.css';
import { Row, Col } from 'reactstrap';

export default class ProjectList extends Component {
    render() {
        return (
            <Row>
                {this.props.projectsListData
                .map((element) => 
                    <Col
                        key={element.projectName + '_' +element.projectId}
                        xs={{ size: 12, offset: 0 }}
                        sm={{ size: 6, offset: 0 }}
                        md={{ size: 6, offset: 0 }}
                        lg={{ size: 4, offset: 0 }}
                        xl={{ size: 3, offset: 0 }}
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
                    </Col>
                )}
            </Row>
        );
    }
};
