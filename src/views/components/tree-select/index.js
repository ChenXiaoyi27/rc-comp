/*
    单选/多选Tree
    参数：
    必填：
    tree：树结构数据，子节点字段为children。
    itemProp：一条数据的键值对字段名。例如{key: 'dm', value: 'mc'}。
    可选：
    multiple：设为true则为多选。默认单选。
    onCheck：点击复选框勾选事件，抛出勾选项的键数组-keys、行数据数组-rows。
    onSelect：点击节点事件，抛出当前节点行数据-record。
*/
import './index.less';
import React from 'react';
import { Icon, Checkbox } from 'antd';

class TreeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '',
            data: [],
            keys: [],//勾选项
            rows: []//勾选项行数据
        };
    }
    componentWillMount() {
        this.setState({ data: JSON.parse(JSON.stringify(this.props.tree)) });
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.data.length === 0) {
            this.setState({ data: JSON.parse(JSON.stringify(nextProps.tree)) });
        }
    }
    clearData() {//初始化数据
        this.setState({ data: JSON.parse(JSON.stringify(this.props.tree)), current: '', keys: [], rows: [] });
    }
    findNodeByRoot(root, tree) {// 根据索引路径找到对象在树中的位置
        let rootArr = root.split(','), len = rootArr.length,
            arr = [];
        arr[1] = tree[rootArr[1]];
        for (let i = 2; i < len; i++) {
            arr.push(arr[i - 1].children[rootArr[i]]);
        }
        return arr[len - 1];
    }
    onClick(e, item, root) {// 点击树节点
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
    }
    onSelect(item) {// 选中节点
        this.setState({ current: item[this.props.itemProp.key] });
        this.props.onSelect && this.props.onSelect(item);
    }
    onCheck(checked, record, root) {//多选
        let { keys, rows } = this.state;
        if (checked) {//勾选
            this.checkOn(record, root);
        } else {//取消勾选
            this.checkOff(record, root);
        }
        this.setState({ keys, rows });
        this.props.onCheck && this.props.onCheck(keys, rows);
    }
    checkOn(item, root) {//勾选
        if (item.children && item.children.length > 0) {//递归处理子项
            item.children.map((child, index) => {
                this.checkOn(child, `${root},${index}`);
                return child;
            });
        }
        this.loopAdd(item, root);//递归处理父项
    }
    loopAdd(item, root) {//递归勾选
        if (!item.checked) {
            //添加当前项
            let { keys, rows, data } = this.state, { itemProp } = this.props;
            keys.push(item[itemProp.key]);
            rows.push(Object.assign(item, { index: rows.length }));
            item.checked = true;
            //添加父项
            let arr = root.split(',');
            if (arr.length > 2) {
                arr.pop();
                let parentRoot = arr.join(','), parent = this.findNodeByRoot(parentRoot, data),
                    { children } = parent, i = 0;
                for (; i < children.length; i++) {
                    if (!children[i].checked) {
                        break;
                    }
                }
                if (i === children.length) {//判断是否父项的所有子项都已勾选
                    this.loopAdd(parent, parentRoot);
                }
            }
        }
    }
    checkOff(item, root) {//取消勾选
        if (item.children && item.children.length > 0) {//递归处理子项
            item.children.map((child, index) => this.checkOff(child, `${root},${index}`));
        }
        this.loopDelete(item, root);//递归处理父项
    }
    loopDelete(item, root) {//递归删除
        if (item.checked) {
            //删除当前项
            let { keys, rows, data } = this.state;
            keys.splice(item.index, 1);
            rows.splice(item.index, 1);
            Object.assign(item, { index: null });
            rows.map((row, i) => {
                row.index = i;
                return row;
            });
            item.checked = false;
            //删除父项
            let arr = root.split(',');
            if (arr.length > 2) {
                arr.pop();
                let parentRoot = arr.join(','), parent = this.findNodeByRoot(parentRoot, data);
                this.loopDelete(parent, parentRoot);
            }
        }
    }
    renderNode(arr, i, parentIndex) {
        let { current } = this.state, { itemProp, multiple } = this.props, { key, value } = itemProp;
        return arr.map((item, index) => {
            let root = parentIndex + ',' + index;
            if (item.children && item.children.length > 0) {
                return (
                    <div>
                        <div key={item[key]} className="dis-ib" style={{ marginLeft: `${parentIndex === 0 ? '0' : '12px'}` }}>
                            <Icon onClick={(e) => this.onClick(e, item, root)} type={`caret-${item.expand ? 'down' : 'right'}`} className="ieTree-arrow" />
                            {multiple && <span><Checkbox checked={item.checked} onChange={(e) => this.onCheck(e.target.checked, item, root)} /></span>}
                            <span className={`tree-node ${item[key] === current ? 'tree-selected' : 'tree-noselect'}`}
                                onClick={() => this.onSelect(item)}
                            >{item[value]}</span>
                            {item.expand && this.renderNode(item.children, i + 1, root)}
                        </div >
                        <br />
                    </div>
                )
            } else {
                return (
                    <div>
                        <div key={item[key]} className="dis-ib" style={{ marginLeft: `${26 + 12 * i}px` }}
                            onClick={(e) => this.onClick(e, item, root)}
                        >
                            {multiple && <span><Checkbox checked={item.checked} onChange={(e) => this.onCheck(e.target.checked, item, root)} /></span>}
                            <span className={`tree-node ${item[key] === current ? 'tree-selected' : 'tree-noselect'}`}
                                onClick={() => this.onSelect(item)}
                            >{item[value]}</span>
                        </div >
                        <br />
                    </div>
                )
            }
        })
    }
    render() {
        return <div className="ieTree">
            {this.renderNode(this.state.data, 0, 0)}
        </div>
    }
}
export default TreeSelect;