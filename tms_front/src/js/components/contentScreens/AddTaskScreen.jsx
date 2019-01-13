import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import taskTypes from "../../utils/tasksTypes.js"
import {serverUrl} from "../../../secret.js"

const mapStateToProps = state => {
  return {
       user: state.user,
      };
};

class AddTaskScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        title: "",
        content: "",
        stage: "",

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  handleSelectChange(selectedType) {
    this.setState({
      stage: selectedType
    });
  }

  handleSubmit(event) {
    const requestUrl = serverUrl + "\\api\\tasks";

    const newTask = {
      title: this.state.title,
      content: this.state.content,
      stage: this.state.stage.value,
      userId: this.props.user.id 
    }

    const http = new XMLHttpRequest();
    http.open("POST", requestUrl);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(newTask));

    http.onreadystatechange = (e) => {
        if (http.readyState === 4 && http.status === 200) {
            alert("Task added successfully");
        }
    };

    event.preventDefault();
  }

  render() {
    return (
      <div>
          <form>
            Task title:
            <br />
            <input                             
              name="title"
              type="text"
              value={this.state.title} 
              onChange={this.handleChange} />
            
            <br/>

            Task content:
            <br />
            <input                             
              name="content"
              type="text"
              value={this.state.content} 
              onChange={this.handleChange} />
            <br />

            Stage:
            <br />
            <Select
              value={this.state.stage}
              onChange={this.handleSelectChange}
              options={taskTypes} />
            <br />
            
            <button type="button" onClick={this.handleSubmit}>Add task</button>
          </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AddTaskScreen);