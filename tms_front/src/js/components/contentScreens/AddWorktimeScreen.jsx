import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../secret.js"

const mapStateToProps = state => {
  return({
    user: state.user
  });
};

class AddWorktimeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workEndTime: "2019-01-01T00:00:00",
      workStartTime: "2019-01-01T00:00:00",
      taskId: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const requestUrl = serverUrl + `\\api\\users\\${this.props.user.id}\\workTimes\\`;

    const newWorkTime = {
      workEndTime: this.state.workEndTime,
      workStartTime: this.state.workStartTime,
      taskId: this.state.taskId,
      userId: this.props.user.id 
    }

    const http = new XMLHttpRequest();
    http.open("POST", requestUrl);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(newWorkTime));

    http.onreadystatechange = (e) => {
        if (http.readyState === 4 && http.status === 200) {
            alert("Worktime added successfully");
        }
    };

    event.preventDefault();
  }

  render() {
    return (
      <div>
          <form>
            Task id:
            <br />
            <input 
              name="taskId"
              type="text"
              value={this.state.taskId}
              onChange={this.handleChange}/>
            <br />

            workStartTime:
            <br />
            <input 
              name="workStartTime"
              type="text"
              value={this.state.workStartTime}
              onChange={this.handleChange}/>
            <br />

            workEndTime:
            <br />
            <input 
              name="workEndTime"
              type="text"
              value={this.state.workEndTime}
              onChange={this.handleChange}/>
            <br />
            <br />
            <button type="button" onClick={this.handleSubmit}>Add worktime</button>
          </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AddWorktimeScreen);