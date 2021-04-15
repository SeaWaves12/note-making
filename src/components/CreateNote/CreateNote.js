import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import classes from './CreateNote.module.css';

const createNote = (props) => {
    return (
        <div>
            <div className={classes.Date}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Select Date"
                        format="MM/dd/yyyy"
                        placeholder="MM/dd/yyyy"
                        value={props.selectedDate}
                        onChange={e => props.dateChangeHandler(e)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>

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