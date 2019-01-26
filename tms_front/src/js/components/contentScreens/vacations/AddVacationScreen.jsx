import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../../secret.js";

const mapStateToProps = (state) => {
    return ({
        user: state.user
    });
};

class AddVacationScreen extends React.Component {
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
        const requestUrl = serverUrl + `\\api\\vacations\\`;
    
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
                alert("Vacation added successfully");
            }
        };
    }

    render() {
        return(
            <div>
            <form>
              startTime:
              <br />
              <input 
                name="startTime"
                type="text"
                value={this.state.startTime}
                onChange={this.handleChange}/>
              <br />
  
              endTime:
              <br />
              <input 
                name="endTime"
                type="text"
                value={this.state.endTime}
                onChange={this.handleChange}/>
              <br />
              <br />
              <button type="button" onClick={this.handleSubmit}>Add vacation</button>
            </form>
        </div>
        );
    }
}

export default connect(mapStateToProps)(AddVacationScreen);