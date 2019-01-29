import React from 'react';
import { connect } from "react-redux"
import { serverUrl } from "../../../../secret.js"
import { showScreen } from "../../../redux/actions"
import WorktimePresent from "../../utilsComponents/WorktimePresent.jsx"
import { ADD_WORKTIME, SUBORDINATES_WORKTIMES } from "../../../redux/constants";

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
      <div>
        <div className="buttonGroup btn-group btn-group-lg" role="group" aria-label="...">
          <button onClick={() => this.props.showScreen(ADD_WORKTIME)} className="btn btn-dark btn-lg">Add worktime</button>
          <button onClick={() => this.props.showScreen(SUBORDINATES_WORKTIMES)} className="btn btn-dark btn-lg">Show subordinates worktimes</button>
        </div>
        
        <div className="listEntityContainer">
          { worktimesComponents }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListWorktimes);