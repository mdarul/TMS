import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../../secret.js";
import { formatStringDateWithTimeToFullDate, formatDateFromRawString } from "../../../utils/dateFormatter.js";
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
      workEndTime: formatDateFromRawString("2019-01-01T00:00:00"),
      workStartTime: formatDateFromRawString("2019-01-01T00:00:00"),
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
      workEndTime: formatStringDateWithTimeToFullDate(this.state.workEndTime),
      workStartTime: formatStringDateWithTimeToFullDate(this.state.workStartTime),
      taskId: this.state.taskId,
      userId: this.props.user.id 
    }

    console.log(newWorkTime);

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
      workStartTime: formatDateFromRawString(currentTime)
    });
  }

  fillEndWithCurrentDate(event) {
    event.preventDefault();
    const currentTime = moment().format().slice(0, -6);
    this.setState({
      workEndTime: formatDateFromRawString(currentTime)
    });
  }

  render() {
    return (
      <div>
          <form className="form-group">
            <label>Task id</label>
            <input 
              className="form-control"
              name="taskId"
              type="text"
              value={this.state.taskId}
              onChange={this.handleChange}/>

            <label>Worktime start</label>
            <div className="form-row">
              <div className="form-group col-md-2">
                <input
                  className="form-control" 
                  name="workStartTime"
                  type="text"
                  value={this.state.workStartTime}
                  onChange={this.handleChange}/>
              </div>
              <div className="form-group col-md-2">
                <button type="button" className="btn btn-primary" onClick={this.fillStartWithCurrentDate}>Now</button> 
              </div>  
            </div>

            <label>Worktime end</label>
            <div className="form-row">
              <div className="form-group col-md-2">
                <input 
                  className="form-control" 
                  name="workEndTime"
                  type="text"
                  value={this.state.workEndTime}
                  onChange={this.handleChange}/>
              </div>
              <div className="form-group col-md-2">
                <button type="button" className="btn btn-primary" onClick={this.fillEndWithCurrentDate}>Now</button>
              </div>  
            </div>

            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Add worktime</button>
          </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AddWorktimeScreen);