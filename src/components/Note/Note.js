import classes from './Note.module.css';
import React from 'react';

const note = (props) => {
    return (
        <div className={classes.Note} >
            <h2>
                {props.title}
            </h2>
            <p>
                {props.content}
            </p>
            <small>
                Last Modified: {props.lastModified}
            </small>
            <button
                onClick={(e) => props.editHandler(e, props.id)}
                className={classes.Edit}
            >Edit</button>
            <button
                onClick={(e) => props.deleteHandler(props.id)}
                className={classes.Delete}
            >X</button>
        </div>
    );
}

export default note;