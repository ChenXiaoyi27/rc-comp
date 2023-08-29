import React, { Component } from 'react';

class DropContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    onDrop(e) {
        e.stopPropagation();
        this.props.eventHandler({ type: 'drop', data: this.props.dataSource });
    }
    onDragOver(e) {
        e.preventDefault();
    }
    render() {
        return (
            <div
                onDrop={(e) => this.onDrop(e)}
                onDragOver={(e) => this.onDragOver(e)}
                style={this.props.style}
            >{this.props.children}</div>
        );
    }
}

export default DropContainer;