import React, { Component } from 'react';

class FilterDropdown extends Component {
    state = {
        DDL1: [],
        DDL2: [],
        selectedDDL: '',
    }

    componentDidMount() {
        this.setState({
            DDL1: [
                { name: 'Select Week', DDL2: ["Last week"] },
                { name: 'Select Month', DDL2: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] },
                { name: 'Select Year', DDL2: ['2022', '2021', '2020', '2019'] },
            ]
        })
    }

    selectChange(e) {
        this.setState({ selectedDDL: e.target.value });
        this.setState({ DDL2: this.state.DDL1.find(x => x.name === e.target.value).DDL2 })
    }

    render() {
        return (
            <div>
                <select
                    defaultValue=""
                    onChange={this.selectChange.bind(this)}
                >
                    <option
                        value=""
                        disabled
                        hidden
                    >-- Select Filter --</option>

                    {this.state.DDL1.map(x => {
                        return <option key={x.name}>{x.name}</option>
                    })}
                </select>
                <select
                    defaultValue=""
                    onChange={(e) => {
                        const value = e.target.value;
                        this.props.filterHanlder(value);
                    }}
                >
                    <option value="" hidden disabled>-------</option>
                    {
                        this.state.DDL2.map(x => {
                            return <option key={x}>{x}</option>
                        })
                    }
                </select>
            </div>

        );
    }
}

export default FilterDropdown;