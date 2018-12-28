import React from 'react'
import "../style.css"

const mapStateToProps = state => {
    return { user1: state.user1 };
};

export class MainScreen extends React.Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         user: props.user
    //
    //     }
    // }

    render() {
        return (
            <div className="mainScreen">
                <div className="header">
                    {/*Hello, {this.state.user.name}!*/}

                </div>
                <div className="contentContainer">
                    <div className="sidebar">
                        <div className="sidebarActivity">
                            jeden
                        </div>
                        <div className="sidebarActivity">
                            dwa
                        </div>
                        <div className="sidebarActivity">
                            trzy
                        </div>
                    </div>
                    <div className="operationContainer">
                    </div>
                </div>
            </div>
        );
    }
}