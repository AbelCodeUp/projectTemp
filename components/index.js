import React, { Component } from 'react';
import BottomFooter from './bottomFooter';
import { Link } from 'react-router';
require('../styles/b_index.css');
require('../styles/style.css');
import StudyCenter from './StudyCenter';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider } = Layout;

export default class Index extends Component {

    render() {
        let leftStyle = {
           
        }
        let headStyle = {
             width: '1280px',
            margin: '0 auto',
            overflow:'hidden'
        }
        return (
            <Layout>
                <Header style={{ 'height': '58px', background: '#dc2828' }}>
                    <div style={headStyle}>
                        <div className="logo"/>
                        <div className="b_Menu">
                            <Link className="b_Menu_item" activeClassName="b_item_active" to="/Main/Index">学习中心</Link>
                            <Link className="b_Menu_item" activeClassName="b_item_active" to="/Main/Person">我的帐户</Link>
                            <Link className="b_Menu_item" activeClassName="b_item_active" to="/Main/BuyLesson">购买课时</Link>
                        </div>
                    </div>
                </Header>
                 { this.props.children }
            </Layout>
        )
    }
}

