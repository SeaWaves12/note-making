import React from 'react';

import classes from './Create-Note.module.css';

const createNote = (props) => {

    return (
        <div>
            <div className={classes.Filter}>
                <select className={classes.Sort}
                    defaultValue=""
                    onChange={(e) => {
                        const value = e.target.value;
                        value === "new" ? props.newestSort() : props.oldestSort()
                    }
                    }
                >
                    <option value="" disabled hidden>Sort</option>
                    <option value="new">Newest</option>
                    <option value="old">Oldest</option>
                </select>
                <select defaultValue=""
                    onChange={(e) => {
                    e.target.value==="week"? props.weekFilter() : e.target.value==='month' ? props.monthFilter() : props.yearFilter()
                }} >
                    <option value="" disabled hidden>Filter</option>
                    <option value="week">Week wise</option>
                    <option value="month">Month wise</option>
                    <option value="year">Year wise</option>
                </select>
            </div>
            <div className={classes.CreateNote}>
                <form>
                    <input value={props.title} type='text' name='title' placeholder='Title' onChange={e => props.titleChangeHandler(e)}></input>
                    <p>
                        <textarea value={props.content} name='note' placeholder='Your Note Goes Here...' onChange={e => props.ContentChangeHandler(e)}>
                        </textarea>
                    </p>
                    <button onClick={(e) => props.addNoteHandler(e)}>+</button>
                </form>
            </div>
            </div>
            
        );
    }

export default createNote;