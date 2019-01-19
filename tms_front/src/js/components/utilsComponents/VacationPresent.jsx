import React from "react"

class VacationPresent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.vacationJson.id,
            startTime: props.vacationJson.startTime,
            endTime: props.vacationJson.endTime
        }
    }

    render() {
        return(
            <div className="inlineListEntity">
                {this.state.id}
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