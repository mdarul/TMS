import React from "react"

class SickLeavePresent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.sickLeaveJson.id,
            startTime: props.sickLeaveJson.startTime,
            endTime: props.sickLeaveJson.endTime
        }
    }

    render() {
        return(
            <div className="inlineListEntity">
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

export default SickLeavePresent;