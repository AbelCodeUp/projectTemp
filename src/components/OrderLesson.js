import React, { Component } from 'react';
import { Link } from 'react-router';
import Panel from './Panel';
import OrderLessonItem from './orderLessonItem';

export default class OrderLesson extends Component {
    render() {
        return (
            <Panel>
                <h3 className="index_panel_title">预约推荐</h3>
                <div className="reLesson">
                    <span className="lesson_level">G1</span>
                    <p className="order_lesson_dec">
                        to introduce onesslf ; to exchange greeting,to introduce onesslf ; 
                        to exchange greetingto introduce onesslf ; to exchange greetingto introduce onesslf ; 
                        to exchange greeting
                    </p>
                    <p>
                        已完成<span className="fontOrigin">3</span>课，共 <span  className="fontOrigin">15</span>课
                    </p>
                </div>
                {/* 约课  */}
                <ul className="order_name_nav">
                    <li>
                        <a className="orderbtn" href="javascript:;">
                            G1
                        </a>
                    </li>
                    <li>
                        <a className="orderbtn orderbtn_red" href="javascript:;">
                            G1
                        </a>
                    </li>
                    <li>
                         <a className="orderbtn orderbtn_disabled" href="javascript:;">
                            G1
                        </a>
                    </li>
                    <li>
                         <a className="orderbtn orderbtn_disabled" href="javascript:;">
                            G1
                        </a>
                    </li>
                </ul>
                <ul className="order_lesson_box">
                    <li>
                        <Link to="/Main/Index/LessonList/LessonDetail/1">
                            <OrderLessonItem />
                        </Link>
                    </li>
                    <li>
                        <OrderLessonItem />
                    </li>
                    <li>
                        <OrderLessonItem />
                    </li>
                    <li>
                        <OrderLessonItem />
                    </li>
                    <li>
                        <OrderLessonItem type="lock"/>
                    </li>
                </ul>
            </Panel>
        )
    }
}