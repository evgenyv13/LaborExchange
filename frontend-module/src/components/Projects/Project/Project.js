import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './Project.styles.css';
import {Card, CardBody, CardImg, Col, Row} from 'reactstrap';
import Default from '../../../common/images/Startups.png';

class Project extends Component {
    projectClickHandler = () =>  {
        const { history } = this.props;
        history.push({
            pathname: `/account/project/${this.props.projectId}`,
        });
    };

    formatString = (data, length) => {
        const slicedData = data.slice(0, length);
        if (length > data.length) {
            return slicedData + ' '.repeat(length - data.length);
        }
        return slicedData;
    };

    render() {
        const { projectName, projectDescription } = this.props;
        const descriptionLength = 80;
        const nameLength = 12;
        const description = this.formatString(projectDescription, descriptionLength);
        const name = this.formatString(projectName, nameLength);
        return (
            <div className="card-wrapper" onClick={this.projectClickHandler}>
                <Card>
                    <CardImg top width="100%" src={Default} alt="Project image" />
                    <CardBody>
                        <div className={"project-item-title"}>{name}</div>
                        <div className={"project-item-description"}>{`${description}...`}</div>
                        <Row>
                            <Col
                                xs={{ size: 4, offset: 0 }}
                                sm={{ size: 4, offset: 0 }}
                                md={{ size: 4, offset: 0 }}
                                lg={{ size: 4, offset: 0 }}
                                xl={{ size: 4, offset: 0 }}
                            >
                              <div className="icons-style">
                                <i class="fa fa-thumbs-up">&nbsp;{projectName.length}</i>
                              </div>
                            </Col>
                            <Col
                                xs={{ size: 4, offset: 0 }}
                                sm={{ size: 4, offset: 0 }}
                                md={{ size: 4, offset: 0 }}
                                lg={{ size: 4, offset: 0 }}
                                xl={{ size: 4, offset: 0 }}
                            >
                                <div className="icons-style">
                                    <i class="fa fa-eye">&nbsp;{projectName.length}</i>
                                </div>
                            </Col>
                            <Col
                                xs={{ size: 4, offset: 0 }}
                                sm={{ size: 4, offset: 0 }}
                                md={{ size: 4, offset: 0 }}
                                lg={{ size: 4, offset: 0 }}
                                xl={{ size: 4, offset: 0 }}
                            >
                                <div className="icons-style">
                                    <i className="fa fa-comments">&nbsp;{projectName.length}</i>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withRouter(Project);
