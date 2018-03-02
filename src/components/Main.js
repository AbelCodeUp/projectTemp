require('../styles/index.css');
require('../styles/my.css');
require('../styles/myPersonCenter.css');
require('../styles/courseSurvey.css');
require('../styles/popUp.css');
require('../fonts/iconfont.css');
require('../styles/main.css');
require('../lib/index.css');

require('../js/rem.js');
import $ from 'jquery';

window.urls = 'https://hfapi.gogo-talk.com/'//正式
window.urlsguan = 'https://wx.gogo-talk.com/'//正式
window.imgs = ''//图片的前缀正式
// window.urls = 'http://117.107.153.228:803/'//测试
// window.imgs = 'http://117.107.153.228:806'//图片的前缀测试
// window.urlsguan = 'http://wx.gogo-talk.com/h5test/'//测试

import React, { Component } from 'react';
import { Router,  Route,  hashHistory } from 'react-router';

import SignIn from './SignIn';//绑定手机号

import Index from './Index';//首页
import MyAppointment from './My_appointment';//我的课表 预约课程 正式学员
import MyAppointmentTY from './My_appointmentTy';//我的课表 预约课程 体验学员
import MyAppointmentTY1 from './My_appointmentTy1';//我的课表 预约课程 体验学员
import MyTimetable from './My_timetable';//我的课表 我的课表
import My from './My';//我的
import MyClassXiang from './My_ClassXiang'//未完成详情
import YijieshuClassXiang from './yijieshuClassXiang'//已结束详情
import YueKeXiang from './YueKeXiang'//未约课详情
import YiYueKeXiang from './YiYueKeXiang'//已约课详情
import PingJia from './PingJia'//评价
import PingJiaSuc from './PingJiaSuc'//评价成功分享
// import kebiaoPingJia from './PingJia'//评价

import My_guidance from './My_guidance';//入学指导

import My_intergral  from './My_intergral';//我的积分
import My_intergral_detail from './my_intergral_detail';//积分详情
import My_intergral_how from './my_intergral_how';//如何获取
import My_intergral_rules from './my_intergral_rules';//积分规则

/*我的优惠券*/
import My_coupon_noUsed from './my_coupon_noUsed';//未使用
import My_coupon_hasUsed from './my_coupon_hasUsed';//已使用
import My_coupon_expired from './my_coupon_expired';//已过期
import Choose_my_coupon from './Choose_my_coupon';//选择优惠券

/*我的课时*/
import My_class_hours from "./My_class_hours";

/*我的个人中心*/
import My_personCenter from './my_personCenter';//我的个人中心
import My_personCenter_base from './my_personCenter_base';//基本信息
import My_personCenter_changePs from './my_personCenter_changePs';//修改密码
import My_personCenter_bindPhone from './my_personCenter_bindPhone';//绑定手机号
import My_personCenter_changePhone1 from './my_personCenter_changePhone1';//验证原手机
import My_personCenter_changePhone2 from './my_personCenter_changePhone2';//验证新手机号

import My_order from './my_order';//我的订单
import My_order_no from './my_order_no';//未选券的订单
import My_order_sure from './my_order_sure';//已选券的订单
import My_pay from './my_pay';//支付订单
import My_error from './my_error';//开发提示页

import CourseSurvey from './courseSurvew';//定级

import DateChoose from './dateChoose'

import Invitation from './invitation'; //邀请函
import Duihuanma from './duihuanma';//兑换码
import Duihuanma2 from './duihuanma2';//兑换码
import ClassXieYi from './classXieYi';//课程协议


// import Swiper from './swiper';
// import ListViews from './ListViews';

