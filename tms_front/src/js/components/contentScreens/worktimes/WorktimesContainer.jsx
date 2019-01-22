import React from 'react';
import { connect } from 'react-redux';

import ListWorktimesScreen from "./ListWorktimesScreen.jsx"
import AddWorktimeScreen from "./AddWorktimeScreen.jsx"
import EditWorktimeScreen from "./EditWorktimeScreen.jsx"
import SubordinatesWorktimesScreen from "./SubordinatesWorktimesScreen.jsx"

const mapStateToProps = state => {
    return {
        user: state.user,
        listWorktimesClicked: state.listWorktimesClicked,
        addWorktimesClicked: state.addWorktimesClicked,
        subordinatesWorktimesClicked: state.subordinatesWorktimesClicked,
        editWorktimeClicked: state.editWorktimeClicked,
    };
};

class WorktimesContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                { this.props.listWorktimesClicked === true ? <ListWorktimesScreen /> : "" }
                { this.props.addWorktimesClicked === true ? <AddWorktimeScreen /> : "" }
                { this.props.editWorktimeClicked === true ? <EditWorktimeScreen /> : "" }
                { this.props.subordinatesWorktimesClicked === true ? <SubordinatesWorktimesScreen /> : "" }
            </div>
        );
    }
}

export default connect(mapStateToProps)(WorktimesContainer)