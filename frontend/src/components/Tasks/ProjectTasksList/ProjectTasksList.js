import React, { Component } from 'react';
import Task from '../Tasks/Task/Task';
import './ProjectTasksList.styles.css';
import { row, MDBCol } from 'mdbreact';

export default class ProjectTasksList extends Component {
    render() {
        return (
            <row>
                <MDBCol>
                    {this.props.tasksListData
                        .map((element) =>
                            <Task
                                key={element.name+'_'+element.id}
                                taskId={element.id}
                                taskName={element.name}
                                taskCategory={element.category}
                                taskDescription={element.description}
                                taskProgress={element.MDBProgress}
                                taskPercents={element.paymentPercent}
                                taskSkills={element.skills}
                                userAccepted={element.userAccepteed}
                                // taskReplyingTasks={element.replyingTasks}
                            />)
                    }
                </MDBCol>
            </row>
        );
    }
};