
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import BottomFooter from './bottomFooter';
const { Header, Content, Sider } = Layout;
import { Link } from 'react-router';

export default class PersonCenter extends Component {
    render() {
        let leftStyle = {
            
        }
        return (
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <ul className="b_Menu_leftbar">
                        <li className="b_Menu_leftitem" style={leftStyle}>
                            <Link to="/Main/Person/PersonInfo" activeClassName="left_active">
                                <Icon type="mail" />
                                个人信息
                                </Link>
                        </li>
                        <li className="b_Menu_leftitem" style={leftStyle}>
                            <Link to="/Main/Person/MyLessonTime" activeClassName="left_active">
                                <Icon type="mail" />
                                我的课时
                                </Link>
                        </li>
                        <li className="b_Menu_leftitem" style={leftStyle}>
                            <Link to="/Main/Person/MyOrder" activeClassName="left_active">
                                <Icon type="mail" />
                                我的订单
                                </Link>
                        </li>
                        <li className="b_Menu_leftitem" style={leftStyle}>
                            <Link to="/Main/Person/Integrai" activeClassName="left_active">
                                <Icon type="mail" />
                                积分
                                </Link>
                        </li>
                        <li className="b_Menu_leftitem" style={leftStyle}>
                            <Link to="/Main/Person/Discount" activeClassName="left_active">
                                <Icon type="mail" />
                                优惠劵
                                </Link>
                        </li>
                    </ul>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        { this.props.children }
                    </Content>
                    <BottomFooter />
                </Layout>
            </Layout>
        )
    }

}