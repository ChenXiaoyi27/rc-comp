import './index.less';
import React from 'react';
import { Row, Col, Card, Timeline } from 'antd';
import mockData from '../mock/hello.json';

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: [],
            utils: [],
            others: []
        };
    }
    componentWillMount() {
        mockData.map((item) => {
            this.state[item.type].push(item);
            return false;
        });
        this.setState({
            components: this.state.components,
            utils: this.state.utils,
            others: this.state.others
        });
    }
    render() {
        let { components, utils, others } = this.state;
        return <div className="helloComp">
            <h1 className="txt-c mtb20">Hello,Components</h1>
            <Row>
                <Col span={20}>
                    <h5>组件</h5><hr />
                    <Row>
                        {components.map((item) => <Col span={8} key={item.router}>
                            <Card size="small" title={item.title} extra={<a href={item.router}>查看Demo</a>} className="card">
                                <p>{item.intro}</p>
                            </Card>
                        </Col>)}
                    </Row>
                    <h5 className="mt20">工具</h5><hr />
                    <Row>
                        {utils.map((item) => <Col span={8} key={item.router}>
                            <Card size="small" title={item.title} extra={<a href={item.router}>查看Demo</a>} className="card">
                                <p>{item.intro}</p>
                            </Card>
                        </Col>)}
                    </Row>
                    <h5 className="mt20">其他</h5><hr />
                    <Row>
                        {others.map((item) => <Col span={8} key={item.router}>
                            <Card size="small" title={item.title} extra={<a href={item.router}>查看Demo</a>} className="card">
                                <p>{item.intro}</p>
                            </Card>
                        </Col>)}
                    </Row>
                </Col>
                <Col span={4}>
                    <div className="timeline">
                        <Timeline>
                            {Object.assign([], mockData).reverse().map((item) => {
                                return <Timeline.Item key={item.router}>
                                    <a href={item.router} className="ft-12">{item.title}</a><br />
                                    <span className="co-gray">添加于 {item.date}</span>
                                </Timeline.Item>
                            })}
                        </Timeline>
                    </div>
                </Col>
            </Row>
        </div>
    }
}
export { Hello };