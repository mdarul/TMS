import React from 'react';
import { connect } from 'react-redux';

import ListTasksScreen from "./ListTasksScreen.jsx"
import AddTaskScreen from "./AddTaskScreen.jsx"
import EditTaskScreen from "./EditTaskScreen.jsx"
import SubordinatesTasksScreen from "./SubordinatesTasksScreen.jsx"
import TeamTasksScreen from './TeamTasksScreen.jsx';
import TaskCommentsScreen from './TaskCommentsScreen.jsx'; 

const mapStateToProps = state => {
    return {
        listTasksClicked: state.listTasksClicked,
        editTaskClicked: state.editTaskClicked,
        addTaskClicked: state.addTaskClicked,
        subordinatesTasksClicked: state.subordinatesTasksClicked,
        teamTaskClicked: state.teamTaskClicked,
        showCommentsClicked: state.showCommentsClicked
    };
};

class TasksContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                { this.props.listTasksClicked === true ? <ListTasksScreen /> : "" }
                { this.props.addTaskClicked === true ? <AddTaskScreen /> : "" }
                { this.props.editTaskClicked === true ? <EditTaskScreen /> : "" }
                { this.props.subordinatesTasksClicked === true ? <SubordinatesTasksScreen /> : "" }
                { this.props.teamTaskClicked === true ? <TeamTasksScreen /> : "" }
                { this.props.showCommentsClicked === true ? <TaskCommentsScreen /> : "" }
            </div>
        );
    }
}

export default connect(mapStateToProps)(TasksContainer)