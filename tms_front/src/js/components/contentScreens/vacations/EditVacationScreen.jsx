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
                <form className="form-group">

                    <label>Vacation id</label>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input 
                                className="form-control" 
                                name="vacationId"
                                type="text"
                                value={this.state.vacationId}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-2">
                            <button type="button" className="btn btn-primary form-control" onClick={this.getVacationData}>Get vacation values</button>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Start</label>
                            <input
                                className="form-control"
                                name="startTime"
                                type="text"
                                value={this.state.startTime}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>End</label>
                            <input
                                className="form-control"
                                name="endTime"
                                type="text"
                                value={this.state.endTime}
                                onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <button type="button" className="btn btn-primary" onClick={this.updateVacationData}>Update vacation</button>       
                    </div>

                </form>
            </div>

        );
    }
}

export default connect(mapStateToProps)(EditVacationScreen);
