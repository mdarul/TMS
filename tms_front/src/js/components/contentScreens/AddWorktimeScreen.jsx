import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../secret.js"
import moment from 'moment';

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
    this.fillStartWithCurrentDate = this.fillStartWithCurrentDate.bind(this);
    this.fillEndWithCurrentDate = this.fillEndWithCurrentDate.bind(this);
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

  fillStartWithCurrentDate(event) {
    event.preventDefault();
    const currentTime = moment().format().slice(0, -6);
    this.setState({
      workStartTime: currentTime
    });
  }

  fillEndWithCurrentDate(event) {
    event.preventDefault();
    const currentTime = moment().format().slice(0, -6);
    this.setState({
      workEndTime: currentTime
    });
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
            <button type="button" onClick={this.fillStartWithCurrentDate}>Now</button>
            <br />

            workEndTime:
            <br />
            <input 
              name="workEndTime"
              type="text"
              value={this.state.workEndTime}
              onChange={this.handleChange}/>
            <button type="button" onClick={this.fillEndWithCurrentDate}>Now</button>
            <br />
            <br />
            <button type="button" onClick={this.handleSubmit}>Add worktime</button>
          </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AddWorktimeScreen);