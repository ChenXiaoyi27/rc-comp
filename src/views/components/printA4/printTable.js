import './index.less';
import React from 'react';

export default class PrintTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPrint: false,//是否在打印中
            printSize: 20,
            tableData: [
                { xm: '1', yw: '100', sx: '100' },
                { xm: '2', yw: '99', sx: '99' },
                { xm: '3', yw: '98', sx: '98' },
                { xm: '4', yw: '97', sx: '97' },
                { xm: '5', yw: '100', sx: '100' },
                { xm: '6', yw: '99', sx: '99' },
                { xm: '7', yw: '98', sx: '98' },
                { xm: '8', yw: '97', sx: '97' },
                { xm: '9', yw: '100', sx: '100' },
                { xm: '10', yw: '99', sx: '99' },
                { xm: '11', yw: '98', sx: '98' },
                { xm: '12', yw: '97', sx: '97' },
                { xm: '13', yw: '100', sx: '100' },
                { xm: '14', yw: '99', sx: '99' },
                { xm: '15', yw: '98', sx: '98' },
                { xm: '16', yw: '97', sx: '97' },
                { xm: '17', yw: '98', sx: '98' },
                { xm: '18', yw: '97', sx: '97' },
                { xm: '19', yw: '100', sx: '100' },
                { xm: '20', yw: '99', sx: '99' },
                { xm: '21', yw: '98', sx: '98' },
                { xm: '22', yw: '97', sx: '97' },
                { xm: '23', yw: '100', sx: '100' },
                { xm: '24', yw: '99', sx: '99' },
                { xm: '25', yw: '98', sx: '98' },
                { xm: '26', yw: '97', sx: '97' },
                { xm: '27', yw: '98', sx: '98' },
                { xm: '28', yw: '97', sx: '97' },
                { xm: '29', yw: '100', sx: '100' },
                { xm: '30', yw: '99', sx: '99' }
            ]
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
    splitTable() {//打印时表格分离
        let { tableData, printSize } = this.state, tables = [], i = 0;
        for (i = 0; i < parseInt(tableData.length / printSize); i++) {
            let tmp = [];
            for (let j = i * printSize; j < (i + 1) * printSize; j++) {
                tmp.push(tableData[j]);
            }
            tables.push(tmp);
        }
        if (tableData.length % printSize !== 0) {
            let tmp = [];
            for (let j = i * printSize; j < tableData.length; j++) {
                tmp.push(tableData[j]);
            }
            tables.push(tmp);
        }
        return tables.map((item, index) => {
            return <div key={index} className={index === 0 ? "printOneTable" : "printTable"}>
                {index !== 0 && <p style={{ height: '25mm' }} />}
                {/* 替换table */}
                <table className="A4-table mga txt-c">
                    <thead>
                        <tr><th>姓名</th><th>语文</th><th>数学</th></tr>
                    </thead>
                    <tbody>
                        {item.map((item) => <tr key={item.xm}><td>{item.xm}</td><td>{item.yw}</td><td>{item.sx}</td></tr>)}
                    </tbody>
                </table>
                <div style={{ pageBreakAfter: 'always' }} />
            </div>
        });
    }
    render() {
        let { isPrint, printSize, tableData } = this.state;
        return <div className="printA4">
            {!isPrint && <button onClick={() => this.printBtn()}>打印</button>}
            <div className="A4">
                <div className="A4body">
                    <p className="txt-c h3">标题</p>
                    {!isPrint || tableData.length < printSize ?
                        <div className="printOneTable">
                            {/* 替换table */}
                            <table className="A4-table mga txt-c">
                                <thead>
                                    <tr><th>姓名</th><th>语文</th><th>数学</th></tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item) => <tr key={item.xm}><td>{item.xm}</td><td>{item.yw}</td><td>{item.sx}</td></tr>)}
                                </tbody>
                            </table>
                        </div>
                        : this.splitTable()}
                </div>
            </div>
        </div>
    }
}