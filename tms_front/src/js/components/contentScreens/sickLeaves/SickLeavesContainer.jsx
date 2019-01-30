import React from 'react';
import { connect } from 'react-redux';

import ListSickLeavesScreen from "./ListSickLeavesScreen.jsx";
import AddSickLeaveScreen from "./AddSickLeaveScreen.jsx";
import EditSickLeaveScreen from "./EditSickLeaveScreen.jsx";
import TeamSickLeavesScreen from "./TeamSickLeavesScreen.jsx";

const mapStateToProps = state => {
    return {
        listSickLeavesClicked: state.listSickLeavesClicked,
        editSickLeaveClicked: state.editSickLeaveClicked,
        addSickLeaveClicked: state.addSickLeaveClicked,
        teamSickLeavesClicked: state.teamSickLeavesClicked
    };
};

class SickLeavesContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                { this.props.listSickLeavesClicked === true ? <ListSickLeavesScreen /> : "" }
                { this.props.addSickLeaveClicked === true ? <AddSickLeaveScreen /> : "" }
                { this.props.editSickLeaveClicked === true ? <EditSickLeaveScreen /> : "" }
                { this.props.teamSickLeavesClicked === true ? <TeamSickLeavesScreen /> : "" }
            </div>
        );
    }
}

export default connect(mapStateToProps)(SickLeavesContainer)