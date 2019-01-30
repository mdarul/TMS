import React from 'react';
import { connect } from "react-redux";
import { serverUrl } from "../../../../secret.js";
import VacationPresentImmutable from '../../utilsComponents/VacationPresentImmutable.jsx';

const mapStateToProps = state => {
  return {
       user: state.user,
      };
};

class TeamVacationsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        userVacations: null
    }
  }

  componentDidMount() {
    const requestUrl = serverUrl + `\\api\\users\\${this.props.user.id}\\vacations\\team`
    console.log(requestUrl);
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
      userVacationsComponents = this.state.userVacations.map(vacationJson => <VacationPresentImmutable vacationJson={vacationJson} key={vacationJson.id} />); 
    }

    return (
      <div className="listEntityContainer">
          { userVacationsComponents }
      </div>
    );
  }
}

export default connect(mapStateToProps)(TeamVacationsScreen);