
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import BottomFooter from './bottomFooter';
const { Header, Content, Sider } = Layout;
import { Link } from 'react-router';

export default class StudyCenter extends Component {
    render() {
        let leftStyle = {
            
        }
        return (
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <ul className="b_Menu_leftbar">
                        <li className="b_Menu_leftitem" style={leftStyle}>
                            <Link to="/Main/Index/Index" activeClassName="left_active">
                                <Icon type="mail" />
                                首页
                                </Link>
                        </li>
                        <li className="b_Menu_leftitem" style={leftStyle}>
                            <Link to="/Main/Index/YueLesson" activeClassName="left_active">
                                <Icon type="mail" />
                                约课
                                </Link>
                        </li>
                        <li className="b_Menu_leftitem" style={leftStyle}>
                            <Link to="/Main/Index/LessonList" activeClassName="left_active">
                                <Icon type="mail" />
                                课表
                                </Link>
                        </li>
                        <li className="b_Menu_leftitem" style={leftStyle}>
                            <Link to="/Main/Index/Check" activeClassName="left_active">
                                <Icon type="mail" />
                                检测设备
                                </Link>
                        </li>
                    </ul>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        {this.props.children}
                    </Content>
                    <BottomFooter />
                </Layout>
            </Layout>
        )
    }

}