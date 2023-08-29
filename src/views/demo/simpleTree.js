import React from 'react';
import { Row, Col, Menu, Tree } from 'antd';
import SimpleTree from '../components/simple-tree/index';
const { SubMenu } = Menu;
const { TreeNode } = Tree;

export default class SimpleTreeDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.data = [
            {
                dm: '001', mc: '001', children: [
                    { dm: '00101', mc: '00101' },
                    {
                        dm: '00102', mc: '00102', children: [
                            { dm: '0010201', mc: '0010201' }
                        ]
                    }
                ]
            },
            { dm: '002', mc: '002' },
            {
                dm: '003', mc: '003', children: [
                    { dm: '00301', mc: '00301' },
                    {
                        dm: '00302', mc: '00302', children: [
                            { dm: '0030201', mc: '0030201' }
                        ]
                    }
                ]
            }
        ];
    }
    onSelect(item) {
        console.log('选中', item)
    }
    createMenu(subMenu) {
        return (
            subMenu.map((v, i) => {
                if (v.children && v.children.length > 0) {
                    return <SubMenu key={v.dm} title={v.mc}>
                        {this.createMenu(v.children)}
                    </SubMenu>
                } else {
                    return <Menu.Item key={v.dm}>{v.mc}</Menu.Item>
                }
            })
        )
    }
    createTreeNode(subMenu) {
        return (
            subMenu.map((v, i) => {
                if (v.children && v.children.length > 0) {
                    return <TreeNode title={v.mc} key={v.dm}>{this.createTreeNode(v.children)}</TreeNode>
                } else {
                    return <TreeNode title={v.mc} key={v.dm} />
                }
            })
        )
    }
    render() {
        return <div>
            <Row>
                <Col span="8">
                    <h6>SimpleTree</h6>
                    <SimpleTree data={this.data} itemProp={{ key: 'dm', value: 'mc' }}
                        onSelect={(item) => this.onSelect(item)} />
                </Col>
                <Col span="8">
                    <h6>Tree</h6>
                    <Tree defaultExpandAll={true}>
                        {this.createTreeNode(this.data)}
                    </Tree>
                </Col>
                <Col span="8">
                    <h6>Menu</h6>
                    <Menu mode="inline" theme="dark" style={{ width: '200px' }}>
                        {this.createMenu(this.data)}
                    </Menu>
                </Col>
            </Row>
        </div>
    }
}
export { SimpleTreeDemo };