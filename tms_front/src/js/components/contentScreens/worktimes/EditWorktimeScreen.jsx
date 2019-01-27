import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../../secret.js"

const mapStateToProps = state => {
    return {
        user: state.user,
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
                <form className="form-group">
                    <label>Worktime id</label>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input 
                                className="form-control" 
                                name="worktimeId"
                                type="text"
                                value={this.state.worktimeId}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-2">
                            <button type="button" className="btn btn-primary form-control" onClick={this.getWorktimeData}>Get worktime values</button>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Start</label>
                            <input
                                className="form-control"
                                name="workStartTime"
                                type="text"
                                value={this.state.workStartTime}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>End</label>
                            <input
                                className="form-control"
                                name="workEndTime"
                                type="text"
                                value={this.state.workEndTime}
                                onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Task id</label>
                        <input
                            className="form-control"
                            name="worktimeTaskId"
                            type="text"
                            value={this.state.worktimeTaskId}
                            onChange={this.handleChange} />
                    </div>

                    <button type="button" className="btn btn-primary" onClick={this.updateWorktimeData}>Update worktime</button>       
                </form>
            </div>

        );
    }
}

export default connect(mapStateToProps)(EditWorktimeScreen);
