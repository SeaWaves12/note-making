import React from 'react';

import classes from './CreateNote.module.css';

const createNote = (props) => {
    return (
        <div>
            <div className={classes.CreateNote}>
                <form>
                    <input
                        value={props.title}
                        type='text'
                        name='title'
                        placeholder='Title'
                        onChange={e => props.titleChangeHandler(e)}
                    ></input>
                    <p>
                        <textarea
                            value={props.content}
                            name='note'
                            placeholder='Your Note Goes Here...'
                            onChange={e => props.ContentChangeHandler(e)}
                        ></textarea>
                    </p>
                    <button onClick={(e) => props.addNoteHandler(e)}>+</button>
                </form>
            </div>
        </div>
    );
}

export default createNote;