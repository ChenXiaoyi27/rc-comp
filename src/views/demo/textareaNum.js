import React from 'react';
import TextareaNum from '../components/textarea-num';

export default class TextareaNumDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }
    render() {
        return <div style={{ width: 400, padding: 20 }}>
            <TextareaNum max={10} onChange={(text) => this.setState({ text })} />
            <div>{this.state.text}</div>
        </div>
    }
}
export { TextareaNumDemo };