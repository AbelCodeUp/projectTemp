import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactDOM, { render } from 'react-dom';

import LoginHeader from './loginHeader';/*头部导航-官网*/
import LoginFooter from './loginFooter';/*底部 */

let b_img = require('../images/login_r_img.png');
/* login 二维码扫码登录左侧组件 */
export default class loginMobile extends Component {
    render() {
        return (
            <div>
                <LoginHeader />
                <div className="login_c_box">
                    <div className="login_c_c">
                        <div className="login_l_img fl">
                            <img src={b_img} alt="" />
                        </div>
                        <div className="fl" style={{marginLeft:'30px'}}>
                            {
                                this.props.children
                            }
                        </div>
                    </div>
                </div>
                <LoginFooter />
            </div>
        )
    }
}