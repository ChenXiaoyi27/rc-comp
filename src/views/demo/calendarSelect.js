import React from 'react';
import CalendarSelect from '../components/calendar-select';

export default class CalendarSelectDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: ''
        };
    }
    render() {
        return <div>
            <CalendarSelect onSelect={(current) => this.setState({ current })} />
            <div className="txt-c">当前选中日期为：{this.state.current}</div>
        </div>
    }
}
export { CalendarSelectDemo };