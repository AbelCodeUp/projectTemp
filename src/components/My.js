import React, { Component } from 'react';
import Footer from './footer';
import { Link } from 'react-router';
import jQuery from '../js/jquery-3.2.0';
import Bangding from './bangdingshoujihao';
import { hashHistory } from 'react-router';
import $ from 'jquery';
import layer from 'layer-mobile';



function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


function GetCookie(sName) {
    let aCookie = document.cookie.split("; ");
    for (let i = 0; i < aCookie.length; i++) {
        let aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return null;
}

export default class My extends Component {
    constructor() {
        super();
        this.state = {
            personInfo: { Gender: '' },
            gender: '',
            age: '',
            couponCount: 0,
            studentTimeCount: 0,
            totalPoints: 0,
            classInfo: null,
            user: {},
            isOpen: false,
            codeNum: null,
            aa: 1
        }
    }

    componentDidMount() {
        layer.open({
            content: `<div class="chunjie_dialog"><img id="chunjie_close" class="close" src='${require('../images/_close.png')}' alt="" /><img id="gochunjie" class="active" src='${require('../images/_chunjie.png')}' alt="" /></div>`
            , className: "chunjie"
        });

        $('#chunjie_close').click(e => {
            layer.closeAll();
        })

        $('#gochunjie').click(e => {
            layer.closeAll();
            hashHistory.push(`/My_invitation?StudentId=${this.state.personInfo.StudentId}&EName=${this.state.personInfo.EName}`)
        })
    }

    componentWillMount() {

        // 本地测试
        // fetch(urls + "api/Register/Login",
        //     {
        //         method: "POST",
        //         headers: {
        //             "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        //         },
        //         body: 'UserName=15810622710&Password=000000'
        //     })
        //     .then(res => res.json())
        //     .then(json => {
        //         if (json.result == 2) {
        //             document.cookie = "Tonken=" + json.data.userToken;
        //             window.localStorage.setItem('Tonken', json.data.userToken);
        //         }
        //     });
        if (GetCookie("Tonken")) {


            /*判断是否需要定级*/
            $.ajax({
                type: "GET",
                url: urls + "api/HomePage/GetRecommendedCourses",
                headers: { Authorization: GetCookie('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == -2) {
                        hashHistory.push("/courseSurvew/3")
                    } else if (json.result == 1) {
                        /*获取学生信息*/
                        $.ajax({
                            type: "GET",
                            url: urls + 'api/HomePage/GetStudentInfo',
                            headers: { Authorization: GetCookie('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result == 1) {
                                    let gender = json.data.Gender;
                                    let HeadImg = json.data.HeadImg;
                                    if (gender == 0) {
                                        gender = "girl";
                                    } else {
                                        gender = "boy";
                                    }
                                    let age = json.data.Birthday.slice(12);
                                    age = age.slice(0, age.length - 1);
                                    this.setState({ personInfo: json.data, gender, age });
                                } else if (json.result >= 1000 || json.result == 0) {
                                    document.cookie = "Tonken=" + '';
                                    window.location.reload();
                                }
                            }.bind(this)
                        });

                        /*获取优惠券信息*/
                        $.ajax({
                            type: "POST",
                            url: urls + 'api/GiveCouponIntegral/GetCouponListStudent?status=0',
                            headers: { Authorization: GetCookie('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result >= 1000) {
                                    document.cookie = "Tonken=" + '';
                                    window.location.reload();
                                } else {
                                    this.setState({ couponCount: json.NotUserCount })
                                }
                            }.bind(this)
                        });
                        /*获取课时*/
                        $.ajax({
                            type: "GET",
                            url: urls + 'api/Lesson/GetClassHour',
                            headers: { Authorization: GetCookie('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result == 1) {
                                    this.setState({ studentTimeCount: json.data.StudentTimeCount });
                                } else if (json.result >= 1000) {
                                    document.cookie = "Tonken=" + '';
                                    window.location.reload();
                                }
                            }.bind(this)
                        });
                        /*获取学生总积分*/
                        $.ajax({
                            type: "GET",
                            url: urls + 'api/HomePage/GetStudentAllScore',
                            headers: { Authorization: GetCookie('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result >= 1000) {
                                    document.cookie = "Tonken=" + '';
                                    window.location.reload();
                                } else if (json.result == 0) {
                                    this.setState({ totalPoints: 0 });
                                } else {
                                    if (json.data.length > 0) {
                                        this.setState({ totalPoints: json.data[0] });
                                    }
                                }
                            }.bind(this)
                        });
                        /*获取考勤信息*/
                        $.ajax({
                            type: "GET",
                            url: urls + 'api/HomePage/GetOrdinaryStudentInfo',
                            headers: { Authorization: GetCookie('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result >= 1000) {
                                    document.cookie = "Tonken=" + '';
                                    window.location.reload();
                                } else {
                                    this.setState({ user: json.data });
                                }
                            }.bind(this)
                        });
                    } else if (json.result >= 1000) {
                        document.cookie = "Tonken=" + '';

                        window.location.reload();
                    }
                }.bind(this)
            });

        }
        else {
            var access_code = GetQueryString('code');
            if (access_code != null && access_code != "") {
                jQuery.get(urls + "api/User/LoginByWeChat?code=" + access_code, data => {
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

    render() {
        let imgurl = '';
        if (this.state.personInfo.HeadImg == '') {
            if (this.state.personInfo.Gender == 1) {
                imgurl = '../images/boy.png'
            } else {
                imgurl = '../images/girl.png'
            }
        } else {
            imgurl = this.state.personInfo.HeadImg
        }
        let isOpenShows = !this.state.isOpen ? { display: 'block', width: '100%', height: `${document.documentElement.clientHeight}px`, 'position': 'relative' } : { display: 'none' };
        let isOpenShow = this.state.isOpen ? { display: 'block' } : { display: 'none' };
        return (
            <div>
                <div className='appBodyBox' style={isOpenShows}>
                    <div className='appConwlh' style={{ position: 'absolute', left: '0px', top: '0px', width: '100%', height: "90vh", overflow: 'auto' }}>
                        <div ref="My">
                            <div className="mybox">
                                <div className="mybox-top">
                                    <Link to="/My_personCenter">
                                        <div style={{ overflow: 'hidden' }}>
                                            <div className="myphotobox">
                                                <img src={imgurl} alt="" />
                                            </div>
                                            <div className="mynamebox" style={{ float: 'left' }}>
                                                <h2>{this.state.personInfo.EName}</h2>
                                                <p>
                                                    {
                                                        this.state.gender == '' ? ''
                                                            : <span>
                                                                <span
                                                                    className={this.state.gender}>{this.state.personInfo.Gender == 1 && this.state.personInfo.Gender != '' ? '男' : '女'}</span><span>{this.state.age}</span>
                                                            </span>
                                                    }
                                                </p>
                                                {/*<p><span className="girl">女</span><span className="boy" style={{display: 'none'}}>男</span><span>9岁</span></p>*/}
                                            </div>
                                            <div style={{ float: 'right', lineHeight: '1.974rem' }}>
                                                <i className="iconfont gray" style={{ fontSize: '20px' }}>&#xe64a;</i>
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                                <ul>
                                    <li className="word-blue">
                                        <h2>{this.state.user.AccumulateCount}</h2>
                                        <p>累计上课(次)</p>
                                    </li>
                                    <li className="shu-line">

                                    </li>
                                    <li className="word-orange">
                                        <h2>{this.state.user.LateCount}</h2>
                                        <p>上课迟到(次)</p>
                                    </li>
                                    <li className="shu-line">

                                    </li>
                                    <li className="word-red">
                                        <h2>{this.state.user.AbsentCount}</h2>
                                        <p>上课缺席(次)</p>
                                    </li>
                                </ul>
                            </div>
                            {/*!-- 我的列表 start -->*/}
                            <ul className="myNavListbox">
                                <li>
                                    <Link to="/My_guidance">
                                        <i className="iconfont" style={{ fontSize: '16px' }}>&#xe612;</i>入学指导<span><i
                                            className="iconfont gray">&#xe64a;</i></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/My_class_hours">
                                        <i className="iconfont">&#xe621;</i>我的课时<span><b>{this.state.studentTimeCount}课时</b><i
                                            className="iconfont gray">&#xe64a;</i></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/My_order"><i className="iconfont">&#xe65a;</i>我的订单<span><i
                                        className="iconfont gray">&#xe64a;</i></span></Link>
                                </li>
                                <li>
                                    <Link to={`/My_invitation?StudentId=${this.state.personInfo.StudentId}&EName=${this.state.personInfo.EName}`}>
                                        <i className="iconfont" style={{ fontSize: '26px', position: 'relative', left: '-0.15rem', top: '0.1rem', marginRight: '0.1rem' }}>&#xe605;</i>邀请好友<span><b style={{ color: '#DC2828' }}>邀请好友得积分</b><i
                                            className="iconfont gray">&#xe64a;</i></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/My_intergral/" + this.state.personInfo.StudentId}>
                                        <i className="iconfont">&#xe66a;</i>我的积分<span><b>{this.state.totalPoints}积分</b><i
                                            className="iconfont gray">&#xe64a;</i></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/My_coupon_noUsed/" + this.state.personInfo.StudentId}>
                                        <i className="iconfont">&#xe62a;</i>我的优惠券<span><b>{this.state.couponCount}张</b><i
                                            className="iconfont gray">&#xe64a;</i></span>
                                    </Link>
                                </li>
                                <li style={{ border: '0px' }}>
                                    <a href={urlsguan + "h5active/exchangeInput1.html?carNum=" + this.state.personInfo.Mobile + "&StudentID=" + this.state.personInfo.StudentId}>
                                        <i className="iconfont">&#xe602;</i>使用兑换码<span><i
                                            className="iconfont gray">&#xe64a;</i></span>
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </div>

                    {/*尾部start*/}
                    <Footer num="3" />
                </div>
                {/*绑定手机号start*/}
                <div ref="Bd" style={isOpenShow}><Bangding /></div>
                {/*绑定手机号end*/}
            </div>

        )
    }
}
