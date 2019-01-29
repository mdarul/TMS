import React from 'react';
import { connect } from "react-redux";
import { serverUrl } from "../../../../secret.js";
import { showScreen } from "../../../redux/actions";
import { ADD_SICK_LEAVE } from "../../../redux/constants";
import SickLeavePresent from '../../utilsComponents/SickLeavePresent.jsx';

const mapStateToProps = state => {
  return {
       user: state.user,
      };
};

function mapDispatchToProps(dispatch) {
  return {
      showScreen: screen => dispatch(showScreen(screen))
  }
};

class ListSickLeavesScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userSickLeaves: null
        }
    }

  componentDidMount() {
    const requestUrl = serverUrl + `\\api\\users\\${this.props.user.id}\\sickLeaves`

    fetch(requestUrl)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        userSickLeaves: responseData
      })
    });
  }

  render() {

    let userSickLeavesComponents = null;
    if(this.state.userSickLeaves !== null) {
      userSickLeavesComponents = this.state.userSickLeaves.map(sickLeaveJson => <SickLeavePresent sickLeaveJson={sickLeaveJson} key={sickLeaveJson.id} />); 
    }

    return (
      <div>
        <div className="buttonGroup btn-group btn-group-lg" role="group" aria-label="...">
          <button onClick={() => this.props.showScreen(ADD_SICK_LEAVE)} className="btn btn-dark btn-lg">Add sick leave</button>
        </div>
        <div className="listEntityContainer">
            { userSickLeavesComponents }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSickLeavesScreen);