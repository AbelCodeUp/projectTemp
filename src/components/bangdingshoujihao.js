/**
 * Created by Administrator on 2017/9/7.
 */
import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import $ from 'jquery';
import Popup from './popUp';

export default class My_personCenter_changePs extends Component {
    constructor() {
        super();
        this.state = {
            //注册手机号
            modile: null,
            primaryuserid: null,
            openid: null,
            count: 60,
            liked: true,
            hrefs: null,
            result: ''
        }
    }
    componentDidMount() {

    }
    handleNewMobile() {
        let phonereg = /^1[0-9]{10}$/;
        if(!phonereg.test(this.refs.newPhone.value)){
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
        if (this.refs.newPhone.value == "") {
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
        if(!Codereg.test(this.refs.newCode.value)){
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
        if (this.refs.newCode.value == "") {
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
        var psreg = /^[0-9a-zA-Z]{6,}$/;
        if(!psreg.test(this.refs.password.value)){
            this.setState({
                result: '密码只能是6-18位的字母或数字'
            })
            this.refs.password.value == '';
            this.refs.password.focus();
            let that = this;
            setTimeout(function () {
              document.getElementsByClassName('bg')[0].style.display = 'block';
            }, 500);
            setTimeout(function () {
              document.getElementsByClassName('bg')[0].style.display = 'none';
              /*history.go(0);*/
            }, 1500)
            return false;
        }
        if (this.refs.password.value == '') {
            this.setState({
                result: '密码不能为空'
            })
            this.refs.password.focus();
            let that = this;
            setTimeout(function () {
              document.getElementsByClassName('bg')[0].style.display = 'block';
            }, 500);
            setTimeout(function () {
              document.getElementsByClassName('bg')[0].style.display = 'none';
              /*history.go(0);*/
            }, 1500)
            return false;
        }
        //绑定手机号${this.state.openid}${this.state.modile}${this.state.primaryuserid}
        function GetCookie(sName) {
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
        let openIds = GetCookie("openId");
        var channelId = location.href.slice(location.href.lastIndexOf('?') + 1).split('&')[1].split('=')[1];
        //fetch(`http://learnapi.gogo-talk.com:8333/api/Register/UserRegister?OpenId=${openIds}&Phone=${this.refs.newPhone.value}&Code=${this.refs.newCode.value}&Password=${this.refs.password.value}&channelId=${channelId}`,
        $.ajax({
            type: "GET",
            url: urls + `api/Register/UserRegister?OpenId=${openIds}&Phone=${this.refs.newPhone.value}&Code=${this.refs.newCode.value}&Password=${this.refs.password.value}&channelId=${channelId}`,

            dataType: "json",
            success: function (json) {
                if (json.result == 2) {
                    document.cookie = "Tonken=" + json.data.userToken;
                    window.localStorage.setItem('Tonken', json.data.userToken);
                    if (location.href.split('?').length > 2) {
                        var id = location.href.slice(location.href.lastIndexOf('?') + 1).split('&')[0].split('=')[1];
                        if (id) {
                            window.location.href = urlsguan+'#/My_class_hours/My_order_no?goodId=' + id + '&channelId=' + channelId;
                        } else {
                            location.href = urlsguan+'#/My';
                        }
                    } else {
                        location.href = urlsguan+'#/My';
                    }
                } else {
                    alert(json.msg);
                }
            }.bind(this)
        });

        //}

    }
    handleClickyzm() {
        if (this.refs.newPhone.value != '') {
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
                        this.refs.fsyam.innerHTML = '重新发送';
                        this.refs.newPhone.disabled = false;
                        clearInterval(this.timer);
                    }
                    this.setState({
                        count: count
                    });
                }, 1000);
            }
            $.ajax({
                type: "GET",
                url: urls + `api/Register/GOgotalk_SendPhoneCode?Phone=${this.refs.newPhone.value}&code=${GetCookie("openId")}`,
                dataType: "json",
                success: function (json) {
                    if (json.result == 2) {
                    }
                }.bind(this)
            });

        }
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
        let text = this.state.liked ? '获取验证码' : this.state.count + '秒后重发';
        return (
            <div>
                <div ref="signin" className="signin" >
                    <div className="yanzhengP">
                        <p>绑定手机号</p>
                    </div>
                    <ul className="myPersonCenterbox yanzhengP-ul">
                        <li ref="newPhoneLi">
                            <input style={{ width: '100%' }} ref="newPhone" type="text" onChange={(e) => this.phoneChange(e.target.value)} placeholder="请输入新手机号码" className="yanzhen" maxLength="11" />
                        </li>
                        <li ref="newCodeLi">
                            <input style={{ width: '58%' }} ref="newCode" type="text" placeholder="请输入短信验证码" className="yanzhen" maxLength="4" />
                            <button ref="fsyam" type="button" className="yanzhenBtn"
                                onClick={this.handleClickyzm.bind(this)} style={{ background: '#ccc', cursor: 'not-allowed' }}>{text}</button>
                        </li>
                        <li ref="newPhoneLi">
                            <input style={{ width: '100%' }} ref="password" type="password" placeholder="请设置密码" className="yanzhen" maxLength="18" minLength='6' />
                        </li>
                    </ul>
                    <a className="saveBtn" onClick={this.handleNewMobile.bind(this)}>完成</a>

                </div>
                <Popup data={this.state.result} />
            </div>
        )
    }
}
