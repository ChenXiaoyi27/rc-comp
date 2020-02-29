import React from 'react';
import PrintA4Table from '../components/printA4/printTable';

export default class PrintA4TableDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <div>
            <PrintA4Table />
        </div>
    }
}
export { PrintA4TableDemo };