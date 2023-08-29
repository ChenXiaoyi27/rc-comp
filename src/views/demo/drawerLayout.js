import React, { Component } from 'react';
import { Menu, Button } from 'antd';
import DrawerLayout from '../components/drawerLayout';

const SubMenu = Menu.SubMenu;

export default class DrawerLayoutDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }
    layoutEventHandler(e) {
        console.log('layout', e);
    }
    onToggle() {
        this.setState(prevState => ({ visible: !prevState.visible }));
    }
    renderDrawer() {
        return <Menu
            onClick={this.handleClick}
            openKeys={this.state.openKeys}
            onOpen={this.onToggle}
            onClose={this.onToggle}
            selectedKeys={[this.state.current]}
            mode="inline">
            <SubMenu key="sub1" title={<span>导航一</span>}>
                <Menu.Item key="1">选项1</Menu.Item>
                <Menu.Item key="2">选项2</Menu.Item>
                <Menu.Item key="3">选项3</Menu.Item>
                <Menu.Item key="4">选项4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span>导航二</span>}>
                <Menu.Item key="5">选项5</Menu.Item>
                <Menu.Item key="6">选项6</Menu.Item>
                <SubMenu key="sub3" title="三级导航">
                    <Menu.Item key="7">选项7</Menu.Item>
                    <Menu.Item key="8">选项8</Menu.Item>
                </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title={<span>导航三</span>}>
                <Menu.Item key="9">选项9</Menu.Item>
                <Menu.Item key="10">选项10</Menu.Item>
                <Menu.Item key="11">选项11</Menu.Item>
                <Menu.Item key="12">选项12</Menu.Item>
            </SubMenu>
        </Menu>;
    }
    render() {
        let { visible } = this.state;
        return (
            <div>
                <DrawerLayout
                    visible={visible}
                    eventHandler={(e) => this.layoutEventHandler(e)}
                    renderDrawer={() => this.renderDrawer()}
                >
                    <div style={{ height: 2000, padding: 20 }}>
                        <p>主要内容</p>
                        <Button type="primary" onClick={() => this.onToggle()}>点击切换左侧显示隐藏</Button>
                    </div>
                </DrawerLayout>
            </div>
        );
    }
}

export { DrawerLayoutDemo };