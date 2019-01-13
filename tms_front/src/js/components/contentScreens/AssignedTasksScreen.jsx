import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../secret.js"
import TaskPresent from "../utilsComponents/TaskPresent.jsx"

const mapStateToProps = state => {
  return {
       user: state.user,
      };
};

class AssignedTasksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      asignedTasks: null
    }
  }

  componentDidMount(){
    const requestUrl = serverUrl + `\\api\\users\\${this.props.user.id}\\tasks`;
    console.log(requestUrl);

    fetch(requestUrl)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          asignedTasks: responseData
        })
      });
  }

  render() {
    let tasksComponents = null;
    if(this.state.asignedTasks !== null) {
      tasksComponents = this.state.asignedTasks.map(taskJson => <TaskPresent taskJson={taskJson} key={taskJson.id} />); 
    }

    return (
      <div>
          {tasksComponents}
      </div>
    );
  }
}

export default connect(mapStateToProps)(AssignedTasksScreen);