import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../../secret.js"

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
                console.log(responseData);
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
                <form>
                    Task id:
                    <br />
                    <input
                        name="id"
                        type="text"
                        value={this.state.id}
                        onChange={this.handleChange} />

                    <br />
                    <button type="button" onClick={this.getTaskData}>Get task values</button>
                    <br />
                    <br />
                    Title:
                    <br />
                    <input
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChange} />
                    <br />
                    Stage:
                    <br />
                    <input
                        name="stage"
                        type="text"
                        value={this.state.stage}
                        onChange={this.handleChange} />
                    <br />
                    Assigned employee:
                    <br />
                    <input
                        name="userId"
                        type="text"
                        value={this.state.userId}
                        onChange={this.handleChange} />
                    <br />
                    Content:
                    <br />
                    <input
                        name="content"
                        type="text"
                        value={this.state.content}
                        onChange={this.handleChange} />
                    <br />

                    <button type="button" onClick={this.updateTaskData}>Update task</button>       
                </form>
            </div>

        );
    }
}

export default connect(mapStateToProps)(EditWorktimeScreen);
