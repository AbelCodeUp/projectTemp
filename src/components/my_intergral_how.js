/**
 * Created by W520-1 on 2017/8/21.
 */
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import $ from 'jquery';
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
export default class my_intergral_how extends Component {
    constructor() {
        super();
        this.state = {
            openid: null,
            liked: true,
            count: 60,
            isPerfectData:false,
            isCircleOfFriends:false
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
            //var access_code = GetQueryString('code');
            //if (access_code != null && access_code != "") {
                // var that = this;
                // this.setState({
                //     codeNum: access_code
                // });
            //     if (this.state.aa == 1) {
            //         jQuery.get(urls + "api/User/LoginByWeChat?code=" + access_code, data => {
            //             if (data.result == 1) {
            //                 this.setState({
            //                     isOpen: true
            //                 });
            //                 that.setState({
            //                     openid: data.msg
            //                 })
            //             } else if (data.result == 2) {
            //                 this.setState({
            //                     isOpen: false
            //                 });
            //                 document.cookie = "Tonken=" + data.data.userToken;
            //             }
            //         })
            //     }
            // //}
            // else{
            //     var curUrl = location.href;
            //     var url = "https://open.weixin.qq.com/connect/oauth2/authorize";
            //     url += "?appid=wxcd96ac91c795045f&redirect_uri=" + encodeURIComponent(curUrl) + "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
            //     location.href = url;
            // }

            $.ajax({
                type: "GET",
                url: urls + "api/HomePage/GetRecommendedCourses",
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == -2) {
                        hashHistory.push("/")
                    } else if (json.result == 1) {

                    }
                }.bind(this)
            });
            $.ajax({
                type: "GET",
                url: urls + "api/HomePage/GetIntegralState",//是否完善资料与分享朋友圈
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == 1) {
                        const newUser = json.data;
                        this.setState({
                            isPerfectData: json.data.PerfectData,
                            isCircleOfFriends: json.data.CircleOfFriends
                        })
                    }
                }.bind(this)
            });

        } else {
            hashHistory.push("/My");
        }
    }

    
    render() {
        let coms = this.state.isCircleOfFriends?'score completed':'score no-completed';
        let comsData = this.state.isPerfectData?'score completed':'score no-completed';
        
        return (
            <div className="classHourbox">
                <div id="indexssThree">
                    <div className="titlebox">
                        <span></span>
                        <h2>如何获取</h2>
                    </div>
                    <ul className="myNavListbox">
                        <li>
                            <span className="word-width">首次分享“我的邀请函”到朋友圈</span>
                            <span className="word-right" style={{marginLeft:'-0.2rem'}}>+225积分</span>
                            <i className={coms}></i>
                        </li>
                        <li>
                            <span className="word-width">完成课后评价</span>
                            <span className="word-right" style={{marginLeft:'-0.5rem'}}>+5积分</span>
                            <i className="score no-time"></i>
                        </li>
                        {/* <li>
                            <span className="word-width">首次完善资料</span>
                            <span className="word-right">+50积分</span>
                            <i className={comsData}></i>
                        </li>
                        <li>
                            <span className="word-width">首次设定密码</span>
                            <span className="word-right">+30积分</span>
                            <i className="score completed"></i>
                        </li>
                        <li>
                            <span className="word-width">上课结束分享</span>
                            <span className="word-right">+10积分</span>
                            <i className="score no-time"></i>
                        </li> */}
                        
                        <li>
                            <span className="word-width">课后评价成功后分享到朋友圈</span>
                            <span className="word-right" style={{marginLeft:'-0.3rem'}}>+10积分</span>
                            <i className="score no-time"></i>
                        </li>
                        <li>
                            <span className="word-width">邀请朋友购买4课时套餐</span>
                            <span className="word-right" style={{marginLeft:'-0.2rem'}}>+225积分</span>
                            <i className="score no-time"></i>
                        </li>
                        <li>
                            <span className="word-width">邀请朋友购买30课时套餐</span>
                            <span className="word-right">+1125积分</span>
                            <i className="score no-time"></i>
                        </li>
                        <li>
                            <span className="word-width">邀请朋友购买60课时套餐</span>
                            <span className="word-right">+1125积分</span>
                            <i className="score no-time"></i>
                        </li>
                        <li>
                            <span className="word-width">邀请朋友购买120课时套餐</span>
                            <span className="word-right">+1125积分</span>
                            <i className="score no-time"></i>
                        </li>
                    </ul>
                    <a href={urlsguan+"h5active/index.html?stuid="+this.props.params.id} className="invite">参与邀请活动，赠送积分哦！<br /><span className="go">点击去参与>></span></a>
                </div>
            </div>
        )
    }
}
