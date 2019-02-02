import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../../secret.js"
import taskTypes from "../../../utils/tasksTypes.js"

const mapStateToProps = state => {
    return {
        user: state.user,
        task: state.selectedTask,
    };
  };

class EditWorktimeScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id: props.task.id,
            title: props.task.title,
            userId: props.task.userId,
            stage: props.task.stage,
            content: props.task.content
        }

        this.getTaskData = this.getTaskData.bind(this);
        this.updateTaskData = this.updateTaskData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getTaskData(event) {
        event.preventDefault();
        const requestUrl = serverUrl + `\\api\\tasks\\${this.state.id}`;

        const Http = new XMLHttpRequest();
        Http.open("GET", requestUrl);
        Http.send();
        Http.onreadystatechange = (e) => {
            if(Http.readyState === 4 && Http.status === 200) {
                const responseData = JSON.parse(Http.responseText);
                this.setState({
                    title: responseData.title,
                    userId: responseData.userId,
                    stage: responseData.stage,
                    content: responseData.content
                });
            }
        }
    }

    updateTaskData(event) {
        event.preventDefault();
        const requestUrl = serverUrl + `\\api\\tasks\\${this.state.id}`;

        const updatedTask = {
            title: this.state.title,
            userId: this.state.userId,
            stage: this.state.stage,
            content: this.state.content,
            userId: this.props.user.id
        };

        const http = new XMLHttpRequest();
        http.open("PUT", requestUrl);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(updatedTask));
    
        http.onreadystatechange = (e) => {
            if (http.readyState === 4 && http.status === 200) {
                alert("Task updated successfully");
            }
        };
    }

    render(){
        return(
            <div>
                <form className="form-group">
                    <label>Task id</label>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input 
                                className="form-control" 
                                name="id"
                                type="text"
                                value={this.state.id}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-2">
                            <button type="button" className="btn btn-primary form-control" onClick={this.getTaskData}>Get task values</button>
                        </div>
                    </div>
                    <br />

                    <div className="form-row">
                        <div class="col">
                            <label>Title</label>
                            <input
                                className="form-control"
                                name="title"
                                type="text"
                                value={this.state.title}
                                onChange={this.handleChange} />
                        </div>
                        <div class="col">
                            <label>User id</label>
                            <input
                                className="form-control"
                                name="userId"
                                type="text"
                                value={this.state.userId}
                                onChange={this.handleChange} />                        
                        </div>
                    </div>

                    <label>Stage</label>
                    <select 
                        className="custom-select mr-sm-2"
                        name="stage"
                        type="text"
                        value={this.state.stage}
                        onChange={this.handleChange} >
                        <option value={taskTypes[0].value}>{taskTypes[0].label}</option>
                        <option value={taskTypes[1].value}>{taskTypes[1].label}</option>
                        <option value={taskTypes[2].value}>{taskTypes[2].label}</option>
                        <option value={taskTypes[3].value}>{taskTypes[3].label}</option>
                        <option value={taskTypes[4].value}>{taskTypes[4].label}</option>
                        <option value={taskTypes[5].value}>{taskTypes[5].label}</option>
                    </select>

                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Content</label>
                        <textarea 
                            className="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="3"
                            name="content"
                            type="text"
                            value={this.state.content}
                            onChange={this.handleChange} />
                    </div>

                    <button type="button" className="btn btn-primary form-control" onClick={this.updateTaskData}>Update task</button>       
                </form>
            </div>

        );
    }
}

export default connect(mapStateToProps)(EditWorktimeScreen);
