import React from 'react';
import { showScreen } from "../redux/actions"
import { connect } from "react-redux";
import '../../styles/style.css'

import ListWorktimesScreen from "./contentScreens/ListWorktimesScreen.jsx"
import UserSettingsScreen from "./contentScreens/UserSettingsScreen.jsx"
import AddWorktimeScreen from "./contentScreens/AddWorktimeScreen.jsx"
import EditWorktimeScreen from "./contentScreens/EditWorktimeScreen.jsx"
import AssignedTasksScreen from "./contentScreens/AssignedTasksScreen.jsx"
import AddTaskScreen from "./contentScreens/AddTaskScreen.jsx"
import SubordinatesTasksScreen from "./contentScreens/SubordinatesTasksScreen.jsx"
import SubordinatesWorktimesScreen from "./contentScreens/SubordinatesWorktimesScreen.jsx"

import 
{
    USER_SETTINGS,
    LIST_WORKTIMES,
    ADD_WORKTIME,
    EDIT_WORKTIME,
    ASSIGNED_TASKS,
    ADD_TASK,
    SUBORDINATES_TASKS,
    SUBORDINATES_WORKTIMES
} from "../redux/constants";

const mapStateToProps = state => {
    return {
         user: state.user,
         userSettingsClicked: state.userSettingsClicked,
         listWorktimesClicked: state.listWorktimesClicked,
         addWorktimesClicked: state.addWorktimesClicked,
         assignedTasksClicked: state.assignedTasksClicked,
         addTaskClicked: state.addTaskClicked,
         subordinatesTasksClicked: state.subordinatesTasksClicked,
         subordinatesWorktimesClicked: state.subordinatesWorktimesClicked,
         editWorktimeClicked: state.editWorktimeClicked
        };
};

function mapDispatchToProps(dispatch) {
  return {
      showScreen: screen => dispatch(showScreen(screen))
  }
}

class MainScreen extends React.Component {
  render() {
    return (
        <div className="mainScreen">
            <div className="header">
                Welcome, {this.props.user.name}!
            </div>
            <div className="contentContainer">
                <div className="sidebar">
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(USER_SETTINGS)}>
                        User settings
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(LIST_WORKTIMES)}>
                        List worktimes
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(ADD_WORKTIME)}>
                        Add worktime
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(EDIT_WORKTIME)}>
                        Edit worktime
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(ASSIGNED_TASKS)}>
                        Assigned tasks
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(ADD_TASK)}>
                        Add task
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(SUBORDINATES_TASKS)}>
                        Subordinates tasks
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(SUBORDINATES_WORKTIMES)}>
                        Subordinates worktimes
                    </div>
                </div>
                <div className="operationContainer">
                    { this.props.userSettingsClicked === true ? <UserSettingsScreen /> : ""}
                    { this.props.listWorktimesClicked === true ? <ListWorktimesScreen /> : ""}
                    { this.props.addWorktimesClicked === true ? <AddWorktimeScreen /> : ""}
                    { this.props.editWorktimeClicked === true ? <EditWorktimeScreen /> : ""}
                    { this.props.assignedTasksClicked === true ? <AssignedTasksScreen /> : ""}
                    { this.props.addTaskClicked === true ? <AddTaskScreen /> : ""}
                    { this.props.subordinatesTasksClicked === true ? <SubordinatesTasksScreen /> : ""}
                    { this.props.subordinatesWorktimesClicked === true ? <SubordinatesWorktimesScreen /> : ""}
                </div>
            </div>
        </div>      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);