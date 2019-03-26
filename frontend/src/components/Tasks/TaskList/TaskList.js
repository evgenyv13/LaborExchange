import React, {Component} from 'react';
import Task from '../Task/Task';
import './TaskList.styles.css';
import {MDBCol, MDBRow} from "mdbreact";

export default class TaskList extends Component {
    render() {
        return (
            <MDBRow>
                {this.props.tasksListData
                .map((element) =>
                <MDBCol xl="4" lg="4" md="6" sm="6" xs="12">
                    <Task
                        key={element.taskName+'_'+element.taskId}
                        taskId={element.taskId}
                        taskName={element.taskName}
                        taskCategory={element.taskCategory}
                        taskDescription={element.taskDescription}
                        taskProgress={element.taskProgress}
                        taskPercents={element.taskPercents}
                        taskSkills={element.taskSkills}
                        // taskReplyingTasks={element.replyingTasks}
                    />
                </MDBCol>)
                }
            </MDBRow>
        );
    }
};
