import React from "react"
// import "../../../styles/style.css"

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
    }

    render() {
        return(
            <div className="taskListEntity">
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

export default TaskPresent;