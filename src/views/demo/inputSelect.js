import React from 'react';
import InputSelect from '../components/input-select';

export default class InputSelectDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '123'
        };
    }
    render() {
        let { value } = this.state;
        return <div style={{ marginLeft: '20px', marginTop: '20px' }}>
            <InputSelect value={value} onChange={(value) => this.setState({ value })}
                style={{ width: 200 }} />
            <p style={{ marginTop: 100 }}>表单项值为：{value}</p>
        </div>
    }
}
export { InputSelectDemo };