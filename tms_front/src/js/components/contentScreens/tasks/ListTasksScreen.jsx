import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { serverUrl } from "../../../../secret.js"
import { showScreen } from "../../../redux/actions"
import { ADD_TASK, SUBORDINATES_TASKS } from '../../../redux/constants.js';
import TaskPresent from "../../utilsComponents/TaskPresent.jsx"

const mapStateToProps = state => {
  return {
       user: state.user,
      };
};

function mapDispatchToProps(dispatch) {
  return {
      showScreen: screen => dispatch(showScreen(screen))
  }
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
        <div class="taskButtonGroup btn-group btn-group-lg" role="group" aria-label="...">
          <button onClick={() => this.props.showScreen(ADD_TASK)} className="btn btn-dark btn-lg">Add task</button>
          <button onClick={() => this.props.showScreen(SUBORDINATES_TASKS)} className="btn btn-dark btn-lg">Show subordinates tasks</button>
        </div>

        <div className="listEntityContainer">
            { tasksComponents }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignedTasksScreen);