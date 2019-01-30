import React from 'react';
import { connect } from "react-redux";
import { serverUrl } from "../../../../secret.js";
import SickLeavePresentImmutable from '../../utilsComponents/SickLeavePresentImmutable.jsx';

const mapStateToProps = state => {
  return {
       user: state.user,
      };
};

class TeamSickLeavesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        teamSickLeaves: null
    }
  }

  componentDidMount() {
    const requestUrl = serverUrl + `\\api\\users\\${this.props.user.id}\\sickLeaves\\team`
    fetch(requestUrl)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          teamSickLeaves: responseData
        })
      });
  }

  render() {
    let sickLeavesComponents = null;
    if(this.state.teamSickLeaves !== null) {
        sickLeavesComponents = this.state.teamSickLeaves.map(sickLeaveJson => <SickLeavePresentImmutable sickLeaveJson={sickLeaveJson} key={sickLeaveJson.id} />); 
    }

    return (
      <div className="listEntityContainer">
          { sickLeavesComponents }
      </div>
    );
  }
}

export default connect(mapStateToProps)(TeamSickLeavesScreen);