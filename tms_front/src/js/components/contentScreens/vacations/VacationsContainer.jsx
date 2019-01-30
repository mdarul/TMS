import React from 'react';
import { connect } from 'react-redux';

import ListVacationsScreen from "./ListVacationsScreen.jsx"
import AddVacationScreen from "./AddVacationScreen.jsx"
import EditVacationScreen from "./EditVacationScreen.jsx"
import TeamVacationsScreen from "./TeamVacationsScreen.jsx"

const mapStateToProps = state => {
    return {
        listVacationsClicked: state.listVacationsClicked,
        editVacationClicked: state.editVacationClicked,
        addVacationClicked: state.addVacationClicked,
        teamVacationsClicked: state.teamVacationsClicked
    };
};

class VacationsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                { this.props.listVacationsClicked === true ? <ListVacationsScreen /> : "" }
                { this.props.addVacationClicked === true ? <AddVacationScreen /> : "" }
                { this.props.editVacationClicked === true ? <EditVacationScreen /> : "" }
                { this.props.teamVacationsClicked === true ? <TeamVacationsScreen /> : "" }
            </div>
        );
    }
}

export default connect(mapStateToProps)(VacationsContainer)