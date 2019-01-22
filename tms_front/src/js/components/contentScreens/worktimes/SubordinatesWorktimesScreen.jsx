import React from 'react';
import { connect } from 'react-redux';
import {serverUrl} from "../../../../secret.js"
import WorktimePresent from "../../utilsComponents/WorktimePresent.jsx"

const mapStateToProps = state => {
  return {
       user: state.user,
      };
};

class SubordinatesWorktimesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workTimes: null
    }
  }

  componentDidMount() {
    const requestUrl = serverUrl + `\\api\\users\\${this.props.user.id}\\workTimes\\subordinates\\`;
    console.log(requestUrl);
    fetch(requestUrl)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        this.setState({
          workTimes: responseData
        });
      });
  }

  render() {
    let workTimesComponents = null;
    if(this.state.workTimes !== null) {
      workTimesComponents = this.state.workTimes.map(worktimeJson => <WorktimePresent worktimeJson={worktimeJson} key={worktimeJson.id} />); 
    }

    return (
      <div className="listEntityContainer">
        { workTimesComponents }
      </div>
    );
  }
}

export default connect(mapStateToProps)(SubordinatesWorktimesScreen);