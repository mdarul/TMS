import React from "react"
import { connect } from 'react-redux'
import { pushData } from "../../redux/actions.js"
import { PUSH_WORKTIME } from "../../redux/constants.js"

import "../../../styles/style.css"



function mapDispatchToProps(dispatch) {
    return {
        pushData: worktime => dispatch(pushData(PUSH_WORKTIME, worktime))
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

        this.pushDataForEdit = this.pushDataForEdit.bind(this);
    }

    pushDataForEdit(){
        const worktime = {
            worktimeId: this.state.worktimeId,
            workEndTime: this.state.workEndTime,
            workStartTime: this.state.workStartTime,
            worktimeTaskId: this.state.taskId
        }
        this.props.pushData(worktime);
    }

    render() {
        return(
            <div className="inlineListEntity" onClick={this.pushDataForEdit}>
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