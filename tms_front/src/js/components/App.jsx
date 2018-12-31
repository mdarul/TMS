import React from 'react';
import { connect } from "react-redux";
import LoginScreen from "./LoginScreen.jsx";
import MainScreen from "./MainScreen.jsx";

const mapStateToProps = reduxState => {
    return { user: reduxState.user };
};

class App extends React.Component {

    // this.state = {
    //   // user: JSON.parse("{\"id\":1,\"name\":\"Jan\",\"surname\":\"Kowalski\",\"type\":1,\"bossId\":null,\"boss\":null,\"login\":\"jkow\",\"password\":\"$argon2i$v=19$m=16384,t=5,p=4$/Cm5gLVyUjw=$O/4vsdkjwPjvCTYG7sTBqi7c75G+Bi1bja8Va6aIxPI=\",\"tasks\":null,\"workTimes\":null}")
    //     user: null
    // };

  render() {
    return (
      <div>
          {console.log("app")}
          {console.log(this.props.user)}
          {(this.props.user === null || this.props.user) === undefined ? <LoginScreen /> : <MainScreen />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);