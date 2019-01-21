import React from "react"
import "../../../styles/style.css"

class WorktimePresent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            worktimeId: props.worktimeJson.id,
            workEndTime: props.worktimeJson.workEndTime,
            workStartTime: props.worktimeJson.workStartTime,
            taskId: props.worktimeJson.taskId,
        }
    }

    render() {
        return(
            <div className="worktimeListEntity">
                {this.state.workStartTime} - {this.state.workEndTime}
                <br />
                Task id: {this.state.taskId}
                <br />
                Worktime id: {this.state.worktimeId}
                <br />
                <br />
            </div>
        );
    }
}

export default WorktimePresent;