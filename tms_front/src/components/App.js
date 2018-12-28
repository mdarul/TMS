import React from 'react';
import LoginScreen from "./LoginScreen";
import {MainScreen} from "./MainScreen";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // user: JSON.parse("{\"id\":1,\"name\":\"Jan\",\"surname\":\"Kowalski\",\"type\":1,\"bossId\":null,\"boss\":null,\"login\":\"jkow\",\"password\":\"$argon2i$v=19$m=16384,t=5,p=4$/Cm5gLVyUjw=$O/4vsdkjwPjvCTYG7sTBqi7c75G+Bi1bja8Va6aIxPI=\",\"tasks\":null,\"workTimes\":null}")
        user: null
    };

    this.handleUserChange = this.handleUserChange.bind(this);
  }

  handleUserChange(newUser){
    this.setState({
        user: newUser
    })
  }

  render() {
    console.log(this.state.user);
    return (
      <div>
          {this.state.user === null ? <LoginScreen handleUserChange={this.handleUserChange}/> : <MainScreen user={this.state.user}/>}
      </div>
    );
  }
}

export default App;
