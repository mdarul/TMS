import React from 'react';
import { connect } from "react-redux"
import { serverUrl } from "../../../secret.js"
import VacationPresent from '../utilsComponents/VacationPresent.jsx';

const mapStateToProps = state => {
  return {
       user: state.user,
      };
};

class ListVacationsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userVacations: null
        }
    }

  componentDidMount() {
    const requestUrl = serverUrl + `\\api\\users\\${this.props.user.id}\\vacations`

    fetch(requestUrl)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        userVacations: responseData
      })
    });
  }

  render() {

    let userVacationsComponents = null;
    if(this.state.userVacations !== null) {
      userVacationsComponents = this.state.userVacations.map(vacationJson => <VacationPresent vacationJson={vacationJson} key={vacationJson.id} />); 
    }

    return (
      <div className="listEntityContainer">
          { userVacationsComponents }
      </div>
    );
  }
}

export default connect(mapStateToProps)(ListVacationsScreen);