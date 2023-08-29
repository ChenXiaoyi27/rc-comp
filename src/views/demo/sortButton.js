import React, { Component } from 'react';
import SortButton from '../components/sortButton';

export default class SortButtonDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleToggle = (sort) => {
        console.log('排序方式为：' + sort)
    }
    render() {
        return (
            <div style={{ padding: '100px' }}>
                <SortButton onToggle={this.handleToggle} noCancel={false} />
            </div>
        );
    }
}

export { SortButtonDemo };