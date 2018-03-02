import React, { Component } from 'react';
import { Link } from 'react-router';
import LessonItemUdone from './LessonItemUdone';

export default class LessonUdone extends Component {
    render() {
        return (
            <ul className="index_panelbox">
                <li>
                    <LessonItemUdone btnText="进入教室" />
                </li>
                <li>
                    <LessonItemUdone btnText="进入教室1" />
                </li>
                <li>
                    <LessonItemUdone btnText="进入教室" />
                </li>
            </ul>
        )
    }
}