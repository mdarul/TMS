import React from "react"
import { connect } from 'react-redux'
import { pushData } from "../../redux/actions.js"
import { PUSH_TASK } from "../../redux/constants";

function mapDispatchToProps(dispatch) {
    return {
        pushData: task => dispatch(pushData(PUSH_TASK, task))
    }
};

class TaskPresent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.taskJson.id,
            title: props.taskJson.title,
            userId: props.taskJson.userId,
            stage: props.taskJson.stage,
            content: props.taskJson.content
        }
        this.pushDataForEdit = this.pushDataForEdit.bind(this);
    }

    pushDataForEdit(){
        const task = {
            id: this.state.id,
            title: this.state.title,
            userId: this.state.userId,
            stage: this.state.stage,
            content: this.state.content
        }
        this.props.pushData(task);
    }

    render() {
        return(
            <div className="taskListEntity" onClick={this.pushDataForEdit}>
                {this.state.id}, {this.state.title}
                <br />
                user: {this.state.userId}
                <br />
                stage: {this.state.stage}
                <br />
                {this.state.content}
                <br />
                <br />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(TaskPresent);