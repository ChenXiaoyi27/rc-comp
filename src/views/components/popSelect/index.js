import './index.less';
import React, { Component } from 'react';
import { Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';

/**
 * @desc 自定义内容下拉框，无外框
 * dataSet 选项列表，属性：value、label
 * dropdownRender 自定义JSX
 * labelRender 方法返回自定义显示内容
 * value 传入值
 * setVisible 方法控制显示隐藏，传参boolean
 * onChange 方法抛出选中值
 */
class PopSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
            visible: false
        };
        //允许空白处点击关闭弹出层，默认允许true
        this.maskClosable = props.maskClosable === undefined ? true : props.maskClosable;
    }
    componentDidMount() {
        // 默认选中列表第一项
        const { dataSet, itemProp } = this.props;
        this.setState({ value: dataSet.length ? dataSet[0][itemProp.value] : '' });
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
            this.setState({ value: nextProps.value });
        }
        // 默认选中列表第一项
        if (JSON.stringify(this.props.dataSet) !== JSON.stringify(nextProps.dataSet)) {
            this.setState({ value: nextProps.dataSet.length ? nextProps.dataSet[0][nextProps.itemProp.value] : '' });
        }
    }
    // 显示/隐藏弹出层
    setVisible(visible) {
        this.setState({ visible });
    }
    // 选择固定项
    selectFix(data) {
        let { value } = this.state;
        let { onChange, itemProp } = this.props;
        let dataValue = data[itemProp.value];
        if (value === dataValue) {
            return;
        }
        this.setState({ value: dataValue, visible: false });
        onChange && onChange(dataValue);
    }
    // 渲染展示内容
    renderLabel() {
        let { value } = this.state;
        let { dataSet, itemProp } = this.props;
        for (let item of dataSet) {
            if (item[itemProp.value] === value) {
                return <span>{item[itemProp.label]}</span>
            }
        }
        // 固定项中没有值时展示父组件传入内容
        if (this.props.labelRender) {
            return this.props.labelRender();
        }
        return '';
    }
    render() {
        let { value, visible } = this.state;
        let { dataSet, dropdownRender, itemProp } = this.props;
        const overlay = (
            <div className="pop-select-view">
                <ul>
                    {(dataSet || []).map(v => (
                        <li
                            key={v[itemProp.value]}
                            onClick={() => this.selectFix(v)}
                            className={value === v[itemProp.value] ? 'li-disable' : ''}
                        >{v[itemProp.label]}</li>
                    ))}
                </ul>
                {dropdownRender}
            </div>
        );
        return (
            <Popover
                content={overlay}
                trigger="click"
                visible={visible}
                onVisibleChange={e => this.maskClosable && this.setState({ visible: e })}
            >
                <span
                    onClick={() => this.setState({ visible: true })}
                    className={`pop-select-btn ${this.props.className || ''}`}
                    style={this.props.style || {}}
                >
                    {this.renderLabel()}
                    <DownOutlined />
                </span>
            </Popover>
        );
    }
}

export default PopSelect;