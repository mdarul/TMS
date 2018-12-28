import React from 'react'
import "../style.css"

export class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user
        }
    }

    render() {
        return (
            <div>
                mainscreen
            </div>
        );
    }
}