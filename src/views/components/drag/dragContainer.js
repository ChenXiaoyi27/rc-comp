import React, { Component } from 'react';

class DragContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    onDragStart() {
        this.handleEvent({ type: 'dragStart', data: this.props.dataSource });
    }
    handleEvent(e) {
        this.props.eventHandler(e);
    }
    render() {
        return (
            <div
                className="drag-container"
                draggable="true"
                onDragStart={() => this.onDragStart()}
            >{this.props.children}</div>
        );
    }
}

export default DragContainer;