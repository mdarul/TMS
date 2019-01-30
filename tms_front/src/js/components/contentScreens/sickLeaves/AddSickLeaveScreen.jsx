import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../../secret.js";
import { formatDateToStringDateWithoutTime, formatStringDateToFullDate } from "../../../utils/dateFormatter.js"
import moment from 'moment';

const mapStateToProps = (state) => {
    return ({
        user: state.user
    });
};

class AddSickLeaveScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            startTime: formatDateToStringDateWithoutTime(moment("2019-01-01T00:00:00")),
            endTime: formatDateToStringDateWithoutTime(moment("2019-01-13T00:00:00")),
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const requestUrl = serverUrl + `\\api\\sickLeaves\\`;
    
        const newVacation = {
          endTime: formatStringDateToFullDate(this.state.endTime),
          startTime: formatStringDateToFullDate(this.state.startTime),
          userId: this.props.user.id 
        }

        console.log(newVacation);
    
        const http = new XMLHttpRequest();
        http.open("POST", requestUrl);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(newVacation));
    
        http.onreadystatechange = (e) => {
            if (http.readyState === 4 && http.status === 200) {
                alert("Sick leaves added successfully");
            }
        };
    }

    render() {
        return(
            <div className="form-group">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Start</label>
                        <input
                            className="form-control"
                            name="startTime"
                            type="text"
                            value={this.state.startTime}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>End</label>
                        <input
                            className="form-control"
                            name="endTime"
                            type="text"
                            value={this.state.endTime}
                            onChange={this.handleChange} />
                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Add sick leave</button>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddSickLeaveScreen);