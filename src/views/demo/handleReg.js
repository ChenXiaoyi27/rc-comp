import React, { Component } from 'react';
import { Input } from 'antd';
import { checkSpecial, calcStrLength } from '../util/handleReg';

export default class HandleRegDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value1: '',
            value2: ''
        };
    }
    render() {
        return (
            <div>
                <p>1. 检查是否有特殊字符checkSpecial：</p>
                <p>（“、”、“-”、空格、书名号、中英文逗号、中英文括号不计入特殊字符）</p>
                <Input
                    value={this.state.value1}
                    onChange={e => this.setState({ value1: e.target.value })}
                    style={{ width: 300 }}
                /> => {checkSpecial(this.state.value1) ? '有' : '无'}特殊字符
                <p>2. 计算字符串长度calcStrLength（一个中文字符按3个字符计算）：</p>
                <Input
                    value={this.state.value2}
                    onChange={e => this.setState({ value2: e.target.value })}
                    style={{ width: 300 }}
                /> => 长度为：{calcStrLength(this.state.value2)}
            </div>
        );
    }
}

export { HandleRegDemo };