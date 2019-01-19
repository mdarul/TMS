import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../secret.js";

const mapStateToProps = (state) => {
    return ({
        user: state.user
    });
};

class AddSickLeaveScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            startTime: "2019-01-01T00:00:00",
            endTime: "2019-01-01T00:00:00",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const requestUrl = serverUrl + `\\api\\sickLeaves\\`;
    
        const newVacation = {
          endTime: this.state.endTime,
          startTime: this.state.startTime,
          userId: this.props.user.id 
        }
    
        const http = new XMLHttpRequest();
        http.open("POST", requestUrl);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(newVacation));
    
        http.onreadystatechange = (e) => {
            if (http.readyState === 4 && http.status === 200) {
                alert("Sick leaves added successfully");
            }
        };
    }

    render() {
        return(
            <div>
            <form>
              Sick leave start:
              <br />
              <input 
                name="startTime"
                type="text"
                value={this.state.startTime}
                onChange={this.handleChange}/>
              <br />
  
              Sick leave end:
              <br />
              <input 
                name="endTime"
                type="text"
                value={this.state.endTime}
                onChange={this.handleChange}/>
              <br />
              <br />
              <button type="button" onClick={this.handleSubmit}>Add sick leave</button>
            </form>
        </div>
        );
    }
}

export default connect(mapStateToProps)(AddSickLeaveScreen);