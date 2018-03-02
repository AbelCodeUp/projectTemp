import React, { Component } from 'react';
import Panel from './panel';
import { Avatar } from 'antd';
import Button from './Button';
export default class indexDshang extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        
    }
    render() {
        let b_img = require('../images/login_r_img.png');
        let userImg = {marginLeft:'10px'}
        let honghua = require('../images/icon_honghua.png');
        return (
            <Panel>
                <div className="">
                    <h3 className="index_panel_title">
                        最近完成课程
                    </h3>
                    <ul className="index_panel_daishang_box index_panelbox">
                        <li>
                            <div className="index_ds_item">
                                <div className="index_ds_header">
                                    <div className="index_ds_time">
                                        今日
                                </div>
                                    <div className="index_ds_states">
                                        待评价
                                    </div>
                                </div>
                                <div className="index_b_lesson_item">
                                    <div className="index_b_lesson_img">
                                        <img src={b_img} alt="" />
                                    </div>
                                    <div className="index_b_le_text">
                                        <span className="lesson_level">G1</span>
                                        <span>Reader: Cat School - 绘本：猫咪学校</span>
                                        <p className="lesson_dec">to introduce onesslf ; to exchange greeting</p>
                                    </div>
                                    <div className="lesson_user">
                                        本节课获得5个：
                                        <span><img src={honghua} alt=""/></span>
                                        <span><img src={honghua} alt=""/></span>
                                        <span><img src={honghua} alt=""/></span>
                                        <span><img src={honghua} alt=""/></span>
                                        <span><img src={honghua} alt=""/></span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </Panel>
        )
    }
}