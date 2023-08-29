import React from 'react';
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
            ]
        };
    }
    onTreeSelect(item) {//单选
        console.log('单选', item);
    }
    onTreeChecked(keys, rows) {//多选
        console.log('多选', keys, rows);
    }
    render() {
        let { data } = this.state;
        return <div style={{ padding: 20 }}>
            <TreeSelect tree={data} itemProp={{ key: 'dm', value: 'mc' }}
                multiple ref="ieTree"
                onSelect={(item) => this.onTreeSelect(item)}
                onCheck={(keys, rows) => this.onTreeChecked(keys, rows)}
            />
        </div>
    }
}
export { TreeSelectDemo };