import React from 'react';
import { connect } from "react-redux";
import { updateUser } from "../redux/actions";
import { serverUrl } from "../../secret"

function mapDispatchToProps(dispatch) {
    return {
        updateUser: user => dispatch(updateUser(user))
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
 
    handleSubmit(event) {
        // const Http = new XMLHttpRequest();
        // const url = serverUrl + `\\api\\users\\checkCredentials\\${this.state.login}\\${this.state.password}`;
        // console.log(url);
        // Http.open("GET", url);
        // Http.send();
        // Http.onreadystatechange = (e) => {
        //     if(this.readyState === 4 && this.status === 200) {
        //         console.log(this.responseText);
        //     }
        // };
        // event.preventDefault();

        this.props.updateUser(
            {
                user: { 
                    login: this.state.login, 
                    password: this.state.password 
                }
            }
        )
        // alert(`${this.state.login}\n${this.state.password}`)
    }
 
    render() {
        return (
            <div id="loginContainer">
                <form onSubmit={this.props.updateUser}>
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