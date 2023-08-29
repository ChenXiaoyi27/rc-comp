import './index.less';
import React from 'react';
import { Row, Col, Button, Tooltip, Message, Table } from 'antd';
const WEEK = ['日', '一', '二', '三', '四', '五', '六'];

class MatterCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            now: new Date(),//现在的时间
            year: (new Date()).getFullYear(),//今年的年份
            month: (new Date()).getMonth(),//今天所在月份
            date: (new Date()).getDate(),//今天的日期
            data: [],//当年的日历事项内容
        };
        this.columns = [
            { title: '序号', dataIndex: 'index', width: 70, className: "txt-c", render: (text, record, index) => { return <span>{index + 1}</span> } },
            { title: '日期', dataIndex: 'date', width: 140, className: "txt-c", render: (text) => { return <span>{this.state.year}-{this.state.month + 1}-{text}</span> } },
            { title: '事项', dataIndex: 'detail', className: "txt-c" }
        ];
    }
    componentWillMount() {
        let { year, month } = this.state;
        this.searchMatters(year, month);
    }
    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
    }
    searchMatters(year, month) { // 查询是否有数据
        let flag = false;
        this.props.matters.map((item) => {
            if (item.year === year && item.month - 1 === month) {
                flag = true;
                this.setState({ year, month, data: item.matter });
            }
            return false;
        });
        if (!flag) {
            Message.info('超过查询范围，请重新选择！');
        }
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
        let { year, month } = this.state,
            current = month + num;
        if (current < 0) {
            year = year - 1;
            month = 11;
        } else if (current > 11) {
            year = year + 1;
            month = 0;
        } else {
            month = current;
        }
        this.searchMatters(year, month);
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
            return <tr key={line}>{this.renderDates(line, firstDay, dayCount)}</tr>
        })
    }
    renderDates(line, firstDay, dayCount) { // 渲染日期
        console.log('renderDates')
        let weekdays = [];
        for (let i = 0; i < 7; i++) {
            if (line === 0) {
                weekdays.push(i < firstDay ? '' : (i - firstDay + 1));
            } else {
                weekdays.push((line * 7 + i - firstDay + 1) > dayCount ? '' : (line * 7 + i - firstDay + 1));
            }
        }
        return weekdays.map((day, i) => {
            let { now, year, month, date, data } = this.state,
                today = (now.getFullYear() === year && now.getMonth() === month && day === date) ? '今天' : '',
                matter = '', title = '', back = '';
            data.map((v) => {
                if (v.date === (day).toString()) {
                    matter = `${month + 1}月${v.detail}`;
                }
                return false;
            });
            if (today && matter) {
                title = `${today}；${matter}`;
                back = 'back-hint';
            } else if (matter) {
                title = matter;
                back = 'back-matter';
            } else if (today) {
                title = today;
                back = 'back-today';
            }
            return !title ?
                <td className={`b1 p12`} key={i}>{day}</td> :
                <Tooltip title={<div style={{ maxWidth: '130px' }}>{title}</div>}><td className={`b1 p12 ${back}`} key={i}>{day}</td></Tooltip>
        });
    }
    render() {
        let { year, month, data } = this.state;
        return <div className="matterCalendar">
            <div className="calendar">
                <Row className="txt-c mb10">
                    <Col span={6}><Button type="ghost" onClick={() => this.changeMonth(-1)}>上个月</Button></Col>
                    <Col span={12} className="title">{year}年{month + 1}月</Col>
                    <Col span={6}><Button type="ghost" onClick={() => this.changeMonth(1)}>下个月</Button></Col>
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
            <Table columns={this.columns} dataSource={data} pagination={false} bordered size="small" />
        </div>
    }
}
export default MatterCalendar;