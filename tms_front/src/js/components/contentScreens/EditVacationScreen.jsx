import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../secret.js";

const mapStateToProps = (state) => {
    return ({
        user: state.user
    });
};

class EditVacationScreen extends React.Component {
    constructor() {
        super();
        console.log("edit");
        this.state = {
            startTime: "2019-01-01T00:00:00",
            endTime: "2019-01-01T00:00:00",
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return(
            <div>
                EditVacationScreen
            </div>
        );
    }
}

export default connect(mapStateToProps)(EditVacationScreen);