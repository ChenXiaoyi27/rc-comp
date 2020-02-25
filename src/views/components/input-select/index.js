import './index.less';
import React from 'react';

export default class InputSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.list = [
            { key: '1', value: 'cat' },
            { key: '2', value: 'dog' },
            { key: '3', value: 'monkey' }
        ];
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }
    selectChange(e) {//select的change事件
        let value = e.target.value, item = null;
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].key === value) {
                item = this.list[i];
                break;
            }
        }
        this.setState({ value: item.value });
        this.props.onChange(item.value);
    }
    inputChange(e) {//input的change事件
        let value = e.target.value;
        this.setState({ value });
        this.props.onChange(value);
    }
    render() {
        return <div className="inputSelect" style={{ width: this.props.style.width || '100%' }}>
            <select className="is is-select" onChange={(e) => this.selectChange(e)}>
                {this.list.map((item) => <option key={item.key} value={item.key}>{item.value}</option>)}
            </select>
            <input value={this.state.value} onChange={(e) => this.inputChange(e)}
                className="is is-input" style={{ width: this.props.style.width - 20 }} />
        </div>
    }
}