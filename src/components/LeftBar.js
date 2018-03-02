
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import BottomFooter from './bottomFooter';
const { Header, Content, Sider } = Layout;
import { Link } from 'react-router';

export default class StudyCenter extends Component {
    render() {
        let studyList = [
            {
                name: '首页',
                route: '/Main/Index/Index'
            },
            {
                name: '约课',
                route: '/Main/Index/Index'
            },
            {
                name: '课表',
                route: '/Main/Index/Index'
            },
            {
                name: '检测设备',
                route: '/Main/Index/Index'
            },
        ];
        let personList = [
            {
                name: '个人信息',
                route: '/Main/Index/Index'
            },
            {
                name: '我的课时',
                route: '/Main/Index/Index'
            },
            {
                name: '我的订单',
                route: '/Main/Index/Index'
            },
            {
                name: '积分',
                route: '/Main/Index/Index'
            },
            {
                name: '优惠劵',
                route: '/Main/Index/Index'
            }
        ]

        let type = this.props.type;
        let repoList;
        if (type == 'studyCenter') {
            repoList = studyList.map(function (study) {
                return (
                   <li className="b_Menu_leftitem" style={leftStyle}>
                        <Link to={study.route} activeClassName="left_active">
                            <Icon type="mail" />
                            {study.name}
                        </Link>
                    </li>
                );
            });
        }else if(type == 'personCenter'){
            repoList = personList.map(function (study) {
                return (
                   <li className="b_Menu_leftitem" style={leftStyle}>
                        <Link to={study.route} activeClassName="left_active">
                            <Icon type="mail" />
                            {study.name}
                        </Link>
                    </li>
                );
            });
        }


        return (
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <ul className="b_Menu_leftbar">
                        { repoList }
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