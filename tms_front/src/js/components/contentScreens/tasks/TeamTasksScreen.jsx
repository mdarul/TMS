import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverUrl } from "../../../../secret.js"
import TaskPresentForTeam from '../../utilsComponents/TaskPresentForTeam.jsx';

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

class TeamTasksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teamTasks: null,
    }
  }

  componentDidMount(){
    const requestUrl = serverUrl + `\\api\\users\\${this.props.user.id}\\tasks\\team`;

    fetch(requestUrl)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
            teamTasks: responseData
        });
      });
  }

  render() {
    let tasksComponents = null;
    if(this.state.teamTasks !== null) {
      tasksComponents = this.state.teamTasks.map(taskJson => <TaskPresentForTeam taskJson={taskJson} key={taskJson.id} />); 
    }

    return (
        <div className="listEntityContainer">
            { tasksComponents }
        </div>
    );
  }
}

export default connect(mapStateToProps)(TeamTasksScreen);