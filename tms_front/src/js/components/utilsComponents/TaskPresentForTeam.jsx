import React from 'react';
import { connect } from 'react-redux'
import { showTaskComments } from "../../redux/actions.js"

function mapDispatchToProps(dispatch) {
    return {
        showTaskComments: task => dispatch(showTaskComments(task))
    }
};

class TaskPresentForTeam extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.taskJson.id,
            title: props.taskJson.title,
            userId: props.taskJson.userId,
            stage: props.taskJson.stage,
            content: props.taskJson.content
        }

        this.getCommentsForTask = this.getCommentsForTask.bind(this);
    }

    getCommentsForTask(){
        const task = {
            id: this.state.id,
            title: this.state.title,
            userId: this.state.userId,
            stage: this.state.stage,
            content: this.state.content
        }
        this.props.showTaskComments(task);
    }

    render() {
        return(
            <div className="taskListEntity" onClick={this.getCommentsForTask}>
                {this.state.id}, {this.state.title}
                <br />
                user: {this.state.userId}
                <br />
                stage: {this.state.stage}
                <br />
                {this.state.content}
                <br />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(TaskPresentForTeam);