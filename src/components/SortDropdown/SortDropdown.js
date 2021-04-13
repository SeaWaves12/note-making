import React from 'react';

const sortDropdown = (props) => {
    return (
        <div style={{ marginRight: '40px' }}>
            <select
                defaultValue=""
                onChange={(e) => {
                    const value = e.target.value;
                    value === "new" ? props.newestSort() : props.oldestSort()
                }}
            >
                <option
                    value=""
                    disabled
                    hidden
                >Sort</option>
                <option
                    value="new"
                >Newest</option>
                <option
                    value="old"
                >Oldest</option>
            </select>
        </div>
    );
}
export default sortDropdown;