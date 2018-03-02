import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import $ from 'jquery';
import PopUp from "./popUp";
function GetCookie(sName) {
  let aCookie = document.cookie.split("; ");
  for (let i = 0; i < aCookie.length; i++) {
    let aCrumb = aCookie[i].split("=");
    if (sName == aCrumb[0])
      return unescape(aCrumb[1]);
  }
  return null;
}
export default class my_personCenter_changePs extends Component {
  constructor() {
    super();
    this.state = {
      oldPs: '',
      newPs: ''
    }
  }
  handleClick() {

    let psReg = /^[a-zA-Z0-9]{6,18}$/;
    let oldPs = this.refs.oldPs.value;
    let newPs = this.refs.newPs.value;
    if (oldPs == '') {
      this.setState({
        result: '原密码不能为空'
      })
      this.refs.oldPs.focus();
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
    if (!psReg.test(oldPs)) {
      this.setState({
        result: '原密码只能是6-18位的字母或数字'
      })
      this.refs.oldPs.value='';
      this.refs.oldPs.focus();
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
    if (newPs == '') {
      this.setState({
        result: '新密码不能为空'
      })
      this.refs.newPs.focus();
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
    if (!psReg.test(newPs)) {
      this.setState({
        result: '新密码只能是6-18位的字母或数字'
      })
      this.refs.newPs.value='';
      this.refs.newPs.focus();
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

    if (psReg.test(oldPs) && psReg.test(newPs)) {
      this.setState({
        oldPs: this.refs.oldPs.value,
        newPs: this.refs.newPs.value
      })
      var ChangePwdByOldPwd = {
        OldPwd: this.refs.oldPs.value,
        NewPwd: this.refs.newPs.value
      }

      $.ajax({
        type: "POST",
        url: urls + 'api/HomePage/ChangePwdByOldPwd',
        headers: { "Content-type": "application/json; charset=UTF-8", Authorization: GetCookie('Tonken') },
        dataType: "json",
        data: ChangePwdByOldPwd,
        success: function (json) {
          if (json.result == 1) {
            this.setState({
              result: '密码修改成功'
            })
            let that = this;
            setTimeout(function () {
              document.getElementsByClassName('bg')[0].style.display = 'block';
            }, 500);
            setTimeout(function () {
              document.getElementsByClassName('bg')[0].style.display = 'none';
              /*history.go(0);*/
            }, 1500)
            //hashHistory.push('/My_personCenter');
          } else {
            this.setState({
              result: json.msg
            })
            let that = this;
            setTimeout(function () {
              document.getElementsByClassName('bg')[0].style.display = 'block';
            }, 500);
            setTimeout(function () {
              document.getElementsByClassName('bg')[0].style.display = 'none';
              /*history.go(0);*/
            }, 1500)
          }
          
        }.bind(this)
      });
    }
  }
  render() {
    return (
      <div>
        <div className="myPersonCenterbox">
          <div className="changebox">
            <p>原密码</p>
            <div className='psbox'><input className="oldP" ref="oldPs" type="password" placeholder="请输入原密码" maxLength='18' minLength='6'/></div>
          </div>
          <div className="changebox">
            <p>新密码</p>
            <div className='psbox'><input className="newP" ref="newPs" type="password" placeholder="请输入新密码" maxLength='18' minLength='6' /></div>
          </div>
        </div>
        <a className="saveBtn" onClick={this.handleClick.bind(this)}>确定</a>
        <PopUp data={this.state.result} />
      </div>
    )
  }
}
