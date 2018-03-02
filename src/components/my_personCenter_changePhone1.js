import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import $ from 'jquery';
import Popup from './popUp';
function GetCookie(sName) {
  let aCookie = document.cookie.split("; ");
  for (let i = 0; i < aCookie.length; i++) {
    let aCrumb = aCookie[i].split("=");
    if (sName == aCrumb[0])
      return unescape(aCrumb[1]);
  }
  return null;
}
export default class My_personCenter_changePhone1 extends Component {
  constructor() {
    super();
    this.state = { Mobiles: '', haoma: '', liked: true, count: 60 ,result:''}
  }
  componentDidMount() {
    $.ajax({
      type: "GET",
      url: urls + 'api/HomePage/GetStudentInfo',
      headers: { Authorization: GetCookie('Tonken') },
      dataType: "json",
      success: function (json) {
        if (json.result == 1) {
          var Mobiles = json.data.Mobile.substring(0, 3) + "****" + json.data.Mobile.substring(7);
          this.setState({ Mobiles, haoma: json.data.Mobile });
        }
      }.bind(this)
    });
  }
  /*获取验证码*/
  handleClick() {
   
    $.ajax({
      type: "GET",
      url: urls + `api/HomePage/SendChangePwdSMS?cell=${this.state.haoma}`,
      headers: { Authorization: GetCookie('Tonken') },
      dataType: "json",
      success: function (json) {
        console.log(json);
      }.bind(this)
    });
    
    if (this.state.liked) {
      this.timer = setInterval(() => {
        let count = this.state.count;
        this.state.liked = false;
        count -= 1;
        if (count == 0) {
          this.setState({
            liked: true
          });
          count = 60;
          this.refs.yanzhen.innerHTML='重新发送'
          clearInterval(this.timer);
        }
        this.setState({
          count: count
        });
      }, 1000);
    }
  }
  /*校验原手机号*/
  handleOldMobile() {
    let yzms = this.refs.PhoneNum.value;
    if (yzms=='') {
      this.setState({
          result: '验证码不能为空'
      })
      this.refs.PhoneNum.focus();
      let that = this;
      setTimeout(function () {
        document.getElementsByClassName('bg')[0].style.display = 'block';
      }, 500);
      setTimeout(function () {
        document.getElementsByClassName('bg')[0].style.display = 'none';
        /*history.go(0);*/
      }, 1500)
      return false
  }
    let Codereg = /^[0-9]{4}$/;
    if(!Codereg.test(yzms)){
      this.setState({
          result: '验证码只能是4位的数字'
      })
      this.refs.PhoneNum.value == "";
      this.refs.PhoneNum.focus();
      let that = this;
      setTimeout(function () {
        document.getElementsByClassName('bg')[0].style.display = 'block';
      }, 500);
      setTimeout(function () {
        document.getElementsByClassName('bg')[0].style.display = 'none';
        /*history.go(0);*/
      }, 1500)
      return false
  }
  
    $.ajax({
      type: "GET",
      url: urls + `api/HomePage/ExistMobilCode?cell=${this.state.haoma}&&code=${yzms}&&type=0`,
      headers: { Authorization: GetCookie('Tonken') },
      dataType: "json",
      success: function (json){
        console.log(json);
        if (json.result == 0) {
          layer.msg(json.msg);
          return false;
        }
        /*hashHistory.push('/My_personCenter/My_personCenter_changePhone2');*/
        hashHistory.push({ pathname: '/My_personCenter/My_personCenter_changePhone2', state: { haoma: this.state.haoma } })
      }.bind(this)
  });
  }
  render() {
    var text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
    return (
      <div>
        <ul className="myPersonCenterbox">
          <li>
            <span className="phonebox">{this.state.Mobiles}</span>
          </li>
          <li>
            <input ref="PhoneNum" type="text"  placeholder="请输入短信验证码" className="yanzhen" maxLength="4" />
            <button type="button" ref='yanzhen' className="yanzhenBtn" onClick={this.handleClick.bind(this)}>{text}</button>
          </li>
        </ul>
        <a className="saveBtn" onClick={this.handleOldMobile.bind(this)}>确定</a>
        <Popup data={this.state.result} />
      </div>
    )
  }
}
