import React from 'react';
import { connect } from 'react-redux';
import { serverUrl } from "../../../../secret.js";
import TaskPresentImmutable from "../../utilsComponents/TaskPresentImmutable.jsx";
import CommentPresentImmutable from "../../utilsComponents/CommentPresentImmutable.jsx";
import moment from 'moment';


const mapStateToProps = state => {
    return {
        user: state.user,
        selectedTask: state.selectedTaskForComments
    };
};

class TaskCommentsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            commentText: "",
            commentComponents: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.addCommentToList = this.addCommentToList.bind(this);
        this.parseComments = this.parseComments.bind(this);
        this.addNewComment = this.addNewComment.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        const requestUrl = serverUrl + `\\api\\tasks\\${this.props.selectedTask.id}\\comments`

        fetch(requestUrl)
        .then(response => response.json())
        .then(responseData => {
            this.parseComments(responseData)
        });
    }

    parseComments(responseData) {
        for(var i in responseData){
            this.addCommentToList(responseData[i]);
        }
    }

    addCommentToList(comment) {
        const Http = new XMLHttpRequest();
        const requestUrl = serverUrl + `\\api\\users\\${comment.userId}`;

        Http.open("GET", requestUrl);
        Http.send();

        Http.onreadystatechange = (e) => {
            if(Http.readyState === 4 && Http.status === 200) {
                const responseData = JSON.parse(Http.responseText);
                let commentJson = {
                    userName: responseData.name,
                    userSurname: responseData.surname,
                    userId: comment.userId,
                    creationTime: comment.creationTime,
                    content: comment.content
                };
                let commentComponent = <CommentPresentImmutable commentJson={commentJson} key={comment.id}/>;
                this.setState(prevState => ({
                    commentComponents: [...prevState.commentComponents, commentComponent]
                }))
            }
        };
    }

    addNewComment() {
        const Http = new XMLHttpRequest();
        const requestUrl = serverUrl + `\\api\\comments`;

        const comment = {
            creationTime: moment().format().slice(0, -6),
            content: this.state.commentText,
            userId: this.props.user.id,
            taskId: this.props.selectedTask.id
        };

        Http.open("POST", requestUrl);
        Http.setRequestHeader("Content-type", "application/json");
        Http.send(JSON.stringify(comment));

        Http.onreadystatechange = (e) => {
            if(Http.readyState === 4 && Http.status === 200) {
                this.addCommentToList(comment);
            }
        };
    }

    render() {
        return(
            <div>
                <TaskPresentImmutable taskJson={this.props.selectedTask} />
                <br />
                <div className="form-group">
                    <textarea 
                        className="form-control" 
                        rows="3"
                        name="commentText"
                        type="text"
                        value={this.state.commentText}
                        onChange={this.handleChange} />
                    <button type="button" className="btn btn-primary form-control" onClick={this.addNewComment}>Add comment</button>
                </div>
                { this.state.commentComponents }
            </div>
        );
    }
}

export default connect(mapStateToProps)(TaskCommentsScreen)