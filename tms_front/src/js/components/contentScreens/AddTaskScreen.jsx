import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
       user: state.user,
      };
};

class AddTaskScreen extends React.Component {

  render() {
    return (
      <div>
          add task
      </div>
    );
  }
}

export default connect(mapStateToProps)(AddTaskScreen);