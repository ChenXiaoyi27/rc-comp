import React from 'react';
import { Modal, Button } from 'antd';
import TreeSelect from '../components/tree-select';

export default class TreeSelectDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
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
            ],
            visible: false,
            msg: ''
        };
    }
    componentWillMount() {
    }
    onTreeSelect(item) {//单选
        console.log('单选', item);
    }
    onTreeChecked(keys, rows) {//多选
        console.log('多选', keys, rows);
    }
    onCancel() {
        this.setState({ visible: false });
        this.refs.ieTree.clearData();
    }
    render() {
        let { visible, data } = this.state;
        return <div>
            <Button onClick={() => this.setState({ visible: true })}>打开</Button>
            <Modal visible={visible} footer={null} title=""
                onCancel={() => this.onCancel()}
            >
                <Button onClick={() => this.setState({ msg: '111' })}>修改state</Button>
                <TreeSelect tree={data} itemProp={{ key: 'dm', value: 'mc' }}
                    multiple ref="ieTree"
                    onSelect={(item) => this.onTreeSelect(item)}
                    onCheck={(keys, rows) => this.onTreeChecked(keys, rows)}
                />
            </Modal>
        </div>
    }
}
export { TreeSelectDemo };