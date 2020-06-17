import './index.less';
import React, { Component } from 'react';
import { Icon } from 'antd';

class ToggleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAll: false
        };
    }
    componentWillReceiveProps(nextProps) {
        let { visible } = nextProps;
        if (visible !== this.props.visible && visible) {
            this.changeShow(true);
        }
    }
    changeShow(showAll) {//最小/大化
        this.setState({ showAll });
    }
    closeModal() {//关闭弹窗
        this.props.onCancel();
    }
    render() {
        let { visible, title } = this.props,
            { showAll } = this.state;
        return (
            <div className="toggleModal">
                {visible && <div className={`toggleModal-wrap ${showAll ? 'tm-open' : 'tm-close'}`}>
                    <div className="toggleModal-header">
                        <span className="h6">{title || '标题'}</span>
                        <Icon className="fr-icon"
                            type="close"
                            onClick={() => this.closeModal()}
                        />
                        {showAll ?
                            <Icon className="fr-icon mr10"
                                type="minus"
                                onClick={() => this.changeShow(false)}
                            /> :
                            <Icon className="fr-icon mr10"
                                type="border"
                                onClick={() => this.changeShow(true)}
                            />
                        }
                    </div>
                    {this.props.children}
                </div>}
            </div>
        );
    }
}

export default ToggleModal;
/*
props:
title:弹窗标题
visible:弹窗可见
onCancel:关闭弹窗
*/