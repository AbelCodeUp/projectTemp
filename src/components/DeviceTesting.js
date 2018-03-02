import React, { Component } from 'react';
import { Link } from 'react-router';
import Panel from './Panel';
import Button from './Button';

export default class DeviceTesting extends Component {
    render () {
        let test1 = require('../images/icon_test1.png');
        let test2 = require('../images/icon_test2.png');
        return (
            <Panel>       
                <div className="tesTingBox">
                    <ul>
                        <li>
                            <div className="iconImg">
                                <img src={test1} alt=""/>
                            </div>
                            <button className="test_btn test_btn_1">
                                自动检测
                            </button>
                        </li>
                        <li>
                            <div className="iconImg">
                                <img src={test2} alt=""/>
                            </div>
                           <button className="test_btn test_btn_1">
                               人工检测
                           </button>
                        </li>
                    </ul>
                </div>
            </Panel>
        )
    }
}