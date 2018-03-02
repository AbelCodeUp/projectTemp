// require('normalize.css/normalize.css');
require('../styles/reast.css');
import React, { Component } from 'react';
import { Router, IndexRoute, Route, Redirect, hashHistory } from 'react-router';

import LoginMobile from './loginMobile';
import Index from './index';
import IndexMain from './indexMain';
import LessonList from './MyLessonMain';
import LessonUdone from './LessonUdone';
import LessonCompleted from './LessonCompleted';
import DeviceTesting from './DeviceTesting';
import OrderLesson from './OrderLesson';
import StudyCenter from './StudyCenter';
import PersonCenter from './PersonCenter';
import OrderLessonDetail from './orderLessonDetail';
import PersonMyOrder from './personMyOrder';
import Register from './register';
import weCode from './weCode';
import PwdLogin from './PwdLogin';
import CodeLogin from './CodeLogin';

class AppComponent extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        {/*登录路由*/}
        <Route path="/" component={LoginMobile}>
            <IndexRoute component={weCode}></IndexRoute>
            <Route path="/Register" component={Register} />
             <Route path="/PwdLogin" component={PwdLogin} />
             <Route path="/CodeLogin" component={CodeLogin} /> 
        </Route>
        <Route path="/Main" component={Index}>
          <IndexRoute component={IndexMain}></IndexRoute>
          <Route path="/Main/Person" component={PersonCenter} >
            <IndexRoute path="/Main/Person/PersonInfo" component={PersonCenter} />
            <Route path="/Main/Person/PersonInfo" component={IndexMain} />
             <Route path="/Main/Person/MyLessonTime" component={IndexMain} />
            <Route path="/Main/Person/MyOrder" component={PersonMyOrder} />
            <Route path="/Main/Person/Integrai" component={IndexMain} />
            <Route path="/Main/Person/Discount" component={IndexMain} />  
          </Route>
          <Route path="/Main/BuyLesson" component={OrderLesson} />
          <Route path="/Main/Index" component={StudyCenter}>
            <IndexRoute path="/Main/Index/Index" component={IndexMain} />
            <Route path="/Main/Index/Index" component={IndexMain} />
            <Route path="/Main/Index/YueLesson" component={OrderLesson} >
                <Redirect from="/Main/Index/LessonList/LessonDetail/:id"  to="/Main/LessonDetail/:id"/>
            </Route>
            <Route path="/Main/Index/LessonList" component={LessonList} >
                <IndexRoute component={LessonUdone}></IndexRoute>
                <Route path="/Main/Index/LessonList/Completed" component={LessonCompleted} />
                <Route path="/Main/Index/LessonList/Undone" component={LessonUdone} />
            </Route>
            <Route path="/Main/Index/Check" component={DeviceTesting} />
          </ Route>
          {/*  课程详情  */}
          <Route path="/Main/LessonDetail/:id" component={OrderLessonDetail} />
          
        </Route>
        
       
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

