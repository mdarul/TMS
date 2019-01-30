import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../../secret.js"
import { formatStringDateToFullDate, formatDateToStringDateWithoutTime } from "../../../utils/dateFormatter.js";

const mapStateToProps = state => {
    return {
         user: state.user,
         sickLeave: state.selectedSickLeave
        };
  };

class EditSickLeaveScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            sickLeaveId: props.sickLeave.id,
            startTime: props.sickLeave.startTime,
            endTime: props.sickLeave.endTime
        }

        this.getSickLeaveData = this.getSickLeaveData.bind(this);
        this.updateSickLeaveData = this.updateSickLeaveData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getSickLeaveData(event) {
        event.preventDefault();
        const requestUrl = serverUrl + `\\api\\sickLeaves\\${this.state.sickLeaveId}`;

        const Http = new XMLHttpRequest();
        Http.open("GET", requestUrl);
        Http.send();
        Http.onreadystatechange = (e) => {
            if(Http.readyState === 4 && Http.status === 200) {
                const responseData = JSON.parse(Http.responseText);
                this.setState({
                    startTime: formatDateToStringDateWithoutTime(responseData.startTime),
                    endTime: formatDateToStringDateWithoutTime(responseData.endTime)
                });
            }
        }
    }

    updateSickLeaveData(event) {
        event.preventDefault();
        const requestUrl = serverUrl + `\\api\\sickLeaves\\${this.state.sickLeaveId}`;

        const updatedSickLeave = {
            userId: this.props.user.id,
            startTime: formatStringDateToFullDate(this.state.startTime),
            endTime: formatStringDateToFullDate(this.state.endTime)
        };

        const http = new XMLHttpRequest();
        http.open("PUT", requestUrl);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(updatedSickLeave));
    
        http.onreadystatechange = (e) => {
            if (http.readyState === 4 && http.status === 200) {
                alert("Sick leave updated successfully");
            }
        };
    }

    render(){
        return(
            <div>
                <form className="form-group">
                    <label>Sick leave id</label>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input 
                                className="form-control" 
                                name="sickLeaveId"
                                type="text"
                                value={this.state.sickLeaveId}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-2">
                            <button type="button" className="btn btn-primary form-control" onClick={this.getSickLeaveData}>Get sick leaves values</button>
                        </div>
                    </div>

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

                    <div className="form-group">
                        <button type="button" className="btn btn-primary" onClick={this.updateSickLeaveData}>Update sick leave</button>       
                    </div>
                </form>
            </div>

        );
    }
}

export default connect(mapStateToProps)(EditSickLeaveScreen);
