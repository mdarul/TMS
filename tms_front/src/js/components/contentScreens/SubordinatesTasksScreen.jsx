import React from 'react';
import { connect } from 'react-redux';
import {serverUrl} from "../../../secret.js"
import TaskPresent from "../utilsComponents/TaskPresent.jsx"

const mapStateToProps = state => {
  return {
       user: state.user,
      };
};

class SubordinatesTasksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: null
    }
  }

  componentDidMount() {
    const requestUrl = serverUrl + `\\api\\users\\${this.props.user.id}\\tasks\\subordinates\\`;
    console.log(requestUrl);
    fetch(requestUrl)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        this.setState({
          tasks: responseData
        });
      });
  }

  render() {
    let tasksComponents = null;
    if(this.state.tasks !== null) {
      tasksComponents = this.state.tasks.map(taskJson => <TaskPresent taskJson={taskJson} key={taskJson.id} />); 
    }

    return (
      <div>
        { tasksComponents }
      </div>
    );
  }
}

export default connect(mapStateToProps)(SubordinatesTasksScreen);