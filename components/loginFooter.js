require('../styles/LoginFooter.css');

import React, { Component } from 'react';
import { Link } from 'react-router';

const loginFooter = () => {
    return (
        <div className="loginFooter">友情提示：<Link to="#" style={{color:'#fc4747'}}>有账号</Link>微信扫码直接登录，无账号微信扫码快速注册</div>
    )
}
export default loginFooter;