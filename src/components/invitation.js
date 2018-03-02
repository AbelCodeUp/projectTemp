/**
 * Created by Administrator on 2017/9/7.
 */
import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import $ from 'jquery';
require('../js/qrcode1.js');

function GetCookie(sName) {
    let aCookie = document.cookie.split("; ");
    for (let i = 0; i < aCookie.length; i++) {
        let aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return null;
}

export default class Invitation extends Component {
    constructor() {
        super();
        this.state = {
            eName: '',
            id:0
        }
    }
    componentWillMount() {
        if (GetCookie('Tonken') || localStorage.getItem('Tonken')) {

            // let stuId = this.props.params.id;
            let ret = {};//定义数组
            location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
                ret[b] = decodeURIComponent(c);
            });
            let stuId = ret.StudentId;
            this.setState({
                eName: ret.EName
            })
            // var qrcode = new QRCode(this.refs.Code, {
            //     width : 136,
            //     height : 136
            // });

            //分享
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
                                    link: urlsguan + 'h5active/detail_share_yao.html?stuid=' + stuId,
                                    imgUrl: 'http://wx.gogo-talk.com/images/one2more.png',
                                    success: function (res) {
                                        $.ajax({
                                            type: "POST",
                                            url: urls + 'api/HomePage/GetInvitationPoints',
                                            headers: { Authorization: localStorage.getItem('Tonken') },
                                            dataType: "json",
                                            success: function (json) {
                                            }.bind(this),
                                            error: function (err) {
                                            }.bind(this)
                                        });
                                    }
                                };
                                wx.onMenuShareAppMessage({
                                    title: '我给孩子报了超棒的外教课！你也带宝贝来一起学啊！',
                                    desc: '99元4节课！随时开班，hi翻外教课堂！',
                                    link: urlsguan + 'h5active/detail_share_yao.html?stuid=' + stuId,
                                    imgUrl: 'http://wx.gogo-talk.com/images/one2more.png'
                                });
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
        } else {
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
    componentDidMount() {
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = decodeURIComponent(c);
        });
        let stuId = ret.StudentId;

        var qrcode = new QRCode(document.getElementById("qrcode"));
        function makeCode(urlss) {
            if (!urlss) {
                alert("Input a text");
                elText.focus();
                return;
            }
            qrcode.makeCode(urlss);
        }
        makeCode(urlsguan + 'h5index/index.html?stuid=' + stuId);
    }
    handleFengxiang() {
        this.refs.okFenxiang.style.display = "block";
    }
    hideFenxiangClick() {
        this.refs.okFenxiang.style.display = 'none';
    }
    render() {
        return (
            <div style={{ overflow: "hidden" }}>

                <div className="exchangebox3">
                    <div className="rewardRules">
                        <a href={urlsguan + 'h5active/index.html?stuid=' + this.props.location.query.StudentId} ref='yaoqinga' className="lookgz" style={{ textDecoration: 'underline' }}>
                            奖励规则
                        </a>
                    </div>
                    <img src="./images/mycode-banner.png" alt="" />
                    <div className="gongxibox" style={{ height: "auto" }}>
                        <div className="gongxi">
                            <p>hi翻外教课堂</p>
                            <p>欢乐课堂 结伴同享</p>
                            <p className="gongxibottom">优质外教 丨 3-12周岁 丨 一对六精品小班</p>
                        </div>
                    </div>
                </div>
                <div className="exchangeConbox" id='box'>
                    <div className="imgbox2" >
                        {/* <img src="../images/detail_code.png" alt="" /> */}
                        <div id='qrcode' ref="qrcode" style={{width:"100%",height:"100%",background:"white",borderRadius:"20px",padding:"0.35rem"}}></div>
                    </div>
                    <div className="erweiWord">
                        <p><span>{this.state.eName}</span>的专属邀请二维码，扫一扫加入</p>
                        <p>“hi翻外教课堂”</p>
                    </div>
                    <div className="b_share_btn">
                        <span className="sharebtn" onClick={this.handleFengxiang.bind(this)}>
                            点击分享邀请函
	           </span>
                    </div>
                    <div style={{ padding: '0 0.65rem', textAlign: 'center', marginBottom: '0.5rem' }}>
                        <span>首次分享邀请函到微信朋友圈，即可获得225积分奖励！（300积分可兑换一课时）</span>
                    </div>

                </div>
                <div className="okFenxiang" ref="okFenxiang" onClick={this.hideFenxiangClick.bind(this)}>
                    <img src="./images/fengXiangTiShi.png" alt="" />
                </div>
            </div>
        )
    }
}
