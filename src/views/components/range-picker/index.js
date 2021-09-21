import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

/**
 * props:
 *   lineFeed {Boolean} 是否换行
 *   disableFuture {Boolean} 是否禁止今天之后的时间
 *   value {Array} 日期范围选择器的值
 *   onChange {Function} 值修改事件
 */
class RangePicker extends Component {
    constructor(props) {
        super(props);
        this.today = moment();
        this.state = {
            startValue: '',
            endValue: ''
        };
    }
    componentDidMount() {
        this.updateValue(this.props);
    }
    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
            this.props = nextProps;
            this.updateValue(nextProps);
        }
    }
    // 从外部更新值
    updateValue(props) {
        this.setState({
            startValue: props.value && props.value.length ? moment(props.value[0]) : this.today,
            endValue: props.value && props.value.length > 1 ? moment(props.value[1]) : this.today
        });
    }
    // 起始日期禁用范围
    disabledStartDate = (startValue) => {
        if (!startValue || !this.state.endValue) {
            return false;
        }
        if (this.props.disableFuture && (startValue.unix() > this.today.unix())) {
            return true;
        }
        return startValue.unix() > this.state.endValue.unix();
    }
    // 终止日期禁用范围
    disabledEndDate = (endValue) => {
        if (!endValue || !this.state.startValue) {
            return false;
        }
        if (this.props.disableFuture && (endValue.unix() > this.today.unix())) {
            return true;
        }
        return endValue.unix() < this.state.startValue.unix();
    }
    // 日期选择器onChange
    onChange(name, value) {
        // 处理日期清空，赋值
        if (!value) {
            if (name === 'startValue') {
                // 若起始日期清空，则赋值当前选择的终止日期
                value = this.state.endValue;
            } else {
                // 若终止日期清空，则赋值今天
                value = this.today;
            }
        }
        this.setState({ [name]: value }, () => {
            const { startValue, endValue } = this.state;
            this.props.onChange && this.props.onChange([startValue.format('YYYY-MM-DD'), endValue.format('YYYY-MM-DD')]);
        });
    }
    render() {
        const { startValue, endValue } = this.state;
        let datepickerStyle = { width: 120, display: 'inline-block', marginLeft: '8px' };
        return (
            <div>
                从
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    value={startValue}
                    placeholder="开始日期"
                    onChange={e => this.onChange('startValue', e)}
                    size="small"
                    style={{ ...datepickerStyle, marginBottom: '5px', marginRight: '8px' }}
                />
                {this.props.lineFeed && <br />}
                至
                <DatePicker
                    disabledDate={this.disabledEndDate}
                    value={endValue}
                    placeholder="结束日期"
                    onChange={e => this.onChange('endValue', e)}
                    size="small"
                    style={datepickerStyle}
                />
            </div>
        );
    }
}

export default RangePicker;