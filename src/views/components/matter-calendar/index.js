import './index.less';
import React from 'react';
import { Row, Col, Button, Tooltip, Message } from 'antd';
const WEEK = ['日', '一', '二', '三', '四', '五', '六'];

export default class MatterCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lines: 6,//日历有几行，默认最多6行
            now: new Date(),//现在的时间
            current: (new Date()).getMonth(),//初始化月份为今天所在月份
            month: (new Date()).getMonth(),//今天所在月份
            year: (new Date()).getFullYear(),//今年的年份
            date: (new Date()).getDate(),//今天的日期
        };
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
    changeMonth(num) { // 上个月/下个月按钮点击事件：-1为上个月，1为下个月
        let current = this.state.current + num;
        if (current < 0 || current > this.props.matters.length - 1) {
            Message.info('超过查询范围，请重新选择！');
        } else {
            this.setState({ current });
        }
    }
    renderLines() { // 渲染每一行
        let arr = [],
            { year, current } = this.state,
            firstDay = (new Date(year, current, 1)).getDay(),//某个月第一天在周几
            dayCount = this.getMonthDays(year, current),//某个月有几天
            lines = Math.ceil((firstDay + dayCount) / 7);//日历有几行
        for (let i = 0; i < lines; i++) {
            arr.push(i);
        }
        return arr.map((line) => {
            return <tr key={line}>{this.renderDates(line, firstDay, dayCount)}</tr>
        })
    }
    renderDates(line, firstDay, dayCount) { // 渲染日期
        let weekdays = [],
            { current, month, date } = this.state;
        for (let i = 0; i < 7; i++) {
            if (line === 0) {
                weekdays.push(i < firstDay ? '' : (i - firstDay + 1));
            } else {
                weekdays.push((line * 7 + i - firstDay + 1) > dayCount ? '' : (line * 7 + i - firstDay + 1));
            }
        }
        return weekdays.map((day, i) => {
            let today = (current === month && day === date) ? '今天' : '',
                title = '', back = '';
            if (today) {
                title = today;
                back = 'back-today';
            }
            return !title ?
                <td className={`b1 p12`} key={i}>{day}</td> :
                <Tooltip title={<div style={{ maxWidth: '130px' }}>{title}</div>}><td className={`b1 p12 ${back}`} key={i}>{day}</td></Tooltip>
        });
    }
    render() {
        let { year, current } = this.state;
        return <div className="matterCalendar">
            <div className="matter-calendar">
                <Row className="txt-c mb10">
                    <Col span="6"><Button type="ghost" onClick={() => this.changeMonth(-1)}>上个月</Button></Col>
                    <Col span="12" className="title">{year}年{current + 1}月</Col>
                    <Col span="6"><Button type="ghost" onClick={() => this.changeMonth(1)}>下个月</Button></Col>
                </Row>
                <table className="txt-c mb20">
                    <thead>
                        <tr className="back-thead">
                            {WEEK.map((v, i) => {
                                return <td className="b1 p12" key={i}>{v}</td>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderLines()}
                    </tbody>
                </table>
            </div>
        </div>
    }
}
export { MatterCalendar };