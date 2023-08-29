import React, { Component } from 'react';
import { Button } from 'antd';
import { addEvent, fireEvent, removeEvent } from '../util/handleEvents';

function aaa() {
    alert('触发了resize事件')
}

export default class HandleEventsDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        };
        this.handle = this.handle.bind(this);
    }
    componentDidMount() {
        console.log('监听resize事件');
        addEvent(window, 'resize', this.handle);
    }
    handle() {
        this.setState({ num: ++this.state.num });
        alert('触发了resize事件');
    }
    // 点击触发resize事件
    clickFire() {
        fireEvent('resize');
    }
    // 点击移除resize事件监听
    clickRemove() {
        removeEvent(window, 'resize', this.handle);
        alert('移除了，不信你点第一个按钮再触发试试');
    }
    render() {
        return (
            <div>
                <p>改变可视区大小，触发componentDidMount时监听的resize事件。</p>
                <Button onClick={() => this.clickFire()}>点击调用fireEvent触发resize事件</Button>
                <Button onClick={() => this.clickRemove()}>点击移除resize的监听事件{this.state.num}</Button>
            </div>
        );
    }
}

export { HandleEventsDemo };