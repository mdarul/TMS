import React from "react"
import { connect } from 'react-redux'
import { pushData } from "../../redux/actions.js"
import { PUSH_VACATION } from "../../redux/constants.js"

function mapDispatchToProps(dispatch) {
    return {
        pushData: vacation => dispatch(pushData(PUSH_VACATION, vacation))
    }
};
class VacationPresent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.vacationJson.id,
            startTime: props.vacationJson.startTime,
            endTime: props.vacationJson.endTime
        }

        this.pushDataForEdit = this.pushDataForEdit.bind(this);
    }

    pushDataForEdit(){
        const vacation = {
            id: this.state.id,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        }
        this.props.pushData(vacation);
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

export default connect(null, mapDispatchToProps)(VacationPresent);