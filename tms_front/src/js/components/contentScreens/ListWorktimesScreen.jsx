import React from 'react';
import { connect } from "react-redux"
import { serverUrl } from "../../../secret.js"
import WorktimePresent from "../utilsComponents/WorktimePresent.jsx"

const mapStateToProps = state => {
  return {
       user: state.user,
      };
};

class ListWorktimes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userWorktimes: null
    };
  }

  componentDidMount() {
    const requestUrl = serverUrl + `\\api\\users\\${this.props.user.id}\\worktimes`

    fetch(requestUrl)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        userWorktimes: responseData
      })
    });
  }

  render() {

    let worktimesComponents = null;
    if(this.state.userWorktimes !== null) {
      worktimesComponents = this.state.userWorktimes.map(worktimeJson => <WorktimePresent worktimeJson={worktimeJson} key={worktimeJson.id} />); 
    }

    return (
      <div className="listEntityContainer">
          {worktimesComponents}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ListWorktimes);