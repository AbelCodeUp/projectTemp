import React, { Component } from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from 'antd';

import LessonItemUdone from './LessonItemUdone';
import { Avatar } from 'antd';

export default class OrderLessonDetail extends Component {
    render() {
        return (
            <div className="OrderLessonDetail">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/Main/index">学习中心</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/Main/Index/YueLesson">课表</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>课程详情</Breadcrumb.Item>
                </Breadcrumb>
                <div className="b_lesson_detail">
                     <LessonItemUdone />
                     <div className="leDetail_img">
                         <ul>
                             <li>
                                 <Avatar size="large" icon="user" />
                             </li>
                             <li>
                                 <Avatar size="large" icon="user" />
                             </li>
                             <li>
                                 <Avatar size="large" icon="user" />
                             </li>
                             <li>
                                 <Avatar size="large" icon="user" />
                             </li>
                             <li>
                                 <Avatar size="large" icon="user" />
                             </li>
                             <li>
                                 <Avatar size="large" icon="user" />
                             </li>
                         </ul>
                        
                     </div>
                </div>
            </div>
        )
    }
}