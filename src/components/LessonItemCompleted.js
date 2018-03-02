import React, { Component } from 'react';
import { Avatar } from 'antd';
import { Rate, Icon } from 'antd';

export default class LessonItemCompleted extends Component {
    render() {
        let b_img = require('../images/login_r_img.png');
        let userImg = {marginLeft:'10px'};
        let { btnText } = this.props;
        return (
            <div className="index_ds_item">
                <div className="index_ds_header">
                    <div className="index_ds_time">
                        今日
                                </div>
                    <div className="index_ds_states">
                        已评价：<Rate />
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
                       本节课获得<span>5</span>个
                    </div>
                </div>
            </div>
        )
    }
}