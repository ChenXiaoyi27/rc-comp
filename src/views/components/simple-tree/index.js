import './index.less';
import React from 'react';

class SimpleTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '',
            data: []
        };
    }
    componentWillMount() {
        this.setState({ data: this.props.data });
    }
    findNodeByRoot(root, tree) {
        // 根据索引路径找到对象在树中的位置
        let rootArr = root.split(','), len = rootArr.length,
            arr = [];
        arr[1] = tree[rootArr[1]];
        for (let i = 2; i < len; i++) {
            arr.push(arr[i - 1].children[rootArr[i]]);
        }
        return arr[len - 1];
    }
    onClick(e, item, root) {
        // 点击树节点
        e.stopPropagation();
        let { data } = this.state, current = this.findNodeByRoot(root, data);
        if (item.children) {//展开节点
            if (current.expand) {
                current.expand = false;
            } else {
                current.expand = true;
            }
            this.setState({ data });
        }
        this.onSelect(item);
    }
    onSelect(item) {
        // 选中节点
        console.log('当前节点', item)
        this.setState({ current: item[this.props.itemProp.key] });
        this.props.onSelect(item);
    }
    renderNode(arr, i, parentIndex) {
        let { current } = this.state, { key, value } = this.props.itemProp;
        return arr.map((item, index) => {
            let root = parentIndex + ',' + index;
            if (item.children && item.children.length > 0) {
                return (
                    <div>
                        <div key={item[key]} className="dis-ib lh21" style={{ textIndent: `${12 * i}px` }}
                            onClick={(e) => this.onClick(e, item, root)}
                        >
                            <span className="ieTree-arrow">{item.expand ? '-' : '+'}</span>
                            <span className={`tree-node ${item[key] === current ? 'tree-selected' : 'tree-noselect'}`}>{item[value]}</span>
                            {item.expand && this.renderNode(item.children, i + 1, root)}
                        </div>
                        <br />
                    </div>
                )
            } else {
                return (
                    <div>
                        <div key={item[key]} className="dis-ib lh21" style={{ textIndent: `${12 + 12 * i}px` }}
                            onClick={(e) => this.onClick(e, item, root)}
                        >
                            <span className={`tree-node ${item[key] === current ? 'tree-selected' : 'tree-noselect'}`}>{item[value]}</span>
                        </div>
                        <br />
                    </div>
                )
            }
        })
    }
    render() {
        return <div className="simpleTree">
            {this.state.data.length > 0 && this.renderNode(this.state.data, 0, 0)}
        </div>
    }
}
export default SimpleTree;