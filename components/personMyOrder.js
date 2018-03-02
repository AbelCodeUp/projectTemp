import React, { Component } from 'react';
import { Link } from 'react-router';
import Panel from './Panel';

export default class PersonMyOrder extends Component {
    render() {
        return (
            <Panel>
                <h3 className="index_panel_title">
                    我的订单
                </h3>
                <div className="myOrderPanelbox">
                    <div className="myOrderPanel">
                        <div className="myOrder_header">
                            <span>2017-06-12 19:34</span>
                            <span>
                                <span>订单编号</span>
                                <span>1212143253253452</span>
                            </span>
                        </div>
                        <div className="myOrderBody">
                            <ul>
                                <li>
                                    <p>原价<span>￥1200.00</span></p>
                                    <p><span>套餐1</span><span>（40课时）</span></p>
                                    <p>课时有效期<span>3个月</span></p>
                                </li>
                                <li>
                                    <p>实际支付<span>￥1200.00</span></p>
                                    <p>优惠劵低限><span>￥1200.00</span></p>
                                </li>
                                <li>
                                    <span>等待家长付款</span>
                                </li>
                                <li>
                                    <p><Link to="/">去支付</Link></p>
                                    <p>取消订单</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Panel>
        )
    }
}