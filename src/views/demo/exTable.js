import React from 'react';
import ExTable from '../components/exTable';

export default class ExTableDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            dataSource: [
                { xm: '小明', xh: '001', Chinese: '100', maths: '90', English: '96' },
                { xm: '小红', xh: '002', Chinese: '99', maths: '92', English: '95' },
                { xm: '张三', xh: '003', Chinese: '100', maths: '90', English: '96' },
                { xm: '李四', xh: '004', Chinese: '99', maths: '92', English: '95' }
            ],
            selectedRowKeys: [],
            pagination: {
                current: 1, total: 0, pageSize: 2,
                onChange: (current) => this.changePage(current)
            }
        };
        this.columns = [
            { title: '姓名', dataIndex: 'xm', className: 'txt-c' },
            { title: '学号', dataIndex: 'xh', className: 'txt-c' },
            {
                title: '成绩', dataIndex: 'cj', children: [
                    { title: '语文', dataIndex: 'Chinese', className: 'txt-c' },
                    { title: '数学', dataIndex: 'maths', className: 'txt-c' },
                    { title: '英语', dataIndex: 'English', className: 'txt-c' }
                ]
            }
        ];
    }
    componentWillMount() {
        this.changePage(1);
    }
    changePage(current) {//翻页
        let { pagination, dataSource } = this.state, { pageSize } = pagination, tableData = [];
        for (let i = ((current - 1) * pageSize); i < (current * pageSize > dataSource.length ? dataSource.length : current * pageSize); i++) {
            tableData.push(dataSource[i]);
        }
        this.setState({
            tableData,
            pagination: Object.assign({}, pagination, { current, total: dataSource.length })
        });
    }
    onRow(key, record) {//表格行操作
        console.log('row', key, record)
        this.setState({ selectedRowKeys: new Array(key) });
    }
    render() {
        let { tableData, selectedRowKeys, pagination } = this.state;
        const rowSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (keys) => {
                console.log('selectedRowKeys:', keys)
                this.setState({ selectedRowKeys: keys });
            }
        };
        return <div style={{ padding: 20 }}>
            <ExTable columns={this.columns} dataSource={tableData} rowKey={record => record.xh}
                rowSelection={rowSelection} onRow={(key, record) => this.onRow(key, record)}
                pagination={pagination} />
        </div>
    }
}
export { ExTableDemo };