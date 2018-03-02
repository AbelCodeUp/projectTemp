import React, { Component } from 'react';
import { Link } from 'react-router';
import Footer from './footer';
import Counter from './Counter';
import Pingjia from './Pingjia';
import CourseSurVew from './courseSurvew';
import { hashHistory } from 'react-router';
import $ from 'jquery';
import LessonCompleted from './LessonCompleted';
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

export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            isDingji: false,
            user: {
                UserCategory: 0,//用户级别,0：普通,1:付费
                IsAbout: 0//是否约课 ,1：已约,0:无                
            },
            tuijian: {
                BdId: 0,//单元id
                BookingId: 0,//教材id
                Describe: '',//单元简介
                FilePath: '',//单元图片地址
                ImageId: 0,//图片id
                LevelName: '',//单元等级
                UnitName: '',//单元名称
            },
            isTuijian: 0,
            stayCourse: [],
            recentlyConcluded: [],
            serverTime: '',
            demandid:null,
            isTiyan:null
        }
    }
    componentDidMount() {
        // location.reload(false);
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
            // alert(GetCookie("Tonken"));
            //有没有定级
            $.ajax({
                type: "GET",
                url: urls + "api/HomePage/GetSystemTime",//上课提醒
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == 1) {
                        this.setState({
                            serverTime: json.data.SysDateTime
                        })
                    } else if (json.result >= 1000 || json.result == 0) {
                        hashHistory.push("/My");
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
            $.ajax({
                type: "GET",
                url: urls + "api/HomePage/GetRecommendedCourses",
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == -2) {//未定级
                        this.setState({
                            isDingji: true
                        })
                        hashHistory.push('/courseSurvew/1');
                    } else if (json.result == 1) {//已定级
                        this.setState({
                            isDingji: false
                        })

                        $.ajax({
                            type: "GET",
                            url: urls + "api/HomePage/GetOrdinaryStudentInfo",//获取学员信息，判断是否是付费用户
                            headers: { Authorization: localStorage.getItem('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result == 1) {
                                    const newUser = json.data;
                                    this.setState({
                                        user: newUser.UserCategory
                                    })
                                }
                            }.bind(this)
                        });

                        $.ajax({
                            type: "GET",
                            url: urls + "api/HomePage/GetRecommendedCourses",//推荐预约
                            headers: { Authorization: localStorage.getItem('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result == 1) {
                                    const newTuijian = json.data;
                                    if (newTuijian == null) {
                                        this.setState({
                                            tuijian: [],
                                            isTuijian: 1 //已定级
                                        })
                                    } else {
                                        this.setState({
                                            tuijian: newTuijian,
                                            isTuijian: json.result
                                        })
                                    }

                                } else {
                                    this.setState({
                                        isTuijian: json.result
                                    })
                                }
                            }.bind(this)
                        });


                        $.ajax({
                            type: "GET",
                            url: urls + "api/HomePage/GetNotMyLess",//上课提醒
                            headers: { Authorization: localStorage.getItem('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result == 1) {
                                    this.setState({
                                        stayCourse: json.data
                                    })
                                }
                            }.bind(this)
                        });

                        $.ajax({
                            type: "GET",
                            url: urls + "api/Lesson/GetLatelyClassInfo",//最近结束
                            headers: { Authorization: localStorage.getItem('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result == 1) {
                                    this.setState({
                                        recentlyConcluded: json.data
                                    })
                                }
                            }.bind(this)
                        });





                    }else if (json.result >= 1000 ) {
                        hashHistory.push("/My");
                    }
                }.bind(this)
            });


        }
        else {
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
        // $.ajax({
        //     type: "GET",
        //     url: urls + `api/Demands/ClassBookDetails?BdeId=${ret.uid}&BookingId=${ret.bid}`,
        //     headers: { Authorization: GetCookie('Tonken') },
        //     dataType: "json",
        //     success: function (json) {
        //         if (json.result == 1) {
        //             $.ajax({
        //                 type: "GET",
        //                 url: urls + `api/HomePage/GetSystemTime`,
        //                 headers: { Authorization: GetCookie('Tonken') },
        //                 dataType: "json",
        //                 success: function (json) {
        //                     this.setState({
        //                         fuwuqiTime: json
        //                     })
        //                 }.bind(this)
        //             });

        //             this.setState({
        //                 levels: json.data[0].LevelName,
        //                 FileTittles: json.data[0].FileTittle.substring(json.data[0].FileTittle.indexOf("L")),
        //                 Describes: json.data[0].Describe,
        //                 StartTimes: json.data[0].StartTime.substring(json.data[0].StartTime.indexOf("-") + 1),
        //                 imgUrl: json.data[0].FilePath,
        //                 demandid: json.data[0].DemandId,
        //                 yuekeshijian: json.data[0].StartTime,
        //                 lessonid: json.data[0].LessionId
        //             });
        //             // window.history.go(0);
        //             // location.href=location.href;
        //             location.reload(true)
        //         }
        //     }.bind(this)
        // });
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
        let dingji = this.state.isDingji ? { display: 'block' } : { display: 'none' };
        const { tuijian, stayCourse, latelyCourse, recentlyConcluded } = this.state;
        let tuijianCon;
        if (tuijian.length == 0 || tuijian == null || this.state.isTiyan==0) {
            tuijianCon = ''
        } else {
            tuijianCon = <div className="appointmentBox">
                <div className="titlebox">
                    <span></span>
                    <h2>推荐预约</h2>
                </div>
                <div className="appointmentList">
                    <Link to={{
                        pathname: "/YueKeXiang",
                        query: { bid: tuijian.BookingId, LevelS: tuijian.Level, uid: tuijian.BdId }
                    }}>
                        <div className="classImageBox">
                            <img src={imgs+tuijian.FilePath} alt="" />
                        </div>
                    </Link>
                    <div className="classConBox">
                        <div className="class-title">
                            <span className="orgin-kong">{tuijian.LevelName}</span><p>{tuijian.UnitName.split(' ')[1]}</p>
                        </div>
                        <p>{tuijian.Describe}</p>
                    </div>
                </div>
            </div>
        }

        let items = [];
        if (stayCourse.length == 0 || stayCourse == null) {
            items.push(
                <div className="remindbox" key={1}>
                    <div className="remin-imgbox"><img src="images/remind.png" alt="" /></div>
                    <p>您还没有预约课程，快去预约一节吧！</p>
                </div>
            )
        } else {
            stayCourse.map((d, i) => {
                if (i == 0) {
                    let time = '';
                    let nowTime = '';
                    if (this.state.serverTime != '') {
                        time = dateZhuan(d.StartTime);
                        nowTime = dateZhuan(this.state.serverTime);

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
                            isChlane = <button type="button" onClick={this.handleYuYuea.bind(this, d.DemandId, d.StartTime)}>取消预约</button>
                        } else {
                            isOpen = ''
                            isChlane = <button type="button" onClick={this.handleYuYuea.bind(this, d.DemandId, d.StartTime)}>取消预约</button>
                        }
                        items.push(
                            <div key={i}>
                                <div className="appointmentList marginTop0" style={{ border: '1px solid #e8e8e8' }}>
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
                                            <p>{this.state.isTiyan == 0 ?'体验课':d.FileTittle.split(" ")[1]}</p>
                                        </div>
                                        <p>{d.Describe} </p>
                                    </div>
                                </div>
                                {isOpen}
                            </div>
                        )
                    }


                }

            })
        }

        return (
            <div className="body-con">
                {/*调查start*/}
                {/* <div className="CourseSurVew" style={dingji}>
                    <CourseSurVew className="shows" />
                </div> */}
                {/*调查end*/}
                {/* <div className="errorBox">
                    <div className="errorImg">
                        <img src="../images/error1.png" alt=""/>
                    </div>
                </div> */}

                {
                    this.state.isDingji ? ''
                        :
                        <div className='appBodyBox' style={{ width: '100%', height: `${document.documentElement.clientHeight}px`, 'position': 'relative' }}>
                            <div className='appConwlh' style={{ position: 'absolute', left: '0px', top: '0px', width: '100%', height: '90vh', overflow: 'auto' }}>
                                {/* 上课提醒 start */}
                                <div className="appointmentBox">
                                    <div className="titlebox">
                                        <span></span>
                                        <h2>上课提醒</h2>
                                    </div>
                                    {items}
                                </div>
                                {/* 上课提醒 end */}

                                {/* 最近结束 start */}
                                <div className="appointmentBox">
                                    <div className="titlebox">
                                        <span className="color-grey"></span>
                                        <h2>最近结束</h2>
                                    </div>
                                    <LessonCompleted data={this.state.recentlyConcluded} tiyan={this.state.isTiyan} />
                                </div>
                                {/* 最近结束 end */}

                                {tuijianCon}
                            </div>

                            {/*尾部start*/}
                            <Footer num="1" />

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
                }


            </div>
        )
    }
}

