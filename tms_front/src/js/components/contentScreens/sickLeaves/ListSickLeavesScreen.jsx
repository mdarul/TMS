import React from 'react';
import { connect } from "react-redux"
import { serverUrl } from "../../../../secret.js"
import SickLeavePresent from '../../utilsComponents/SickLeavePresent.jsx';

const mapStateToProps = state => {
  return {
       user: state.user,
      };
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
      <div className="listEntityContainer">
          { userSickLeavesComponents }
      </div>
    );
  }
}

export default connect(mapStateToProps)(ListSickLeavesScreen);