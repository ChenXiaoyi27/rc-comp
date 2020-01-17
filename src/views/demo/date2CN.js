import React from 'react';
import { DatePicker } from 'antd';
import date2CN from '../util/date2CN';

export default class Date2CN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            dateStr: '',
            dateCNStr: ''
        };
    }
    onChange = (date, dateStr) => {
        this.setState({ date, dateStr, dateCNStr: date2CN(dateStr) });
    }
    render() {
        let { date, dateCNStr } = this.state;
        return <div className="pd20">
            <DatePicker value={date} onChange={this.onChange} allowClear={false} />
            <h6 className="dis-ib ml20">{dateCNStr}</h6>
        </div>
    }
}
export { Date2CN };