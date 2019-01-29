import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../../secret.js";
import { formatDateWithoutTime, formatStringDateToFullDate } from "../../../utils/dateFormatter.js"
import moment from 'moment';

const mapStateToProps = (state) => {
    return ({
        user: state.user
    });
};

class AddVacationScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            startTime: formatDateWithoutTime(moment("2019-01-01T00:00:00")),
            endTime: formatDateWithoutTime(moment("2019-01-13T00:00:00")),
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
        const requestUrl = serverUrl + `\\api\\vacations\\`;
    
        const newVacation = {
          endTime: formatStringDateToFullDate(this.state.endTime),
          startTime: formatStringDateToFullDate(this.state.startTime),
          userId: this.props.user.id 
        }
        
        const http = new XMLHttpRequest();
        http.open("POST", requestUrl);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(newVacation));
    
        http.onreadystatechange = (e) => {
            if (http.readyState === 4 && http.status === 200) {
                alert("Vacation added successfully");
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
                <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Add vacation</button>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddVacationScreen);