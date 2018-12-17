import React from 'react';

export class LoginScreen extends React.Component {
   constructor(props) {
       super(props);

       this.state = {
           login: "",
           password: "",
           type: "",
           userUpdateHandler: props.handleUserChange
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
       // alert(`login: ${this.state.login}\npassword: ${this.state.password}`);

       const Http = new XMLHttpRequest();
       const url = "bla";
       Http.open("GET", url);
       Http.send();
       Http.onreadystatechange = (e) => {
           console.log(Http.responseText);
           this.state.userUpdateHandler(JSON.parse(Http.responseText));
       };

       event.preventDefault();
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