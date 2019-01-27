import React from 'react';
import { connect } from "react-redux"
import { serverUrl } from "../../../../secret.js"
import { showScreen } from "../../../redux/actions"
import { ADD_VACATION } from '../../../redux/constants.js';
import VacationPresent from '../../utilsComponents/VacationPresent.jsx';

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
      <div>
        <div className="buttonGroup btn-group btn-group-lg" role="group" aria-label="...">
          <button onClick={() => this.props.showScreen(ADD_VACATION)} className="btn btn-dark btn-lg">Add worktime</button>
        </div>
        <div className="listEntityContainer">
            { userVacationsComponents }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListVacationsScreen);