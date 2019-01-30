import React from "react";
import { formatDateToStringDateWithoutTime } from "../../utils/dateFormatter.js";


class SickLeavePresentImmutable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.sickLeaveJson.id,
            startTime: formatDateToStringDateWithoutTime(props.sickLeaveJson.startTime),
            endTime: formatDateToStringDateWithoutTime(props.sickLeaveJson.endTime),
            userId: props.sickLeaveJson.userId
        }
    }

    render() {
        return(
            <div className="inlineListEntity">
                id: {this.state.id}
                <br />
                User ID: {this.state.userId}
                <br />
                begin: {this.state.startTime}
                <br />
                end: {this.state.endTime}
                <br />
            </div>
        );
    }
}

export default SickLeavePresentImmutable;