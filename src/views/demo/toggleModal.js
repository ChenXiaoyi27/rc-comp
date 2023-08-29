import React, { Component } from 'react';
import { Button } from 'antd';
import ToggleModal from '../components/toggle-modal';

export class ToggleModalDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    openModal() {//打开弹窗
        this.setState({ visible: true });
    }
    render() {
        let { visible } = this.state;
        return (
            <div>
                <Button className="mg10" onClick={() => this.openModal()}>点击打开弹窗</Button>
                <ToggleModal
                    onCancel={() => this.setState({ visible: false })}
                    title='我是自定义标题'
                    visible={visible}
                >
                    <a href="/">弹窗内容</a>
                </ToggleModal>
            </div>
        );
    }
}

export default ToggleModalDemo;