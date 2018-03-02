import React, { Component } from 'react';
import { Link } from 'react-router';
import Panel from './panel';

export default class LessonListNav extends Component {
    render () {
        return (
            <Panel>
                <ul className="lessonList_nav_box">
                    <li>
                        
                        <Link activeClassName="active" to="/Main/Index/LessonList/Undone">未完成</Link>
                    </li>
                    <li className="l_Line"></li>
                    <li>
                        <Link activeClassName="active" to="/Main/Index/LessonList/Completed">已结束</Link>
                    </li>
                </ul>
                <div className="Lesson_b_box">
                    { this.props.children }
                </div>
            </Panel>
        )
    }
}