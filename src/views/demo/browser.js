import React from 'react';
import Browser from '../util/browser';

export default class BrowserDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isIE: false,
            version: null
        };
    }
    componentWillMount() {
        let version = Browser.browserVersion(), str = '';
        for (let key in version) {
            str = str + key + version[key] + ' ';
        }
        this.setState({ isIE: Browser.isIE().toString(), version: str });
    }
    render() {
        let { isIE, version } = this.state;
        return <div className="pd20">
            <p>当前浏览器是否为IE：{isIE}</p>
            <p>当前浏览器版本信息：{version}</p>
        </div>
    }
}
export { BrowserDemo };