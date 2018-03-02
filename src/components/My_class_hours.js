/**
 * Created by W520-1 on 2017/8/22.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import Canvas from './CanvasHuan';
import { hashHistory } from 'react-router';

import $ from 'jquery';

export default class My_class_hours extends Component {
  constructor() {
    super();
    this.state = {
      time: '---',
      usedClasshour: 0,
      StudentTimeCount: 0,
      datas: null,
      current: 1,
      total: 0,
      pageSize: 100,
      isPagination: true,
      isTiyan: null
    }
  }
  componentDidMount() {
    function GetCookie(sName) {
      let aCookie = document.cookie.split("; ");
      for (let i = 0; i < aCookie.length; i++) {
        let aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
          return unescape(aCrumb[1]);
      }
      return null;
    }
    if (GetCookie("Tonken") || localStorage.getItem('Tonken')) {
      $.ajax({
        type: "GET",
        url: urls + "api/HomePage/GetRecommendedCourses",
        headers: { Authorization: localStorage.getItem('Tonken') },
        dataType: "json",
        success: function (json) {
            if (json.result == -2) {//未定级
                hashHistory.push('/courseSurvew/5')
            } else if (json.result == 1) {
              $.ajax({
                type: "GET",
                url: urls + `api/Lesson/IsOfficial`,//判断是否是正式学员，0为体验，1为正式
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                  if (json.result >= 1000) {
                    document.cookie = "Tonken=" + '';
                    hashHistory.push("/My");
                  } else {
                    this.setState({
                      isTiyan: json.result
                    })
                  }
                }.bind(this)
              });
              $.ajax({
                type: "GET",
                url: urls + "api/Lesson/GetClassHour",
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                  if (json.result == 1) {
                    const newUser = json.data;
                    this.setState({
                      time: newUser.time,
                      usedClasshour: newUser.usedClasshour,
                      StudentTimeCount: newUser.StudentTimeCount
                    })
                  } else if (json.result >= 1000) {
                    document.cookie = "Tonken=" + '';
                    hashHistory.push("/My");
                  }
                }.bind(this)
              });
        
              $.ajax({
                type: "GET",
                url: urls + `api/Lesson/GetClassHourPage?pageIndex=${this.state.current}&pageSize=${this.state.pageSize}`,
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                  if (json.result == 1) {
                    this.setState({ datas: json.data });
                    if (this.state.total <= 10) {
                      this.setState({
                        isPagination: false
                      })
                    } else if (json.result >= 1000) {
                      document.cookie = "Tonken=" + '';
                      hashHistory.push("/My");
                    }
                  }
                }.bind(this)
              });
            }

          }.bind(this)
      })
      
    } else {
      hashHistory.push("/My");
    }

  }
  render() {
    let datas = this.state.datas;
    let list = [];
    if (datas) {
      datas.map((item, index) => {
        let titles = '';
        if (item.TypeName.split(' ').length > 1) {
          titles = this.state.isTiyan == 0 ? item.TypeName.split(' ')[0] + ' 体验课' : item.TypeName
        } else {
          titles = item.TypeName
        }
        list.push(
          <li key={index}>
            <span className="word-width">{titles}</span>
            <span>{item.Hours > 0 ? '+' + item.Hours : item.Hours}</span>
            <span className="word-time">{item.CreateTime}</span>
          </li>
        )
      })
    } else {
      list.push(
        <li style={{ borderBottom: "none" }} key="1">
          <p style={{ margin: '0 auto' }}>没有课时记录</p>
        </li>
      );
    }
    return (
      <div>
        <div className="mybox">
          <div className="mybox-top">

            <div className="myphotobox" style={{ "width": "2rem", "height": "2rem", "borderRadius": "0" }}>
              <Canvas />
            </div>

            <div className="classbox">
              <div className="surplus"><span></span>剩余课时<i>{this.state.StudentTimeCount}</i></div>
              <div className="complete"><span></span>已用课时<i>{this.state.usedClasshour}</i></div>
              <p style={{ fontSize: '12px', color: '#777474', marginTop: '0.2rem' }}>有效期：{this.state.time}</p>
            </div>
            <div className="paybox">
              <a href="h5index/index.html#taocan" className="payBtn" style={{ marginBottom: '0.4rem' }}>购买课时</a>
              <a href={`${urlsguan}h5active/exchangeInput1.html`} className="payBtn" style={{ background: '#fff', border: '1px solid #FF6600', color: "#FF6600" }}>兑换课时</a>
            </div>
          </div>
        </div>
        <div className="classHourbox" style={{ paddingBottom: '0px' }}>
          <div className="titlebox">
            <span></span>
            <h2>课时记录</h2>
          </div>
          <ul className="myNavListbox">
            {list}
          </ul>
        </div>
      </div>
    )
  }
}