class AppComponent extends Component {
  render() {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={Index}>

            </Route>
            <Route path="/My" component={My}>

            </Route>
            <Route path="/My_appointment" component={MyAppointment}>

            </Route>
            <Route path="/My_appointmentTY" component={MyAppointmentTY}></Route>
            <Route path="/My_appointmentTY1" component={MyAppointmentTY1}></Route>
            <Route path="/My_timetable" component={MyTimetable}>
            </Route>

            <Route path="/My_ClassXiang" component={MyClassXiang}>

            </Route>
            <Route path="/YijieshuClassXiang" component={YijieshuClassXiang}>

            </Route>
            <Route path="/YueKeXiang" component={YueKeXiang}>

            </Route>
            <Route path="/YiYueKeXiang" component={YiYueKeXiang}>

            </Route>
            <Route path="/PingJia" component={PingJia}>

            </Route>
            {/*评价成功分享*/}
            <Route path="/PingJiaSuc" component={PingJiaSuc}>

            </Route>

            {/*积分路由*/}
          <Route path="/My_intergral/:id" component={My_intergral}>
          </Route>

          <Route path="/My_intergral/My_intergral_detail/:id" component={My_intergral_detail}>
          </Route>

          <Route path="/My_intergral/My_intergral_how/:id" component={My_intergral_how}>
          </Route>

          <Route path="/My_intergral/My_intergral_rules/:id" component={My_intergral_rules}>
          </Route>

          {/*优惠券路由*/}
          <Route path="/My_coupon_noUsed/:id" component={My_coupon_noUsed}>

          </Route>
          <Route path="/My_coupon_hasUsed/:id" component={My_coupon_hasUsed}>

          </Route>
          <Route path="/My_coupon_expired/:id" component={My_coupon_expired}>

          </Route>

          {/*开发提示页*/}
          <Route path="/My_error" component={My_error}>

          </Route>

           {/*入学指导*/}
          <Route path="/My_guidance" component={My_guidance}>
          </Route>

          {/*我的课时*/}
          <Route path="/My_class_hours" component={My_class_hours}>

          </Route>
          <Route path="/My_class_hours/My_order_no" component={My_order_no}>

          </Route>
          <Route path="/My_class_hours/My_order_sure" component={My_order_sure}>

          </Route>
          <Route path="/My_class_hours/My_order_sure/Choose_my_coupon" component={Choose_my_coupon}>

          </Route>
          <Route path="/My_class_hours/My_pay" component={My_pay}>

          </Route>
          {/*我的个人中心*/}
          <Route path="/My_personCenter" component={My_personCenter}>

          </Route>
          <Route path="/My_personCenter/My_personCenter_base" component={My_personCenter_base}>

          </Route>
          <Route path="/My_personCenter_bindPhone" component={My_personCenter_bindPhone}>

          </Route>
          <Route path="/My_personCenter/My_personCenter_changePhone1" component={My_personCenter_changePhone1}>

          </Route>
          <Route path="/My_personCenter/My_personCenter_changePhone2" component={My_personCenter_changePhone2}>

          </Route>
          <Route path="/My_personCenter/My_personCenter_changePs" component={My_personCenter_changePs}>

          </Route>

          {/*我的订单*/}
          <Route path="/My_order" component={My_order}>

          </Route>
          <Route path="/My_order/My_order_no" component={My_order_no}>

          </Route>
          <Route path="/My_order/My_order_sure" component={My_order_sure}>

          </Route>
          <Route path="/My_order/My_order_no/Choose_my_coupon" component={Choose_my_coupon}>

          </Route>
          <Route path="/My_order/My_pay" component={My_pay}>

          </Route>
          <Route path="/dateChoose" component={DateChoose}>

          </Route>

          <Route path='/courseSurvew/:id' component={CourseSurvey}></Route>
          {/* <Route path="/swiper" component={Swiper}>

          </Route> */}

          <Route path='/My_invitation' component={Invitation}></Route>
          <Route path='/My_duihuanma/:id' component={Duihuanma}></Route>
          <Route path='/My_duihuanma2/:id' component={Duihuanma2}></Route>
          <Route path='/My_duihuanma2/:id' component={Duihuanma2}></Route>
          <Route path='/My_classXieYi' component={ClassXieYi}></Route>

          {/* <Route path='/My_ListView' component={ListViews}></Route> */}

        </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
