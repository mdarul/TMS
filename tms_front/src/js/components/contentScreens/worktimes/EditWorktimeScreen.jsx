import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../../secret.js"

const mapStateToProps = state => {
    return {
         worktime: state.selectedWorktime,
        };
  };

class EditWorktimeScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            worktimeId: this.props.worktime.worktimeId,
            workEndTime: this.props.worktime.workEndTime,
            workStartTime: this.props.worktime.workStartTime,
            worktimeTaskId: this.props.worktime.worktimeTaskId
        }

        this.getWorktimeData = this.getWorktimeData.bind(this);
        this.updateWorktimeData = this.updateWorktimeData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state);
    }

    getWorktimeData(event) {
        event.preventDefault();
        const requestUrl = serverUrl + `\\api\\users\\${this.props.user.id}\\worktimes\\${this.state.worktimeId}`;

        const Http = new XMLHttpRequest();
        Http.open("GET", requestUrl);
        Http.send();
        Http.onreadystatechange = (e) => {
            if(Http.readyState === 4 && Http.status === 200) {
                const responseData = JSON.parse(Http.responseText);
                console.log(responseData);
                this.setState({
                    workEndTime: responseData.workEndTime,
                    workStartTime: responseData.workStartTime,
                    worktimeTaskId: responseData.taskId
                });
            }
        }
    }

    updateWorktimeData(event) {
        event.preventDefault();
        const requestUrl = serverUrl + `\\api\\users\\${this.props.user.id}\\worktimes\\${this.state.worktimeId}`;

        const updatedWorktime = {
            workStartTime: this.state.workStartTime,
            workEndTime: this.state.workEndTime,
            taskId: this.state.worktimeTaskId,
            userId: this.props.user.id
        };

        console.log(updatedWorktime);

        const http = new XMLHttpRequest();
        http.open("PUT", requestUrl);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(updatedWorktime));
    
        http.onreadystatechange = (e) => {
            if (http.readyState === 4 && http.status === 200) {
                alert("Worktime updated successfully");
            }
        };
    }

    render(){
        return(
            <div>
                <form>
                    Worktime id:
                    <br />
                    <input
                        name="worktimeId"
                        type="text"
                        value={this.state.worktimeId}
                        onChange={this.handleChange} />

                    <br />
                    <button type="button" onClick={this.getWorktimeData}>Get worktimes values</button>
                    <br />
                    <br />
                    workStartTime:
                    <br />
                    <input
                        name="workStartTime"
                        type="text"
                        value={this.state.workStartTime}
                        onChange={this.handleChange} />
                    <br />
                    workEndTime:
                    <br />
                    <input
                        name="workEndTime"
                        type="text"
                        value={this.state.workEndTime}
                        onChange={this.handleChange} />
                    <br />
                    worktimeTaskId:
                    <br />
                    <input
                        name="worktimeTaskId"
                        type="text"
                        value={this.state.worktimeTaskId}
                        onChange={this.handleChange} />
                    <br />

                    <button type="button" onClick={this.updateWorktimeData}>Update worktime</button>       
                </form>
            </div>

        );
    }
}

export default connect(mapStateToProps)(EditWorktimeScreen);
