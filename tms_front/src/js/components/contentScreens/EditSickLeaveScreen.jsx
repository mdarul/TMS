import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../secret.js"

const mapStateToProps = state => {
    return {
         user: state.user,
        };
  };

class EditSickLeaveScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            sickLeaveId: "",
            startTime: "",
            endTime: ""
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
                    startTime: responseData.startTime,
                    endTime: responseData.endTime
                });
            }
        }
    }

    updateSickLeaveData(event) {
        event.preventDefault();
        const requestUrl = serverUrl + `\\api\\sickLeaves\\${this.state.sickLeaveId}`;

        const updatedSickLeave = {
            userId: this.props.user.id,
            startTime: this.state.startTime,
            endTime: this.state.endTime
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
                <form>
                    Sick leave id:
                    <br />
                    <input
                        name="sickLeaveId"
                        type="text"
                        value={this.state.sickLeaveId}
                        onChange={this.handleChange} />

                    <br />
                    <button type="button" onClick={this.getSickLeaveData}>Get sick leave values</button>
                    <br />
                    <br />
                    Sick leave start:
                    <br />
                    <input
                        name="startTime"
                        type="text"
                        value={this.state.startTime}
                        onChange={this.handleChange} />
                    <br />
                    Sick leave end:
                    <br />
                    <input
                        name="endTime"
                        type="text"
                        value={this.state.endTime}
                        onChange={this.handleChange} />
                    <br />

                    <button type="button" onClick={this.updateSickLeaveData}>Update sick leave</button>       
                </form>
            </div>

        );
    }
}

export default connect(mapStateToProps)(EditSickLeaveScreen);
