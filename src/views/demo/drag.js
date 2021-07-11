import React, { Component } from 'react';
import { DragContainer, DropContainer } from '../components/drag';

export default class DragDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dragData: {},
            content: ''
        }
    }
    eventHandler(e) {
        console.log('拖拽事件', e);
        if (e.type === 'dragStart') {
            this.setState({ dragData: e.data });
        } else if (e.type === 'drop') {
            console.log(this.state.dragData);
            this.setState({ content: this.state.dragData.value });
        }
    }
    render() {
        let { content } = this.state;
        return (
            <div>
                <DragContainer
                    dataSource={{ id: '111', value: '112' }}
                    eventHandler={e => this.eventHandler(e)}
                >
                    <div>可拖</div>
                </DragContainer>
                <DropContainer
                    dataSource={{ id: '222', value: '223' }}
                    eventHandler={e => this.eventHandler(e)}
                >
                    <div style={{ width: 200, height: 200, border: '1px solid #000' }}>
                        <p>可放：</p>
                        <div>{content}</div>
                    </div>
                </DropContainer>
            </div>
        );
    }
}

export { DragDemo };