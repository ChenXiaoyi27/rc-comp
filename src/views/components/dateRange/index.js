import './index.less';
import React, { Component } from 'react';
import { DatePicker, Button } from 'antd';
import PopSelect from '../popSelect';
import Divider from '../divider';
import RangePicker from '../range-picker';
import moment from 'moment';

const dateTypeList = [
    { value: 'all', label: '时间不限' },
    { value: 'day', label: '一天内' },
    { value: 'week', label: '一周内' },
    { value: 'month', label: '一月内' },
    { value: 'year', label: '一年内' }
];
const DATE_FORMAT_STR = 'YYYY-MM-DD';
class DateRange extends Component {
    constructor(props) {
        super(props);
        this.today = moment();
        this.state = {
            value: 'all',
            confirmRange: [],//确定的日期范围
            startValue: this.today,
            endValue: this.today
        };
    }
    // 选择自定义，点击确定
    selectCustom() {
        let { startValue, endValue } = this.state;
        let { onChange } = this.props;
        this.popSelectRef.setVisible(false);
        let confirmRange = [startValue.format(DATE_FORMAT_STR), endValue.format(DATE_FORMAT_STR)];
        this.setState({ value: 'range', confirmRange });
        onChange && onChange(confirmRange);
    }
    // 处理选中项
    handleChange(val) {
        let range = [];
        let { onChange } = this.props;
        this.setState({ value: val });
        switch (val) {
            case 'all':
                range = [];
                break;
            case 'day':
                range = [moment(), moment()];
                break;
            case 'week':
                range = [
                    moment().subtract(7, 'days'), //7天前
                    moment()
                ];
                break;
            case 'month':
                range = [
                    moment().subtract(1, 'months'),//上月今天，moment处理无效日期
                    moment()
                ];
                break;
            case 'year':
                range = [
                    moment().subtract(1, 'years'),//去年今天，moment处理无效日期
                    moment()
                ];
                break;
        }
        onChange && onChange(range.map(v => v = v.format(DATE_FORMAT_STR)));
    }
    // 渲染展示内容
    renderLabel() {
        let { confirmRange } = this.state;
        return <span>自定义{confirmRange[0]}至{confirmRange[1]}</span>
    }
    render() {
        let { value, startValue, endValue } = this.state;
        const overlay = (
            <div className="date-range-view">
                <Divider />
                <p className="sub-title">自定义</p>
                <RangePicker
                    lineFeed
                    disableFuture
                    value={[startValue.format(DATE_FORMAT_STR), endValue.format(DATE_FORMAT_STR)]}
                    onChange={e => this.setState({ startValue: moment(e[0]), endValue: moment(e[1]) })}
                />
                <Button type="ghost" size="small" className="confirm-btn mr10" onClick={() => this.popSelectRef.setVisible(false)}>取消</Button>
                <Button type="primary" size="small" className="confirm-btn" onClick={() => this.selectCustom()}>确定</Button>
            </div>
        );
        return (
            <PopSelect
                value={value}
                dataSet={dateTypeList}
                maskClosable={false}//设置点击空白处不隐藏弹出层
                dropdownRender={overlay}//设置自定义内容
                itemProp={{ value: 'value', label: 'label' }}
                labelRender={() => this.renderLabel()}//设置选择自定义显示的选中内容
                onChange={(v) => this.handleChange(v)}//选中值修改事件
                ref={r => this.popSelectRef = r}
            />
        );
    }
}

export default DateRange;