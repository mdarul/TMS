import React from "react";
import { formatDateToStringDateWithoutTime } from "../../utils/dateFormatter.js";


class VacationPresent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.vacationJson.id,
            startTime: formatDateToStringDateWithoutTime(props.vacationJson.startTime),
            endTime: formatDateToStringDateWithoutTime(props.vacationJson.endTime),
            userId: props.vacationJson.userId
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

export default VacationPresent;