import React from 'react';

const Task = (props) =>
    <div>
        {props.taskJson.id}, {props.taskJson.title}
        <br />
        user: {props.taskJson.userId}
        <br />
        stage: {props.taskJson.stage}
        {props.taskJson.content}
        <br />
        <br />
    </div>


export default Task;