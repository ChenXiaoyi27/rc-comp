import './index.less';
import React, { Component } from 'react';
import { Tooltip } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

/**
 * props:
 *   noCancel {Boolean} 没有取消排序
 *   onToggle {Function} 切换排序方式，抛出排序方式的key
 */
class SortBtn extends Component {
    constructor(props) {
        super(props);
        this.func = props.noCancel ? {
            'desc': '降序',
            'asc': '升序'
        } : {
            'none': '取消排序',
            'desc': '降序',
            'asc': '升序'
        };
        this.state = {
            current: Object.keys(this.func)[0]
        };
    }
    // 切换排序方式
    onToggle = () => {
        let value = this.getNext().value;
        this.setState({ current: value }, () => this.props.onToggle(value));
    }
    // 获取下一个排序方式的value、label
    getNext = () => {
        const { current } = this.state;
        const arr = Object.keys(this.func);
        let nextIndex = 0;
        const len = arr.length;
        let i = 0;
        for (; i < len; i++) {
            if (arr[i] === current) {
                nextIndex = i + 1;
                break;
            }
        }
        if (i + 1 > len - 1) {
            nextIndex = 0;
        }
        const value = arr[nextIndex];
        return {
            value,
            label: this.func[value]
        };
    }
    render() {
        const { current } = this.state;
        return (
            <Tooltip title={`点击${this.getNext().label}`} arrowPointAtCenter>
                <div className="sort-button" onClick={this.onToggle}>
                    <span className={`sort-button-up ${current === 'asc' ? 'active' : ''}`}><CaretUpOutlined /></span>
                    <span className={`sort-button-down ${current === 'desc' ? 'active' : ''}`}><CaretDownOutlined /></span>
                </div>
            </Tooltip>
        );
    }
}

export default SortBtn;