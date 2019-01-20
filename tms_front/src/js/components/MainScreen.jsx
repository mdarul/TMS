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
import AddVacationScreen from "./contentScreens/AddVacationScreen.jsx"
import ListVacationsScreen from "./contentScreens/ListVacationsScreen.jsx"
import EditVacationScreen from "./contentScreens/EditVacationScreen.jsx"
import AddSickLeaveScreen from "./contentScreens/AddSickLeaveScreen.jsx"
import ListSickLeavesScreen from "./contentScreens/ListSickLeavesScreen.jsx"
import EditSickLeaveScreen from "./contentScreens/EditSickLeaveScreen.jsx"
import GenerateReportScreen from "./contentScreens/GenerateReportScreen.jsx"



import
{
    USER_SETTINGS,
    LIST_WORKTIMES,
    ADD_WORKTIME,
    EDIT_WORKTIME,
    ASSIGNED_TASKS,
    ADD_TASK,
    SUBORDINATES_TASKS,
    SUBORDINATES_WORKTIMES,
    ADD_VACATION,
    LIST_VACATIONS,
    EDIT_VACATION,
    ADD_SICK_LEAVE,
    LIST_SICK_LEAVES,
    EDIT_SICK_LEAVE,
    GENERATE_REPORT
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
         editWorktimeClicked: state.editWorktimeClicked,
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
                        Generate report
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
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(ADD_VACATION)}>
                        Add vacation
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(LIST_VACATIONS)}>
                        List vacations
                    </div>
                    <div className="sidebarActivity" onClick={() => this.props.showScreen(EDIT_VACATION)}>
                        Edit vacation
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
                    { this.props.listWorktimesClicked === true ? <ListWorktimesScreen /> : ""}
                    { this.props.addWorktimesClicked === true ? <AddWorktimeScreen /> : ""}
                    { this.props.editWorktimeClicked === true ? <EditWorktimeScreen /> : ""}
                    { this.props.assignedTasksClicked === true ? <AssignedTasksScreen /> : ""}
                    { this.props.addTaskClicked === true ? <AddTaskScreen /> : ""}
                    { this.props.subordinatesTasksClicked === true ? <SubordinatesTasksScreen /> : ""}
                    { this.props.subordinatesWorktimesClicked === true ? <SubordinatesWorktimesScreen /> : ""}
                    { this.props.addVacationClicked === true ? <AddVacationScreen /> : ""}
                    { this.props.listVacationsClicked === true ? <ListVacationsScreen /> : ""}
                    { this.props.editVacationClicked === true ? <EditVacationScreen /> : ""}
                    { this.props.addSickLeaveClicked === true ? <AddSickLeaveScreen /> : ""}
                    { this.props.listSickLeavesClicked === true ? <ListSickLeavesScreen /> : ""}
                    { this.props.editSickLeaveClicked === true ? <EditSickLeaveScreen /> : ""}

                </div>
            </div>
        </div>      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);