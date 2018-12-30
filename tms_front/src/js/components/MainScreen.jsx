import React from 'react';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { user: state.user };
};

class MainScreen extends React.Component {
  render() {
    return (
      <div>
          {JSON.stringify(this.props.user)}
          {/* dfsfds */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(MainScreen);