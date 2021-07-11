import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { date2CN, getYesterday, isLeapYear, isLessThanOneYear } from '../util/handleDate';

const { RangePicker } = DatePicker;

export default class HandleDateDemo extends React.Component {
    constructor(props) {
        super(props);
        this.now = moment();
        this.nowStr = this.now.format('YYYY-MM-DD');
        this.state = {
            date: this.now,
            dateCNStr: '',
            range: [this.now, this.now]
        };
    }
    render() {
        let { date, dateCNStr, range } = this.state;
        return <div className="pd20">
            <DatePicker
                value={date}
                onChange={(d, str) => this.setState({ date: d, dateCNStr: date2CN(str) })}
                allowClear={false}
            />
            <p>1. 日期字符串转中文日期：{dateCNStr}</p>
            <p>2. 获取昨天Date对象：{getYesterday().toString()}</p>
            <p>3. {date.year()}年是否为闰年：{isLeapYear(date.year()) ? '是' : '否'}</p>
            <p>4. 判断是否不超过一年: {isLessThanOneYear(range.map((d) => d.format('YYYY-MM-DD'))) ? '是' : '否'}</p>
            <RangePicker value={range} onChange={(ds) => this.setState({ range: ds })} />
        </div>
    }
}
export { HandleDateDemo };