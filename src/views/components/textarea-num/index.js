import './index.less';
import React from 'react';
import { Message } from 'antd';

class TextareaNum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNum: 0,
            textVal: ''
        };
    }
    onChange(val) {
        console.log(val)
        let { max } = this.props;
        if (max && val.length > max) {
            Message.info(`字数不能超过${max}字！`)
            return;
        }
        this.setState({ currentNum: val.length, textVal: val }, () => this.props.onChange(this.state.textVal));
    }
    render() {
        let { max } = this.props, { currentNum, textVal } = this.state;
        return <div className="textareaNum">
            <textarea className="ant-input" style={{ width: '100%', height: '60px' }}
                value={textVal} onChange={(e) => this.onChange(e.target.value)}
            />
            {max && <p className="txt-r">{currentNum}/{max}</p>}
        </div>
    }
}
export default TextareaNum;