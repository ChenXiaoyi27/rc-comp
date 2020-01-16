import React from 'react';
import { Row, Col, Card } from 'antd';

export default class Hello extends React.Component {
    render() {
        return <div style={{ padding: '20px' }}>
            <h1 className="txt-c mtb20">Hello,Components</h1>
            <Row>
                <Col span="3">
                    <Card size="small" title="简单树-SimpleTree" extra={<a href="#/simpletree">查看Demo</a>} style={{ width: 300 }}>
                        <p>用div写的可展开收缩的树形结构，解决ie8下使用antd Tree组件，数据量较大情况下卡顿、崩溃的问题。</p>
                    </Card>
                </Col>
            </Row>
        </div>
    }
}
export { Hello };