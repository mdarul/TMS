import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../../secret.js"

const mapStateToProps = state => {
    console.log(state);
    return {
         user: state.user,
         vacation: state.selectedVacation
        };
  };

class EditVacationScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            vacationId: props.vacation.id,
            startTime: props.vacation.startTime,
            endTime: props.vacation.endTime
        }

        this.getVacationData = this.getVacationData.bind(this);
        this.updateVacationData = this.updateVacationData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getVacationData(event) {
        event.preventDefault();
        const requestUrl = serverUrl + `\\api\\vacations\\${this.state.vacationId}`;

        const Http = new XMLHttpRequest();
        Http.open("GET", requestUrl);
        Http.send();
        Http.onreadystatechange = (e) => {
            if(Http.readyState === 4 && Http.status === 200) {
                const responseData = JSON.parse(Http.responseText);
                this.setState({
                    startTime: responseData.startTime,
                    endTime: responseData.endTime
                });
            }
        }
    }

    updateVacationData(event) {
        event.preventDefault();
        const requestUrl = serverUrl + `\\api\\vacations\\${this.state.vacationId}`;

        const updatedVacation = {
            userId: this.props.user.id,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        };

        const http = new XMLHttpRequest();
        http.open("PUT", requestUrl);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(updatedVacation));
    
        http.onreadystatechange = (e) => {
            if (http.readyState === 4 && http.status === 200) {
                alert("Vacation updated successfully");
            }
        };
    }

    render(){
        return(
            <div>
                <form>
                    Vacation id:
                    <br />
                    <input
                        name="vacationId"
                        type="text"
                        value={this.state.vacationId}
                        onChange={this.handleChange} />

                    <br />
                    <button type="button" onClick={this.getVacationData}>Get vacation values</button>
                    <br />
                    <br />
                    Vacation start:
                    <br />
                    <input
                        name="startTime"
                        type="text"
                        value={this.state.startTime}
                        onChange={this.handleChange} />
                    <br />
                    Vacation end:
                    <br />
                    <input
                        name="endTime"
                        type="text"
                        value={this.state.endTime}
                        onChange={this.handleChange} />
                    <br />

                    <button type="button" onClick={this.updateVacationData}>Update vacation</button>       
                </form>
            </div>

        );
    }
}

export default connect(mapStateToProps)(EditVacationScreen);
