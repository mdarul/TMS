import React from "react"

class CommentPresentImmutable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            creationTime: props.commentJson.creationTime,
            content: props.commentJson.content,
            userId: props.commentJson.userId,
            userName: props.commentJson.userName,
            userSurname: props.commentJson.userSurname
        }
    }

    render() {
        return(
            <div className="commentEntity">
                {this.state.userName} {this.state.userSurname} ({this.state.userId}), {this.state.creationTime}
                <br />
                {this.state.content}
            </div>
        );
    }
}

export default CommentPresentImmutable;