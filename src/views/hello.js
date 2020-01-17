import './hello.less';
import React from 'react';
import { Row, Col, Card } from 'antd';

export default class Hello extends React.Component {
    render() {
        return <div className="helloComp">
            <h1 className="txt-c mtb20">Hello,Components</h1>
            <h5>组件</h5><hr />
            <Row>
                <Col span={8}>
                    <Card size="small" title="简单树-SimpleTree" extra={<a href="#/simpletree">查看Demo</a>} className="card">
                        <p>用div写的可展开收缩的树形结构，解决ie8下使用antd Tree组件，数据量较大情况下卡顿、崩溃的问题。</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size="small" title="事项日历-MatterCalendar" extra={<a href="#/matterCalendar">查看Demo</a>} className="card">
                        <p>手写日历，可标记事项。</p>
                    </Card>
                </Col>
            </Row>
            <h5 className="mt20">工具</h5><hr />
            <Row>
                <Col span={8}>
                    <Card size="small" title="日期转中文-date2CN" extra={<a href="#/date2CN">查看Demo</a>} className="card">
                        <p>工具类date2CN.js，提供一个方法，用于将8位日期字符串转成中文。</p>
                    </Card>
                </Col>
            </Row>
            <h5 className="mt20">其他</h5><hr />
            <Row>
                <Col span={8}>
                    <Card size="small" title="antd中使用iconfont" extra={<a href="#/useIconfont">查看Demo</a>} className="card">
                        <p>antd Icon使用iconfont中项目图标的demo。</p>
                    </Card>
                </Col>
            </Row>
        </div>
    }
}
export { Hello };