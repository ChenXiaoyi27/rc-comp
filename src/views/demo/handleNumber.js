import React, { Component } from 'react';
import { InputNumber } from 'antd';
import { toThousands, toFixed, toPercentage } from '../util/handleNumber';

export default class HandleNumberDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value1: 0,
            value2: 0,
            value3: 0
        };
    }
    render() {
        return (
            <div>
                <p>1. 数字或数字字符串转为每3位增加逗号的字符串toThousands：</p>
                <InputNumber
                    value={this.state.value1}
                    onChange={v => this.setState({ value1: v })}
                    style={{ width: 200 }}
                /><span> => {toThousands(this.state.value1)}</span>
                <p>2. 小数保留位数，四舍五入toFixed（示例保留2位小数）：</p>
                <InputNumber
                    value={this.state.value2}
                    onChange={v => this.setState({ value2: v })}
                    style={{ width: 200 }}
                /><span> => {toFixed(this.state.value2, 2)}</span>
                <p>3. 转换为百分数toPercentage（示例保留0位小数，默认保留2位小数）：</p>
                <InputNumber
                    value={this.state.value3}
                    onChange={v => this.setState({ value3: v })}
                    style={{ width: 200 }}
                /><span> => {toPercentage(this.state.value3, 0)}</span>
            </div>
        );
    }
}

export { HandleNumberDemo };