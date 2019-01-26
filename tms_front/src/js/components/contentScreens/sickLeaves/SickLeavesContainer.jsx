import React from 'react';
import { connect } from 'react-redux';

import ListSickLeavesScreen from "./ListSickLeavesScreen.jsx";
import AddSickLeaveScreen from "./AddSickLeaveScreen.jsx";
import EditSickLeaveScreen from "./EditSickLeaveScreen.jsx";

const mapStateToProps = state => {
    return {
        listSickLeavesClicked: state.listSickLeavesClicked,
        editSickLeaveClicked: state.editSickLeaveClicked,
        addSickLeaveClicked: state.addSickLeaveClicked
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
            </div>
        );
    }
}

export default connect(mapStateToProps)(SickLeavesContainer)