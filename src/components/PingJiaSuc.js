/**
 * Created by Administrator on 2017/8/24.
 */
import React, { Component } from 'react';
import Footer from './footer';
import { Link,hashHistory } from 'react-router';
import { Rate } from 'antd';
import $ from 'jquery';
import store from '../redux/store';
import actions from '../redux/actions';

function GetCookie(sName) {
    let aCookie = document.cookie.split("; ");
    for (let i = 0; i < aCookie.length; i++) {
        let aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return null;
}
export default class MyAppointment extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            isDingji: false,
        }
    }
    componentWillMount(){
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = decodeURIComponent(c);
        });

        if (GetCookie('Tonken') || localStorage.getItem('Tonken')) {
            $.getScript('https://res.wx.qq.com/open/js/jweixin-1.0.0.js', function (response, status) {                            
                $.ajax({
                    type: "GET",
                    url: urls + "api/Share/ShareByWebChat",
                    dataType: "json",
                    data: { url: location.href.split('#')[0] },
                    success: function (data) {
                        try {
                            data = eval("(" + data + ")");
                        } catch (e) { }
                        if (data.result == 1) {
                            wx.config({
                                debug: false,
                                appId: data.data.appId,
                                timestamp: data.data.timeStamp,
                                nonceStr: data.data.nonceStr,
                                signature: data.data.sign,
                                jsApiList: [
                                    'checkJsApi',
                                    'onMenuShareTimeline',
                                    'onMenuShareAppMessage'
                                ]
                            });
                            wx.ready(function () {
                                var shareData = {
                                    title: '我给孩子报了超棒的外教课！你也带宝贝来一起学啊！',
                                    desc: '99元4节课！随时开班，hi翻外教课堂！',
                                    link: urlsguan + 'h5active/detail_share_yao.html?stuid=' + ret.studentid,
                                    imgUrl: 'http://wx.gogo-talk.com/images/one2more.png',
                                    success: function (res) {
                                        $.ajax({
                                            type: "POST",
                                            url: urls + 'api/HomePage/GettchCommentPoints?LessonId='+ret.lessonid,
                                            headers: { Authorization: localStorage.getItem('Tonken') },
                                            dataType: "json",
                                            success: function (json) {  
                                            }.bind(this),
                                            error:function(){
                                            }
                                        });
                                    }
                                };
                                wx.onMenuShareAppMessage(shareData);
                                wx.onMenuShareTimeline(shareData);
                            });
                            wx.error(function (res) {
                                // alert(res.errMsg);
                            });
                        } else {
                            console.log("异常错误");
                        }
                    }.bind(this)
                });
            });
        }else{
            var access_code = GetQueryString('code');
            if (access_code != null && access_code != "") {
                $.get(urls + "api/User/LoginByWeChat?code=" + access_code, data => {
                    if (data.result == 1) {
                        var openid = data.msg;
                        document.cookie = "openId=" + openid;
                        this.setState({
                            isOpen: true
                        })
                    }
                    else if (data.result == 2) {
                        document.cookie = "Tonken=" + data.data.userToken;
                        window.localStorage.setItem('Tonken', data.data.userToken);

                        window.location.reload();

                    } else if (data.result >= 1000 || data.result == 0) {
                        document.cookie = "Tonken=" + '';
                        window.localStorage.setItem('Tonken', '');
                        window.location.reload();
                    }
                })
            } else {
                var curUrl = location.href;
                var url = "https://open.weixin.qq.com/connect/oauth2/authorize";
                url += "?appid=wxcd96ac91c795045f&redirect_uri=" + encodeURIComponent(curUrl) + "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
                location.href = url;
                return false;
            }
            function GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
        }
    }
    
   
    handleFengxiang() {
        this.refs.okFenxiang.style.display = "block";
    }
    handleChange = (value) => {
        this.setState({ value });
    }
    hideFenxiangClick() {
        this.refs.okFenxiang.style.display = 'none';
    }
    render() {
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = decodeURIComponent(c);
        });
        const { num } = ret;
        return (
            <div>
                    <div>
                        <div className="fenXiangYe" ref="fenXiangYe" style={{display:"block"}}>
                            <div><img src="./images/success.png" alt="" /></div>
                            <div>评价成功！</div>
                            <div><Rate value={num} disabled onChange={this.handleChange} style={{ color: '#DC2828', display: 'inherit', flexWrap: 'nowrap', border: 'none', height: '20px' }} /></div>
                            <div style={{width:'80%',wordWrap:'break-word',margin:'0 auto',fontSize:'14px',marginBottom:'0.4rem'}}></div>
                            <div style={{marginTop:'1rem'}}><button onClick={this.handleFengxiang.bind(this)}>点击去分享</button></div>
                            <div style={{textAlign:'center',fontSize:'16px',color:'#aaa'}}>分享评价到朋友圈可再获取<span style={{color:'#FF6600',fontSize:'18px'}}> 10 </span>积分！</div>
                        </div>
                        <div className="okFenxiang" ref="okFenxiang" onClick={this.hideFenxiangClick.bind(this)}>
                            <img src="./images/fengXiangTiShi.png" alt="" />
                        </div>
                    </div>
            </div>
        )
    }
}