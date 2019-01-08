import React from 'react';

const TaskPresent = (props) =>
    <div>
        {props.taskJson.id}, {props.taskJson.title}
        <br />
        user: {props.taskJson.userId}
        <br />
        stage: {props.taskJson.stage}
        <br />
        {props.taskJson.content}
        <br />
        <br />
    </div>


export default TaskPresent;