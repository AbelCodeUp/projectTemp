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
export default class My_personCenter_changePhone2 extends Component {
  constructor() {
    super();
    this.state = { liked: true, count: 60 ,result:''};
  }
  /*获取验证码*/
  handleClick() {
    
    let ps = /^1[0-9]{10}$/;
    if (this.refs.newPhone.value == "" || !ps.test(this.refs.newPhone.value)) {
      //this.refs.newPhoneBox.style.border = '1px solid red';
      return false;
    } else {
      $.ajax({
        type: "GET",
        url: urls + `api/HomePage/SendSMSCode?cell=${this.refs.newPhone.value}`,
        headers: { Authorization: GetCookie('Tonken') },
        dataType: "json",
        success: function (json) {
          if (json.result == 1) {

          }
        }.bind(this)

      });
      /*获取验证码*/
      if (this.state.liked) {
        this.timer = setInterval(() => {
          let count = this.state.count;
          this.state.liked = false;
          count -= 1;
          if (count < 1) {
            this.setState({
              liked: true
            });
            count = 60;
            this.refs.fsyam.innerHTML='重新发送'
            /*document.getElementsByClassName("yanzhenBtn")[0].setAttribute("class","aa");*/
            clearInterval(this.timer);
          }
          this.setState({
            count: count
          });
        }, 1000);
      }
    }


  }
  /*校验新手机号*/
  handleNewMobile() {
    let newPhone = this.refs.newPhone.value;
    let newCode = this.refs.newCode.value;

    let phonereg = /^1[0-9]{10}$/;
    if(!phonereg.test(newPhone)){
        this.setState({
            result: '手机号只能是11位的数字'
        })
        this.refs.newPhone.value='';
        this.refs.newPhone.focus();
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
    if (newPhone == "") {
        //this.refs.newPhone.style.background = "yellow";
        this.setState({
            result: '手机号不能为空'
        })
        this.refs.newPhone.focus();
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
    if(!Codereg.test(newCode)){
        this.setState({
            result: '验证码只能是4位的数字'
        })
        this.refs.newCode.value == "";
        this.refs.newCode.focus();
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
    if (newCode == "") {
        this.setState({
            result: '验证码不能为空'
        })
        this.refs.newCode.focus();
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
      url: urls + `api/HomePage/ExistMobilCode?cell=${newPhone}&&code=${newCode}&&type=1`,
      headers: { Authorization: GetCookie('Tonken') },
      dataType: "json",
      success: function (json) {
        console.log(json);
        if (json.result == 0) {
          return false
        } else if (json.result == 1) {
          alert(json.msg);
        }
        hashHistory.push('/My_personCenter');
      }.bind(this)
    });
  }
  phoneChange(val) {
    let reg = /^1[0-9]{10}$/;
    if (reg.test(val)) {
        this.refs.fsyam.style.background = '#DC2828';
        this.refs.fsyam.style.cursor = 'auto';
        this.refs.newPhone.disabled = true;
        this.refs.newPhone.style.background = '#fff';
    }
}
  render() {
    console.log(this.props.location.state);
    var text = this.state.liked ? '获取验证码' : this.state.count + 's后重发';
    return (
      <div>
        <div className="yanzhengP">
          <p>验证新手机号</p>
        </div>
        <ul className="myPersonCenterbox yanzhengP-ul">
          <li ref='newPhoneBox'>
            <input ref="newPhone" type="text" placeholder="请输入新手机号码" onChange={(e) => this.phoneChange(e.target.value)} className="yanzhen" maxLength="11" />
          </li>
          <li>
            <input ref="newCode" type="text" placeholder="请输入短信验证码" className="yanzhen" maxLength="4" />
            <button ref="fsyam" type="button" className="yanzhenBtn" style={{ background: '#ccc', cursor: 'not-allowed' }} onClick={this.handleClick.bind(this)}>{text}</button>
          </li>
        </ul>
        <a className="saveBtn" onClick={this.handleNewMobile.bind(this)}>完成</a>
        <Popup data={this.state.result} />
      </div>
    )
  }
}
