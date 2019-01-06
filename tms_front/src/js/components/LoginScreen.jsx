import React from 'react';
import { connect } from "react-redux";
import { createUser } from "../redux/actions";
import { serverUrl } from "../../secret"

function mapDispatchToProps(dispatch) {
    return {
        createUser: user => dispatch(createUser(user))
    }
}

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = {
            login: "",
            password: ""
        };
 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
 
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
 
    handleSubmit(e) {
        e.preventDefault();

        const Http = new XMLHttpRequest();
        const requestUrl = serverUrl + `/api/users/checkCredentials/${this.state.login}/${this.state.password}`;
        // console.log(requestUrl);

        Http.open("GET", requestUrl);
        Http.send();

        Http.onreadystatechange = (e) => {
            if(Http.readyState === 4 && Http.status === 200) {
                console.log("inside");
                console.log(Http.responseText);
            }
        };

        // this.props.createUser(
        // {
        //     login: this.state.login, 
        //     password: this.state.password 
        // })
        // alert(`${this.state.login}\n${this.state.password}`)
    }
 
    render() {
        return (
            <div id="loginContainer">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Login:
                        <br />
                        <input
                            name="login"
                            type="text"
                            value={this.state.login}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <br />
                        <input
                            name="password"
                            type="text"
                            value={this.state.password}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
 }

 export default connect(null, mapDispatchToProps)(LoginScreen);