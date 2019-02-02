import React from 'react';
import { showScreen } from "../redux/actions"
import { connect } from "react-redux";
import '../../styles/style.css'

import GenerateReportScreen from "./contentScreens/GenerateReportScreen.jsx"
import WorktimesContainer from "./contentScreens/worktimes/WorktimesContainer.jsx"
import TasksContainer from "./contentScreens/tasks/TasksContainer.jsx"
import VacationsContainer from "./contentScreens/vacations/VacationsContainer.jsx"
import SickLeavesContainer from "./contentScreens/sickLeaves/SickLeavesContainer.jsx"

import {
    LIST_WORKTIMES,
    LIST_TASKS,
    LIST_VACATIONS,
    LIST_SICK_LEAVES,
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
         listWorktimesClicked: state.listWorktimesClicked,
         addWorktimesClicked: state.addWorktimesClicked,
         editWorktimeClicked: state.editWorktimeClicked,
         subordinatesWorktimesClicked: state.subordinatesWorktimesClicked,
         showCommentsClicked: state.showCommentsClicked,
         listTasksClicked: state.listTasksClicked,
         addTaskClicked: state.addTaskClicked,
         editTaskClicked: state.editTaskClicked,
         teamTaskClicked: state.teamTaskClicked,
         subordinatesTasksClicked: state.subordinatesTasksClicked,
         addVacationClicked: state.addVacationClicked,
         listVacationsClicked: state.listVacationsClicked,
         editVacationClicked: state.editVacationClicked,
         teamVacationsClicked: state.teamVacationsClicked,
         addSickLeaveClicked: state.addSickLeaveClicked,
         listSickLeavesClicked: state.listSickLeavesClicked,
         editSickLeaveClicked: state.editSickLeaveClicked,
         teamSickLeavesClicked: state.teamSickLeavesClicked,
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
                    <button className="btn btn-dark btn-lg btn-block" onClick={() => this.props.showScreen(GENERATE_REPORT)}>
                        { generateReportsText }
                    </button>
                    <button className="btn btn-dark btn-lg btn-block" onClick={() => this.props.showScreen(LIST_WORKTIMES)}>
                        { worktimesText }
                    </button>
                    <button className="btn btn-dark btn-lg btn-block" onClick={() => this.props.showScreen(LIST_TASKS)}>
                        { tasksText }
                    </button>
                    <button className="btn btn-dark btn-lg btn-block" onClick={() => this.props.showScreen(LIST_VACATIONS)}>
                        { vacationsText }
                    </button>
                    <button className="btn btn-dark btn-lg btn-block" onClick={() => this.props.showScreen(LIST_SICK_LEAVES)}>
                        { sickLeavesText }
                    </button>
                </div>
                <div className="operationContainer">
                    { this.props.generateReportClicked === true ? <GenerateReportScreen /> : ""}

                    { ( this.props.listWorktimesClicked === true || this.props.addWorktimesClicked === true ||
                        this.props.editWorktimeClicked === true || this.props.subordinatesWorktimesClicked) 
                        ? <WorktimesContainer /> : ""}

                    { ( this.props.listTasksClicked === true || this.props.addTaskClicked === true ||
                        this.props.editTaskClicked === true || this.props.subordinatesTasksClicked ||
                        this.props.teamTaskClicked === true || this.props.showCommentsClicked === true) 
                        ? <TasksContainer /> : ""}


                    { ( this.props.addVacationClicked === true || this.props.listVacationsClicked === true ||
                        this.props.editVacationClicked || this.props.teamVacationsClicked === true) 
                        ? <VacationsContainer /> : ""}

                    { ( this.props.addSickLeaveClicked === true || this.props.listSickLeavesClicked ||
                        this.props.editSickLeaveClicked  || this.props.teamSickLeavesClicked === true) 
                        ? <SickLeavesContainer /> : ""}
                </div>
            </div>
        </div>      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);