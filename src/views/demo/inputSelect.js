import React from 'react';
import InputSelect from '../components/input-select';

export default class InputSelectDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <div>
            <InputSelect width={200} />
        </div>
    }
}
export { InputSelectDemo };