require('../styles/LoginHeader.css');

import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM, { render } from 'react-dom';

let logo = require('../images/logo.png');

export default class loginHeader extends Component {
    render() {
        var studyStyle = {
            color:'#d6131e',
            fontSize:'12px'
        };
        return (
            <div className="lo_header">
                <div className="head">
                    <div className="head-logo">
                        <img src={logo} alt="" />
                    </div>
                    <div className="head-login">
                        <button type="button" className="loginbtn">登录学习</button>
                        <div className="logining">
                            <div className="login-photo">
                                <img src="" alt="" />
                            </div>
                            <div>
                                <p className="login-name">姓名</p>
                                <Link style={studyStyle} to="#">去学习中心>></Link>
                            </div>
                            <div className="escbox"><a href="javascript:;" className="esc">退出</a></div>
                        </div>
                        
                    </div>
                    <ul className="head-nav">
                        <li className="nav-active">
                            <a href="#">首页</a><div className="nav-line"></div>
                        </li>
                        <li><a href="#">课程体系</a><div className="nav-line"></div></li>
                        <li><a href="#">外教团队</a><div className="nav-line"></div></li>
                        <li><a href="#">服务内容</a><div className="nav-line"></div></li>
                        <li><a href="#">学习环境</a><div className="nav-line"></div></li>
                    </ul>
                </div >
            </div>
        )
    }
}