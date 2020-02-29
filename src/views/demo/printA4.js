import React from 'react';
import PrintA4 from '../components/printA4';

export default class PrintA4Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <div>
            <PrintA4 />
        </div>
    }
}
export { PrintA4Demo };