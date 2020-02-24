import './index.less';
import React from 'react';

export default class InputSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <div className="inputSelect" style={{ width: this.props.width || '100%' }}>
            <select className="is is-select">
                <option value="1">cat</option>
                <option value="2">dog</option>
                <option value="3">monkey</option>
            </select>
            <input className="is is-input" style={{ width: this.props.width - 20 }} />
        </div>
    }
}