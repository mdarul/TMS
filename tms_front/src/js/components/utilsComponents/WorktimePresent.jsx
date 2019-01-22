import React from "react"
import { connect } from 'react-redux'
import { pushWorktimeData } from "../../redux/actions.js"
import "../../../styles/style.css"

function mapDispatchToProps(dispatch) {
    return {
        pushWorktimeData: worktime => dispatch(pushWorktimeData(worktime))
    }
};

class WorktimePresent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            worktimeId: props.worktimeJson.id,
            workEndTime: props.worktimeJson.workEndTime,
            workStartTime: props.worktimeJson.workStartTime,
            taskId: props.worktimeJson.taskId,
        }

        this.pushDataForEditForm = this.pushDataForEditForm.bind(this);
    }

    pushDataForEditForm(){
        const worktime = {
            worktimeId: this.state.worktimeId,
            workEndTime: this.state.workEndTime,
            workStartTime: this.state.workStartTime,
            worktimeTaskId: this.state.taskId
        }
        this.props.pushWorktimeData(worktime);
    }

    render() {
        return(
            <div className="inlineListEntity" onClick={this.pushDataForEditForm}>
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

export default connect(null, mapDispatchToProps)(WorktimePresent);