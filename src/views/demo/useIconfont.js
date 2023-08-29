import React from 'react';
import { Icon } from 'antd';

export default class UseIconfont extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_1616645_d4p1mrqf4jr.js',
        });
        return <div className="pd20" style={{ fontSize: '24px' }}>
            <IconFont type="iconflower" />
        </div>
    }
}
export { UseIconfont };