import React from 'react';

import classes from './Header.module.css';
import SearchBar from "material-ui-search-bar";

const header = (props) => {
    return (
        <div className={classes.Header}>
            <div><h3>Note Making</h3></div>
            <div>
                <SearchBar
                    value={props.value}
                    onChange={(e) => props.onChangeSearchHandler(e)}
                    onRequestSearch={() => props.searchHandler()}
                    onCancelSearch={(e)=>props.cancelSearchHandler(e)}
                />
            </div>
        </div>
    );
}

export default header;