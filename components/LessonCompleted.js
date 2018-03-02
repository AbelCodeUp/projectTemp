import React, { Component } from 'react';
import { Link } from 'react-router';
import LessonItemCompleted from './LessonItemCompleted';

export default class LessonCompleted extends Component {
    render () {
        return(
            <ul className="index_panelbox">
                <li>
                    <LessonItemCompleted />
                </li>
                <li>
                    <LessonItemCompleted />
                </li>
                <li>
                    <LessonItemCompleted />
                </li>
            </ul>
        )
    }
}