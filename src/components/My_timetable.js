/**
 * Created by Administrator on 2017/8/24.
 */
import React, { Component } from 'react';
import Footer from './footer';
import { Link,hashHistory } from 'react-router';
import LessonCompleted from './LessonCompleted';
import $ from 'jquery';
import Counter from './Counter';
import store from '../redux/store';
import actions from '../redux/actions';

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

function GetCookie(sName) {
    let aCookie = document.cookie.split("; ");
    for (let i = 0; i < aCookie.length; i++) {
        let aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return null;
}

export default class MyAppointment extends React.Component {
    constructor() {
        super();
        this.state = {
            //已结束
            Describe: null,
            LevelName: null,
            StartTime: null,
            FileTittle: null,
            TeacherImg: '',
            datass: null,//已结束的数据
            length: 0,
            datas: null,//未完成的数据
            lengths: 0,
            lessonids: null,
            serverTime: null,
            demandid: null,
            abc: 0,
            recentlyConcluded: [],
            isTiyan:null,
            isShows: store.getState().isShow,
            shareNum: store.getState().shareNum
        }
    }


    componentDidMount() {
        if (GetCookie('Tonken') || localStorage.getItem('Tonken')) {
            //已结束
            $.ajax({
                type: "GET",
                url: urls + 'api/HomePage/GetCompleteMyLess',
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == 1) {
                        this.refs.yjs.innerHTML = '已结束(' + json.data.length + ')'
                        this.setState({
                            recentlyConcluded: json.data
                        });

                    } else if (json.result >= 1000) {
                        hashHistory.push("/My");
                    } else {
                        // if(this.state.datass.length==0){
                        this.refs.yjs.innerHTML = '已结束(0)'
                        // }
                    }
                }.bind(this)
            });

            $.ajax({
                type: "GET",
                url: urls + `api/Lesson/IsOfficial`,//判断是否是正式学员，0为体验，1为正式
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result >= 1000) {
                        hashHistory.push("/My");
                    } else {
                        this.setState({
                            isTiyan: json.result
                        })
                    }
                }.bind(this)
            });

            //未完成
            $.ajax({
                type: "GET",
                url: urls + 'api/HomePage/GetNotMyLess',
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == 1) {
                        this.refs.noScheduleBox.style.display = 'none';
                        this.refs.appointmentBox.style.display = 'block';
                        this.refs.appointmentBoxT.style.display = "block";
                        this.setState({
                            datas: json.data,
                            lengths: json.data.length
                        })
                        $.ajax({
                            type: "GET",
                            url: urls + `api/HomePage/GetSystemTime`,
                            headers: { Authorization: localStorage.getItem('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                this.setState({
                                    serverTime: json.data.SysDateTime
                                })
                                if (json.result >= 1000) {
                                    hashHistory.push("/My");
                                }
                            }.bind(this)
                        });
                    } else if (json.result >= 1000) {
                        hashHistory.push("/My");
                    } else {
                        // if(this.state.datas.length==0){
                        this.refs.wwc.innerHTML = '未完成(0)'
                        // }
                    }
                }.bind(this)
            });

        } else {
            //alert("未绑定");
            hashHistory.push("/My");
        }

    }
    handleYuYuea(val,timeval) {
        this.setState({
            demandid:val
        })
        $.ajax({
            type: "GET",
            url: urls + `api/HomePage/GetSystemTime`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                var now = dateZhuan(json.data.SysDateTime);
                var ful = dateZhuan(timeval);
                let timeCha = ful.getTime() - now.getTime();
                if (timeCha <= 86400000) {//24小时之内
                    $.ajax({
                        type: "GET",
                        url: urls + `api/Demands/CancelLessonCount`,
                        headers: { Authorization: localStorage.getItem('Tonken') },
                        dataType: "json",
                        success: function (json) {
                            if(json.result==1){
                                if (json.data >= 0 && json.data < 2) {
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
        //未完成
        let dataObjs = this.state.datas;
        let itemss = [];
        if (dataObjs == null) {
            itemss.push(
                <div className="remindbox">
                    <div className="remin-imgbox"><img src="images/remind.png" alt="" /></div>
                    <p>您还没有预约课程，快去预约一节吧！</p>
                </div>
            )
        } else {
            dataObjs.map((d, i) => {
                let time = dateZhuan(d.StartTime);
                let nowTime = new Date();
                const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '今天'];

                var weekStr = ''
                if (time.getDay() - 1 == nowTime.getDay() - 1 && time.getDate() == nowTime.getDate()) {
                    weekStr = week[7];
                } else {
                    weekStr = week[time.getDay()];
                }
                // let m = (time.getMonth() + 1);
                let m=parseInt(d.StartTime.split('-')[1]);//解决月份多加一
                m = m < 10 ? '0' + m : m;
                let day = time.getDate();
                day = day < 10 ? '0' + day : day;
                let h = time.getHours();
                h = h < 10 ? '0' + h : h;
                let ms = time.getMinutes();
                ms = ms < 10 ? '0' + ms : ms;
                let timeStr = m + '月' + day + '日（' + weekStr + '） ' + h + ":" + ms;

                let timeCha = time.getTime() - nowTime.getTime();

                let isOpen = '';
                let leftsecond = parseInt(timeCha / 1000);
                let day1 = Math.floor(leftsecond / (60 * 60 * 24));
                let hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
                let minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
                let second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
                let isChlane = '';
                let enterClass = '';

                if (timeCha < 600000 && timeCha >= 0) {
                    enterClass = 'b_btn';
                    isOpen = <button type="button" className="classInBtn">距离开课  <span><Counter value={second} initM={minute} step='1' /></span></button>
                    isChlane = <button type="button" style={{ background: '#ccc' }}>取消预约</button>
                } else if (timeCha < 0) {
                    isOpen = <button type="button" className="classInBtn">正在上课</button>;
                    isChlane = <button type="button" style={{ background: '#ccc' }}>取消预约</button>
                } else if (timeCha >= 14400000) {
                    isOpen = ''
                    isChlane = <button type="button" onClick={this.handleYuYuea.bind(this, d.DemandId,d.StartTime)}>取消预约</button>
                } else {
                    isOpen = ''
                    isChlane = <button type="button" onClick={this.handleYuYuea.bind(this, d.DemandId,d.StartTime)}>取消预约</button>
                }
                itemss.push(
                    <div key={i} style={{ borderTop: '1px solid #e8e8e8' }}>
                        <div className="appointmentList marginTop0">
                            <div className="stateBox">
                                <p>{timeStr}</p>
                                {isChlane}
                                {/* <button type="button">取消预约</button> */}
                            </div>
                            <Link to={{ pathname: "/My_ClassXiang", query: { Lessonid: d.LessonId,tiyan:this.state.isTiyan } }}>
                                <div className="classImageBox">
                                    <img src={imgs+d.FilePath} alt="" />
                                </div>
                            </Link>
                            <div className="classConBox">
                                <div className="class-title">
                                    <span className="orgin-kong">{d.LevelName}</span>
                                    <p>{this.state.isTiyan == 0 ? '体验课': d.FileTittle.split(" ")[1]}</p>
                                </div>
                                <p>{d.Describe} </p>
                            </div>
                        </div>
                        {isOpen}
                    </div>
                )
            })
        }
        //已结束
        let dataObj = this.state.datass;
        // let yjs=document.getElementById("yjs");
        let items = [];
        if (dataObj == null) {
            items.push(
                <p style={{ fontSize: '16px', lineHeight: '50px', marginLeft: "20px" }}>没有未完成的课啦！</p>
            )
        } else {
            dataObj.map(function (d, i) {
                let time = dateZhuan(d.StartTime);
                let nowTime = new Date();
                const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '今天'];
                // alert(time.getDay()-1);
                var weekStr = '';
                if (time.getDay() - 1 == nowTime.getDay() - 1) {
                    weekStr = week[7];
                } else {
                    weekStr = week[time.getDay() - 1];
                }
                let timeStr = (time.getMonth() + 1) + '月' + time.getDate() + '日（' + weekStr + '） ' + time.getHours() + ":" + time.getMinutes();
                items.push(
                    <div className="appointmentList marginTop0" style={{ borderTop: '1px solid #e8e8e8' }}>
                        <div className="stateBox">
                            <p>{timeStr}<span>迟到</span></p>
                            <Link to={{ pathname: "/PingJia", query: { teacherImg: d.TeacherImg } }}>
                                <a href="" className="state-right" ref="pingjia" style={{position:'relative'}}>
                                    
                                待评价</a>
                            </Link>
                        </div>
                        <Link to={{ pathname: "/YijieshuClassXiang", query: { Lessonid: d.LessonId } }}>
                            <div className="classImageBox">
                                <img src={d.TeacherImg} alt="" />
                            </div>
                        </Link>
                        <div className="classConBox">
                            <div className="class-title">
                                <span className="grey-kong">{d.LevelName}</span><p>{d.FileTittle.substring(d.FileTittle.lastIndexOf("L"))}</p>
                                {/*<p className="classTitle-right">14<i className="iconfont">&#xe712;</i></p>*/}
                            </div>
                            <p>{d.Describe}</p>
                        </div>
                    </div>
                );
            })
        }
        let appoint = this.state.isTiyan == 0 ? "/My_appointmentTY" : "/My_appointment"
        return (
            <div className='appBodyBox' style={{ width: '100%', height: `${document.documentElement.clientHeight}px`, 'position': 'relative' }}>
                <div className='appConwlh' style={{ position: 'absolute', left: '0px', top: '0px', width: '100%', height: `${document.documentElement.clientHeight - 80}px`, overflow: 'auto', '-webkit-overflow-scrolling': 'touch; ' }}>
                    {/*<!-- 顶部选项 start -->*/}
                    <ul className="schedule-nav">
                        <li>
                            <Link to={appoint} style={{ color: '#333' }}>
                                <p>预约课程</p>
                                <div className="nav-line" style={{ display: 'none' }}>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/My_timetable">
                                <p style={{position:'relative'}}>我的课表
                                 {
                                  this.state.isShows?<span style={{position:'absolute',top:'0',right:'1rem',width:'0.4rem',height:'0.4rem',textAlign:'center',lineHeight:'0.4rem',borderRadius:'100%',backgroundColor:'red',color:'#fff',fontSize:'12px'}}>{this.state.shareNum}</span>:''
                                 }
                               </p>
                                <div className="nav-line" style={{ display: 'block' }}>
                                </div>
                            </Link>
                        </li>
                    </ul>
                    {/*<!-- 空 start -->*/}
                    <div ref="noScheduleBox">
                        {/*<div className="noSchedule-imgBox">*/}
                        {/*<img src="images/remind.png" alt=""/>*/}
                        {/*</div>*/}
                        {/*<p>还没有预约课程</p>*/}
                    </div>
                    {/*<!-- 空 end -->*/}

                    {/*<!-- 未完成 start -->*/}
                    <div style={{ marginBottom: "100px" }}>
                        <div className="appointmentBox" ref="appointmentBox">
                            <div className="titlebox">
                                <span className="color-grey"></span>
                                <h2 ref="wwc">未完成({this.state.lengths})</h2>
                            </div>
                            {itemss}

                        </div>
                        {/*<!-- 未完成 end -->*/}


                        {/*<!-- 已结束 start -->*/}
                        <div className="appointmentBox" ref="appointmentBoxT">
                            <div className="titlebox">
                                <span className="color-grey"></span>
                                <h2 ref="yjs">已结束({this.state.length})</h2>
                            </div>
                            <LessonCompleted data={this.state.recentlyConcluded} tiyan = {this.state.isTiyan} />
                        </div>
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
                </div>

                <Footer num="2" />
            </div>

        )
    }
}