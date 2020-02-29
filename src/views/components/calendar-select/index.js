import './index.less';
import React from 'react';
import { Row, Col, Select } from 'antd';
const Option = Select.Option;
const WEEK = ['日', '一', '二', '三', '四', '五', '六'];
const years = [2019, 2020, 2021, 2022, 2023];
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

class CalendarSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            now: new Date(),//现在的时间
            year: (new Date()).getFullYear(),//今年的年份
            month: (new Date()).getMonth(),//今天所在月份
            date: (new Date()).getDate(),//今天的日期
            current: ''//当前选中日期
        };
    }
    componentWillMount() {
        console.log(this.state.year, this.state.month)
    }
    getMonthDays(year, month) { // 获取某个月的天数
        if (month === 3 || month === 5 || month === 8 || month === 10) {
            return 30;
        } else if (month === 1) {
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {//闰年
                return 29;
            } else {
                return 28;
            }
        } else {
            return 31;
        }
    }
    renderLines() { // 渲染每一行
        let arr = [],
            { year, month } = this.state,
            firstDay = (new Date(year, month, 1)).getDay(),//某个月第一天在周几
            dayCount = this.getMonthDays(year, month),//某个月有几天
            lines = Math.ceil((firstDay + dayCount) / 7);//日历有几行
        for (let i = 0; i < lines; i++) {
            arr.push(i);
        }
        return arr.map((line) => {
            return <Row key={line}>{this.renderDates(line, firstDay, dayCount)}</Row>
        })
    }
    renderDates(line, firstDay, dayCount) { // 渲染日期
        let weekdays = [];
        for (let i = 0; i < 7; i++) {
            if (line === 0) {
                weekdays.push(i < firstDay ? '' : (i - firstDay + 1));
            } else {
                weekdays.push((line * 7 + i - firstDay + 1) > dayCount ? '' : (line * 7 + i - firstDay + 1));
            }
        }
        return weekdays.map((day, i) => {
            let { now, year, month, date, current } = this.state,
                today = (now.getFullYear() === year && now.getMonth() === month && day === date),
                back = today ? 'back-today' : '',
                isCurrent = current === `${year}-${this.state.month < 9 ? '0' + (this.state.month + 1) : this.state.month + 1}-${day < 10 ? '0' + day : day}`;
            return <Col span={3} className={`daybox ${back} ${day ? 'back-matter-h' : ''} ${isCurrent ? 'back-matter' : ''}`} key={i} onClick={() => this.onDateClick(day)}>{day}</Col>
        });
    }
    onDateClick(day) {//选中日期
        if (day) {
            let monthChange = this.state.month < 9 ? '0' + (this.state.month + 1) : this.state.month + 1,
                dayChange = day < 10 ? '0' + day : day,
                current = `${this.state.year}-${monthChange}-${dayChange}`;
            this.setState({ current });
            this.props.onSelect && this.props.onSelect(current);
        }
    }
    render() {
        let { year, month } = this.state;
        return <div className="calendarSelect">
            <div className="calendar">
                <Row>
                    <Col span={21}>
                        <div className="fr">
                            <Select value={year} size="small" onChange={(val) => this.setState({ year: val })} style={{ width: 90 }}>
                                {years.map((item) => <Option value={item} key={item}>{item}年</Option>)}
                            </Select>
                            <Select value={month} size="small" onChange={(val) => this.setState({ month: val })} style={{ width: 80, marginLeft: 10 }}>
                                {months.map((item) => <Option value={item} key={item}>{parseInt(item) + 1}月</Option>)}
                            </Select>
                        </div>
                    </Col>
                </Row>
                <p className="clear"></p>
                <div className="txt-c mb20">
                    <Row>
                        {WEEK.map((v, i) => {
                            return <Col span={3} className="daybox back-thead" key={i}>{v}</Col>
                        })}
                    </Row>
                    {this.renderLines()}
                </div>
            </div>
        </div>
    }
}
export default CalendarSelect;