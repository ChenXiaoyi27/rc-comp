import React, { Component } from 'react';
import DateRange from '../components/dateRange';

class DateRangeDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={{ padding: '100px' }}>
                <DateRange />
            </div>
        );
    }
}
export { DateRangeDemo };
export default DateRangeDemo;