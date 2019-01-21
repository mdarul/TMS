import React from 'react';
import { connect } from "react-redux";
import LoginScreen from "./LoginScreen.jsx";
import MainScreen from "./MainScreen.jsx";

const mapStateToProps = reduxState => {
    return { user: reduxState.user };
};

class App extends React.Component {
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