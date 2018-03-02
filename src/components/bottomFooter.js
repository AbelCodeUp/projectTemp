import React, { Component } from 'react';
import { Link } from 'react-router';

import { Layout, Menu } from 'antd';
const { Footer, Content, Sider } = Layout;

const BottomFooter = () => {
    return (
        <Footer style={{'text-align':'center'}}>
           Ant Design ©2016 Created by Ant UED
        </Footer>
    )
}

export default BottomFooter