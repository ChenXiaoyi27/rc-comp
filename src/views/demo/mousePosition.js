import React from 'react';
import { Button, Input } from 'antd';

const { TextArea } = Input;

export default class MousePositionDemo extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        // 文本域内容
        content: '',
        // 文本域中光标起始位置
        textareaStart: 0
    }
    // 在文本中插入文字aaa
    insertAAA() {
        const { content, textareaStart } = this.state;
        const before = content.substring(0, textareaStart);
        const after = content.substring(textareaStart);
        this.setState({ content: `${before}aaa${after}` });
    }
    render() {
        const { content } = this.state;
        return (
            <div className='pd20'>
                <TextArea
                    value={content}
                    onChange={(e) => this.setState({ content: e.target.value })}
                    onSelect={e => this.setState({ textareaStart: e.target.selectionStart })}
                    style={{ width: 500, height: 120, minHeight: 120 }}
                    ref={r => this.textarea = r}
                />
                <Button onClick={() => this.insertAAA()} type="primary" className='ml10'>插入aaa</Button>
                <p className='mt20'>输入结果：{content}</p>
            </div>
        );
    }
}

export { MousePositionDemo }