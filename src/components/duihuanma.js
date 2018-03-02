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
export default class duihuanma extends Component {
    constructor() {
        super();
        this.state = {
            carNumber:0
        }
    }
    componentDidMount() {
        var qrcode = new QRCode(document.getElementById("qrcode"));
        function makeCode(urlss) {
            //var elText = document.getElementById("text");

            if (!urlss) {
                alert("Input a text");
                elText.focus();
                return;
            }

            qrcode.makeCode(urlss);
        }

        
        $.ajax({
            type: "GET",
            url: urls + 'api/ExChange/CardNumber',
            headers: { Authorization: GetCookie('Tonken') },
            dataType: "json",
            data: {
                CreateTel: this.props.params.id
            },
            success: function (json) {
                if (json.result == 1) {
                    makeCode('My_duihuanma2/' + json.data._carNumber);
                    this.setState({
                        carNumber:json.data._carNumber
                    })
                    console.log(json.data._carNumber)
                }
            }.bind(this)
        });


    }
    handleFengxiang() {
        this.refs.okFenxiang.style.display = "block";
        //console.log(urlsguan + 'h5index/detail_share.html?phone='+this.props.params.id)
        //分享
        $.getScript('https://res.wx.qq.com/open/js/jweixin-1.0.0.js', function (response, status) {

            $.get(urls + "api/Share/ShareByWebChat", { url: location.href }, function (data) {
                try {
                    data = eval("(" + data + ")");
                } catch (e) { }
                if (data.result == 1) {
                    console.log(data.data.sign);
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
                            title: '3-12岁，在家跟优质外教hi翻英语！',
                            desc: '99元/4节课，立刻体验！趣味化教学，互动式学习，让孩子组队快乐学英语！',
                            link: urlsguan + 'h5index/detail_share.html?phone='+this.props.params.id,
                            imgUrl: 'http://wx.gogo-talk.com/images/one2more.png'
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
            });
        })
    }
    hideFenxiangClick() {
        this.refs.okFenxiang.style.display = 'none';
    }
    render() {
        return (
            <div>
                <div className="exchangebox">
                    <img src="./images/duihuan/duihuanbg.png" alt="" />
                </div>
                <div className="exchange2box">
                    <div className="exchangeNumbox">
                        <h2>课时兑换码：{this.state.carNumber}</h2>
                        <p>有效期：<span>2017-09-12</span></p>
                    </div>
                </div>
                <div className="erwei">
                    <div className="erweiimg">
                        <div id='qrcode'></div>
                    </div>
                    <p className="erword">长按二维码兑换课时</p>
                    <span className="zensong" onClick={this.handleFengxiang.bind(this)}>赠送给好友</span>
                </div>
                <div className="okFenxiang" ref="okFenxiang" onClick={this.hideFenxiangClick.bind(this)}>
                    <img src="./images/fengXiangTiShi.png" alt="" />
                </div>
            </div>
        )
    }
}
