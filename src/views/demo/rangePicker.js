import React, { Component } from 'react';
import RangePicker from '../components/range-picker';

class RangePickerDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    handleChange = (e) => {
        console.log('onChange', e);
    }
    render() {
        return (
            <div>
                <RangePicker
                    value={['2021-01-01', '2021-01-01']}
                    onChange={this.handleChange}
                    disableFuture={false}
                />
            </div>
        );
    }
}
export { RangePickerDemo };
export default RangePickerDemo;