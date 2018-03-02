/**
 * Created by Administrator on 2017/8/24.
 */
/**
 * Created by Administrator on 2017/8/24.
 */
import React, { Component } from 'react';
import Footer from './footer';
import { Link } from 'react-router';
import $ from 'jquery';
import Counter from './Counter';
function dateZhuan(str) {
    let arr1 = str.split(' ')[0].split('-');
    let arr2 = str.split(' ')[1].split(':');
    let nowDate = new Date();
    nowDate.setFullYear(arr1[0]);
    nowDate.setDate(arr1[2]);
    nowDate.setMonth(parseInt(arr1[1]) - 1);    
    nowDate.setHours(arr2[0]);
    nowDate.setMinutes(arr2[1]);
    //nowDate.setSeconds(arr2[2].substring(0,arr2[2].indexOf(".")));
    return nowDate;
}

export default class MyAppointment extends React.Component {
    constructor() {
        super();
        this.state = {
            level: null,
            times: '',
            img: null,
            title: null,
            main: null,
            aa: null,
            isTiyan:null
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
        //let str = location.href.substring(location.href.lastIndexOf("=") + 1);
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        $.ajax({
            type: "GET",
            url: urls + `api/HomePage/GetLessonDeatil?lessonId=${ret.Lessonid}`,
            headers: { Authorization: GetCookie('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    this.setState({
                        level: json.data[0].LevelName,
                        times: json.data[0].StartTime,
                        img: json.data[0].FilePath,
                        title: json.data[0].FileTittle.substring(json.data[0].FileTittle.lastIndexOf("L")),
                        main: json.data[0].Describe,
                        student: json.data[0].StudentList,
                        demandid: json.data[0].DemandId,
                        isTiyan:ret.tiyan
                    })
                }
            }.bind(this)
        });


    }
    handleKeBiao() {
        function GetCookie(sName) {
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
        $.ajax({
            type: "GET",
            url: urls + `api/Demands/CancelLesson?DemandId=${this.state.demandid}`,
            headers: { Authorization: GetCookie('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {

                } else {

                }
            }.bind(this)
        });
    }
    handleYuYuea() {
        $.ajax({
            type: "GET",
            url: urls + `api/HomePage/GetSystemTime`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                var now = dateZhuan(json.data.SysDateTime);
                var ful = dateZhuan(this.state.times);
                let timeCha = ful.getTime() - now.getTime();
                if (timeCha <= 86400000) {//24小时之内
                    $.ajax({
                        type: "GET",
                        url: urls + `api/Demands/CancelLessonCount`,
                        headers: { Authorization: localStorage.getItem('Tonken') },
                        dataType: "json",
                        success: function (json) {
                            if(json.result==1){
                                if (json.data >=0 && json.data < 2) {
                                    this.refs.cancelBox2.style.display = 'block';
                                } else if (json.data >= 2) {
                                    this.refs.cancelBox3.style.display = 'block';
                                }
                            }
                            
                        }.bind(this)
                    });
                    
                } else {//24小时之外
                    this.refs.cancelBox1.style.display = 'block';
                }
            }.bind(this)
        });

    }
    ykClick() {
        this.refs.shengyuks.style.display = "none";
        location.reload(true)
    }

    quxiaoS() {
        this.refs.cancelBox1.style.display = 'none';
    }
    quxiaoS2() {
        this.refs.cancelBox2.style.display = 'none';
    }
    quxiaoS3() {
        this.refs.cancelBox3.style.display = 'none';
    }
    quxiaoClick(){
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        this.refs.cancelBox1.style.display = 'none';
        this.refs.cancelBox2.style.display = 'none';
        this.refs.cancelBox3.style.display = 'none';
        //取消课程
        $.ajax({
            type: "GET",
            url: urls + `api/Demands/CancelLesson?DemandId=${this.state.demandid}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    this.refs.shengyuks.style.display = "block";
                    this.refs.tishi.innerHTML = "已取消预约";
                    $.ajax({
                        type: "GET",
                        url: urls + `api/Demands/ClassBookDetails?BdeId=${ret.uid}&BookingId=${ret.bid}`,
                        headers: { Authorization: localStorage.getItem('Tonken') },
                        dataType: "json",
                        success: function (json) {
                            if (json.result == 1) {
                                $.ajax({
                                    type: "GET",
                                    url: urls + `api/HomePage/GetSystemTime`,
                                    headers: { Authorization: localStorage.getItem('Tonken') },
                                    dataType: "json",
                                    success: function (json) {
                                        if (json.result == 1) {
                                            this.setState({
                                                fuwuqiTime: json
                                            })
                                        } else if (json.result >= 1000) {
                                            hashHistory.push("/My");
                                        }
                                    }.bind(this)
                                });

                                this.setState({
                                    levels: json.data[0].LevelName,
                                    FileTittles: json.data[0].FileTittle.substring(json.data[0].FileTittle.indexOf("L")),
                                    Describes: json.data[0].Describe,
                                    StartTimes: json.data[0].StartTime.substring(json.data[0].StartTime.indexOf("-") + 1),
                                    imgUrl: json.data[0].FilePath,
                                    demandid: json.data[0].DemandId,
                                    yuekeshijian: json.data[0].StartTime,
                                    lessonid: json.data[0].LessionId
                                });
                                // window.history.go(0);
                                location.href = location.href;
                            } else if (json.result >= 1000) {
                                hashHistory.push("/My");
                            }
                        }.bind(this)
                    });

                } else if (json.result >= 1000) {
                    hashHistory.push("/My");
                } else {
                    this.refs.tishi.innerHTML = json.msg
                    this.refs.shengyuks.style.display = "block";
                }
            }.bind(this)
        });
    }
    render() {
        let studrentnum = this.state.student;
        let HeaderIng = [];
        if (studrentnum == null) {

        } else {
            studrentnum.map((d, i) => {
                let stuImg = ''
                if (d.StudentImg == "") {
                    if (d.Gender == 1) {
                        stuImg = '../images/boy.png';
                    } else {
                        stuImg = '../images/girl.png';
                    }
                } else {
                    stuImg = d.StudentImg
                }
                HeaderIng.push(
                    <li>
                        <div>
                            <img src={stuImg} alt="" />
                        </div>
                        <p>{d.EName}</p>
                    </li>
                )
            });
        }



        let str = this.state.times;
        let timeStr = ''
        let isOpen = '';
        let isChlane = '';
        if (str != '') {
            let time = dateZhuan(str);
            // let time=new Date(this.state.times)
            let nowTime = new Date();
            const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '今天'];

            var weekStr = ''
            if (time.getDay() - 1 == nowTime.getDay() - 1 && time.getDate() == nowTime.getDate()) {
                weekStr = week[7];
            } else {
                weekStr = week[time.getDay()];
            }
            // let m = (time.getMonth() + 1);
            let m=parseInt(str.split('-')[1]);//解决月份多加一
            m = m < 10 ? '0' + m : m;
            let day = time.getDate();
            day = day < 10 ? '0' + day : day;
            let h = time.getHours();
            h = h < 10 ? '0' + h : h;
            let ms = time.getMinutes();
            ms = ms < 10 ? '0' + ms : ms;
            timeStr = m + '月' + day + '日（' + weekStr + '） ' + h + ":" + ms;
            let timeCha = time.getTime() - nowTime.getTime();


            let leftsecond = parseInt(timeCha / 1000);
            let day1 = Math.floor(leftsecond / (60 * 60 * 24));
            let hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
            let minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
            let second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);

            if (timeCha < 600000 && timeCha >= 0) {
                isOpen = <button type="button" className="classInBtn">距离开课  <span><Counter value={second} initM={minute} step='1' /></span></button>
                isChlane = <button type="button" style={{ background: '#ccc' }}>取消预约</button>
            } else if (timeCha < 0) {
                isOpen = <button type="button" className="classInBtn">正在上课</button>;
                isChlane = <button type="button" style={{ background: '#ccc' }}>取消预约</button>
            } else if (timeCha >= 14400000) {
                isOpen = ''
                isChlane = <button type="button" onClick={this.handleYuYuea.bind(this)}>取消预约</button>
            } else {
                isOpen = ''
                isChlane = <button type="button" onClick={this.handleYuYuea.bind(this)}>取消预约</button>
            }
        }




        return (
            <div>
                {/*<!-- 还没有开始的课  start -->*/}
                <div className="appointmentBox">
                    <div className="appointmentList marginTop0">
                        <div className="stateBox">
                            <p>{timeStr}</p>
                            {isChlane}
                        </div>
                        <div className="classImageBox">
                            <img src={imgs+this.state.img} alt="" />
                        </div>
                        <div className="classConBox">
                            <div className="class-title">
                                <span className="orgin-shi">{this.state.level}</span>
                                <p>{this.state.isTiyan ==0 ? '体验课':this.state.title}</p>
                            </div>
                            <p>{this.state.main}</p>
                        </div>
                    </div>
                    {isOpen}
                </div>
                {/*<!-- 还没有开始的课 end -->*/}
                <ul className="studentSixthbox">
                    {HeaderIng}
                </ul>
                <div className="appointmentAlertBox" ref="shengyuks">
                    <div className="appointmentAlert">
                        <p ref="tishi">您的课时不足，暂时不能预约</p>
                        <div className="appointmentAlert-btnbox">
                            <button type="button" style={{ margin: '0 auto' }} className="orange-btn appointmentAlert-suc"
                                onClick={(e) => this.ykClick(e)}>确定
                                </button>
                        </div>
                    </div>
                </div>

                <div className="appointmentAlertBox" ref="cancelBox1">
                            <div className="appointmentAlert">
                                <p>确定取消本次预约吗？</p>
                                <div className="appointmentAlert-btnbox">
                                    <button type="button" className="appointmentAlert-cancel"
                                        onClick={this.quxiaoS.bind(this)}>暂不取消
                                </button>
                                    <button type="button" className="orange-btn appointmentAlert-suc"
                                        onClick={this.quxiaoClick.bind(this)}>确定
                                </button>
                                </div>
                            </div>
                        </div>

                        <div className="appointmentAlertBox" ref="cancelBox2">
                            <div className="appointmentAlert" style={{ height: "5.47rem" }}>
                                <p style={{ padding: "0.885rem 0.23rem 0" }}>本月您有2次不扣课时的取消机会<br />（课前24小时），本次取消不会扣除课时</p>
                                <div className="appointmentAlert-btnbox">
                                    <button type="button" className="appointmentAlert-cancel"
                                        onClick={this.quxiaoS2.bind(this)}>再想想
                                </button>
                                    <button type="button" className="orange-btn appointmentAlert-suc"
                                        onClick={this.quxiaoClick.bind(this)}>取消预约
                                </button>
                                </div>
                            </div>
                        </div>

                        <div className="appointmentAlertBox" ref="cancelBox3">
                            <div className="appointmentAlert">
                                <p style={{ padding: "0.885rem 0.23rem 0" }}>本月您已消耗完2次机会，<br />本次取消将扣除您1课时</p>
                                <div className="appointmentAlert-btnbox">
                                    <button type="button" className="appointmentAlert-cancel"
                                        onClick={this.quxiaoS3.bind(this)}>再想想
                                </button>
                                    <button type="button" className="orange-btn appointmentAlert-suc"
                                        onClick={this.quxiaoClick.bind(this)}>取消预约
                                </button>
                                </div>
                            </div>
                        </div>
            </div>

        )
    }
}