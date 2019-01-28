import React from "react"
import { connect } from 'react-redux'
import { pushData } from "../../redux/actions.js"
import { PUSH_SICK_LEAVE } from "../../redux/constants";
import { formatDateFromRawString } from "../../utils/dateFormatter.js"

function mapDispatchToProps(dispatch) {
    return {
        pushData: sickLeave => dispatch(pushData(PUSH_SICK_LEAVE, sickLeave))
    }
};

class SickLeavePresent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.sickLeaveJson.id,
            startTime: formatDateFromRawString(props.sickLeaveJson.startTime),
            endTime: formatDateFromRawString(props.sickLeaveJson.endTime)
        }

        this.pushDataForEdit = this.pushDataForEdit.bind(this);
    }

    pushDataForEdit(){
        const sickLeave = {
            id: this.state.id,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        }
        this.props.pushData(sickLeave);
    }

    render() {
        return(
            <div className="inlineListEntity" onClick={this.pushDataForEdit}>
                id: {this.state.id}
                <br />
                begin: {this.state.startTime}
                <br />
                end: {this.state.endTime}
                <br />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(SickLeavePresent);