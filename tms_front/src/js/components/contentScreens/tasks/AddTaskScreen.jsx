import React from 'react';
import { connect } from 'react-redux';
import taskTypes from "../../../utils/tasksTypes.js"
import {serverUrl} from "../../../../secret.js"

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
        userId: this.props.user.id

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
      userId: this.state.userId 
    }

    const http = new XMLHttpRequest();
    http.open("POST", requestUrl);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(newTask));

    http.onreadystatechange = (e) => {
        if (http.readyState === 4 && http.status === 200) {
            alert("Task added successfully");
        }
        else {
          console.log(http.readyState);
          console.log(http.status);
        }
    };

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form className="form-group">
          <div className="form-row">
              <div className="col">
                  <label>Title</label>
                  <input
                      className="form-control"
                      name="title"
                      type="text"
                      value={this.state.title}
                      onChange={this.handleChange} />
              </div>
              <div className="col">
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
              <label>Content</label>
              <textarea 
                  className="form-control" 
                  rows="3"
                  name="content"
                  type="text"
                  value={this.state.content}
                  onChange={this.handleChange} />
          </div>

          <button type="button" className="btn btn-primary form-control" onClick={this.handleSubmit}>Add task</button>
        </form>           
      </div>
    );
  }
}

export default connect(mapStateToProps)(AddTaskScreen);