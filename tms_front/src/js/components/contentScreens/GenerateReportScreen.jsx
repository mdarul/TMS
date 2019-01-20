import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { serverUrl } from "../../../secret.js"

const mapStateToProps = state => {
    return ({
        user: state.user
    });
}

class GenerateReportScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            month: "",
            year: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const requestUrl = serverUrl + `\\api\\reports\\${this.state.year}\\${this.state.month}`;

        // const http = new XMLHttpRequest();
        // http.open("GET", requestUrl);
        // http.send();

        axios({
            url: requestUrl,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.xlsx');
            document.body.appendChild(link);
            link.click();
          });
    }

    render() {
        return (
            <div>
                <form>
                    Generate report for:
                    <br />
                    <br/ >
                    month:
                    <br />
                    <input 
                        name="month"
                        type="text"
                        value={this.state.month}
                        onChange={this.handleChange}/>
                                            <br/ >
                    year:
                    <br />
                    <input 
                        name="year"
                        type="text"
                        value={this.state.year}
                        onChange={this.handleChange}/>
                    <br />

                    <button onClick={this.handleSubmit}>Generate report</button>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(GenerateReportScreen);