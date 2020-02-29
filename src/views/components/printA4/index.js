import './index.less';
import React from 'react';

export default class PrintA4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPrint: false//是否在打印中
        };
    }
    printBtn() {//打印按钮
        this.setState({ isPrint: true }, () => this.print(() => this.setState({ isPrint: false })));
    }
    print(callback) {//打印
        function pagesetup() {
            var HKEY_Path = 'HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\'; // 定义注册表位置
            try {
                var Wsh = new window.ActiveXObject('WScript.Shell');
                Wsh.RegWrite(HKEY_Path + 'header', ''); // 修改注册表值-header（页眉）
                Wsh.RegWrite(HKEY_Path + 'footer', ''); // 修改注册表值-footer（页脚）
                window.print()
            } catch (e) {
                alert('需要运行ActiveX对象后，才能进行打印设置。');
                //需手动设置浏览器：
                //internet选项-安全-自定义级别-ActiveX控件和插件-对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本（不安全）-启用（不安全）
            }
        }
        function isIE() {
            return !!window.ActiveXObject || 'ActiveXObject' in window;
        }
        if (isIE()) {
            pagesetup();
        } else {
            window.print();
        }
        callback && callback();
    }
    render() {
        return <div className="printA4">
            {!this.state.isPrint && <button onClick={() => this.printBtn()}>打印</button>}
            <div className="A4 border">
                <div className="A4body border">
                    <p className="txt-c h1">标题</p>
                    <p>内容</p>
                    <p className="pos-bottom">置底内容，撑满一页</p>
                </div>
            </div>
        </div>
    }
}