import React from 'react';
import { showScreen } from "../redux/actions"
import { connect } from "react-redux";
import '../../styles/style.css'

import WorktimesContainer from "./contentScreens/worktimes/WorktimesContainer.jsx"
import TasksContainer from "./contentScreens/tasks/TasksContainer.jsx"

import UserSettingsScreen from "./contentScreens/UserSettingsScreen.jsx"
import VacationsContainer from "./contentScreens/vacations/VacationsContainer.jsx"
import AddSickLeaveScreen from "./contentScreens/AddSickLeaveScreen.jsx"
import ListSickLeavesScreen from "./contentScreens/ListSickLeavesScreen.jsx"
import EditSickLeaveScreen from "./contentScreens/EditSickLeaveScreen.jsx"
import GenerateReportScreen from "./contentScreens/GenerateReportScreen.jsx"

import {
    USER_SETTINGS,
    LIST_WORKTIMES,
    LIST_TASKS,
    LIST_VACATIONS,
    LIST_SICK_LEAVES,
    ADD_SICK_LEAVE,
    EDIT_SICK_LEAVE,
    GENERATE_REPORT
} from "../redux/constants";

import {
    worktimesText,
    tasksText,
    vacationsText,
    sickLeavesText,
    generateReportsText
} from "../utils/strings.js"

const mapStateToProps = state => {
    return {
         user: state.user,
         userSettingsClicked: state.userSettingsClicked,
         listWorktimesClicked: state.listWorktimesClicked,
         addWorktimesClicked: state.addWorktimesClicked,
         editWorktimeClicked: state.editWorktimeClicked,
         subordinatesWorktimesClicked: state.subordinatesWorktimesClicked,
         listTasksClicked: state.listTasksClicked,
         addTaskClicked: state.addTaskClicked,
         editTaskClicked: state.editTaskClicked,
         subordinatesTasksClicked: state.subordinatesTasksClicked,
         addVacationClicked: state.addVacationClicked,
         listVacationsClicked: state.listVacationsClicked,
         editVacationClicked: state.editVacationClicked,
         addSickLeaveClicked: state.addSickLeaveClicked,
         listSickLeavesClicked: state.listSickLeavesClicked,
         editSickLeaveClicked: state.editSickLeaveClicked,
         generateReportClicked: state.generateReportClicked
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
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(GENERATE_REPORT)}>
                        { generateReportsText }
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(LIST_WORKTIMES)}>
                        { worktimesText }
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(LIST_TASKS)}>
                        { tasksText }
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(LIST_VACATIONS)}>
                        { vacationsText }
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(ADD_SICK_LEAVE)}>
                        Add sick leave
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(LIST_SICK_LEAVES)}>
                        List sick leaves
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(EDIT_SICK_LEAVE)}>
                        Edit sick leave

                    </div>
                </div>
                <div className="operationContainer">
                    { this.props.userSettingsClicked === true ? <UserSettingsScreen /> : ""}
                    { this.props.generateReportClicked === true ? <GenerateReportScreen /> : ""}

                    { ( this.props.listWorktimesClicked === true || this.props.addWorktimesClicked === true ||
                        this.props.editWorktimeClicked === true || this.props.subordinatesWorktimesClicked) 
                        ? <WorktimesContainer /> : ""}

                    { ( this.props.listTasksClicked === true || this.props.addTaskClicked === true ||
                        this.props.editTaskClicked === true ||this.props.subordinatesTasksClicked) 
                        ? <TasksContainer /> : ""}


                    { ( this.props.addVacationClicked === true || this.props.listVacationsClicked === true ||
                        this.props.editVacationClicked ) 
                        ? <VacationsContainer /> : ""}

                    { ( this.props.addSickLeaveClicked === true || this.props.listSickLeavesClicked ||
                        this.props.editSickLeaveClicked) 
                        ? <AddSickLeaveScreen /> : ""}
                </div>
            </div>
        </div>      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);