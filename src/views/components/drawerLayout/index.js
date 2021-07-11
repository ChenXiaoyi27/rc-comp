import './index.less';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { PauseOutlined } from '@ant-design/icons';

/**
 * props:
 *   renderDrawer: 左侧抽屉内容
 */
class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,//展开左侧
            menuHeight: 'auto'//菜单高度
        }
        this.onResize = this.onResize.bind(this);
    }
    componentDidMount() {
        this.onResize();
        this.addEvent(window, 'resize', this.onResize);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.visible !== nextProps.visible) {
            this.setState({ visible: nextProps.visible }, () => this.fireEvent('resize'));
        }
    }
    componentWillUnmount() {
        this.removeEvent(window, 'resize', this.onResize);
    }
    onResize() {//修改窗口大小调整高度
        let menuHeight = document.body.clientHeight;
        this.setState({ menuHeight }, () => {
            this.props.eventHandler({ type: 'resize', data: menuHeight });
        });
    }
    onToggle() {//切换展开收起
        this.setState(prevState => ({ visible: !prevState.visible }), () => {
            //手动触发窗口resize事件，使echarts宽度自动调整
            this.fireEvent('resize');
        });
    }
    addEvent(target, eventType, handle) {//监听
        if (document.addEventListener) {
            return target.addEventListener(eventType, () => handle(), false);
        } else {
            return target.attachEvent('on' + eventType, () => handle());
        }
    }
    removeEvent(target, eventType, handle) {//移除监听
        if (document.addEventListener) {
            return target.removeEventListener(eventType, () => handle(), false);
        } else {
            return target.detachEvent('on' + eventType, () => handle());
        }
    }
    fireEvent(eventType) {//触发事件
        if (document.createEvent) {
            let event = document.createEvent('HTMLEvents');
            event.initEvent(eventType, true, true);
            window.dispatchEvent(event);
        } else if (document.createEventObject) {
            window.fireEvent('on' + eventType);
        }
    }
    render() {
        let { visible, menuHeight } = this.state;
        return (
            <div className="drawer-layout-view">
                <Row>
                    <Col span={visible ? '5' : '0'} className={visible ? 'block' : 'none'}>
                        <div className="drawer-left"  style={{ height: menuHeight }}>
                            {this.props.renderDrawer()}
                        </div>
                    </Col>
                    <Col span={visible ? '19' : '24'}>
                        <div className="drawer-right" style={{ height: menuHeight }}>
                            <div className="drawer-icon" onClick={() => this.onToggle()}>
                                <PauseOutlined title={visible ? '收起' : '展开'} />
                            </div>
                            {this.props.children}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Drawer;