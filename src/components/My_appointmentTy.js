/**
 * Created by Administrator on 2017/8/25.
 */
import React, { Component } from 'react';
import Footer from './footer';
import { Link, hashHistory } from 'react-router';
import $ from 'jquery';
import CourseSurVew from './courseSurvew';
import store from '../redux/store';
import actions from '../redux/actions';

require('../js/swiper.js');
require('../styles/swiper-3.2.7.min.css');

// import VConsole from 'vconsole';
window.cleTime1 = 0;
// var vConsole = new VConsole();
function dateZhuan(str) {
    let arr1 = str.split(' ')[0].split('-');
    let arr2 = str.split(' ')[1].split(':');
    let nowDate = new Date();
    nowDate.setFullYear(arr1[0]);
    nowDate.setMonth(parseInt(arr1[1]) - 1);
    nowDate.setDate(arr1[2]);
    nowDate.setHours(arr2[0]);
    nowDate.setMinutes(arr2[1]);
    // nowDate.setSeconds(arr2[2].substring(0, arr2[2].indexOf(".")));
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

export default class MyAppointmentTY1 extends React.Component {
    constructor() {
        super();
        this.state = {
            isDingji: false,
            dateArr: [],
            dateAr: [],
            isActive: 0,
            serverTime: '',
            bookingid: null,
            bdid: null,
            datas: [],
            isTiyan: null,
            time: '',
            nowday: '',
            isShows: store.getState().isShow,
            shareNum: store.getState().shareNum
        }
    }
    handleClickO(v1, v2, v3) {
        console.log(1)
        // clearInterval(cleTime1);
        // cleTime1 = setInterval(function () {
            // $.ajax({
            //     type: "GET",
            //     url: urls + `api/Demands/GetLessonRoomN?LessonTime=${this.state.dateArr[v3].time}`,
            //     headers: { Authorization: localStorage.getItem('Tonken') },
            //     dataType: "json",
            //     success: function (json) {
            //         if (json.result == 1) {
            //             this.setState({
            //                 datas: json.data
            //             });
            //         } else {
            //             this.setState({
            //                 datas: []
            //             });
            //         }

            //     }.bind(this)
            // });
        // }.bind(this), 3000)
        this.refs.father.style.opacity = 1;
        $.ajax({
            type: "GET",
            url: urls + `api/Demands/GetLessonRoomN?LessonTime=${this.state.dateArr[v3].time}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            timeout: 3000,
            success: function (json) {
                if (json.result == 1) {
                    this.setState({
                        datas: json.data,
                        isActive: v3,
                        nowday: this.state.dateArr[v3].time
                    });

                } else {
                    this.setState({
                        datas: [],
                        isActive: v3,
                        nowday: this.state.dateArr[v3].time
                    });

                }
            }.bind(this),
            error: function () {
                this.setState({
                    datas: [],
                    isActive: v3,
                    nowday: this.state.dateArr[v3].time
                });
            }.bind(this),
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                }
            }.bind(this)
        });

    }

    handleClickOs(v1, v2, v3) {
        console.log(2)
        const {dateAr} =this.state;
        this.refs.father.style.opacity = 1;
        // clearInterval(cleTime1);
        // cleTime1 = setInterval(function () {
            // $.ajax({
            //     type: "GET",
            //     url: urls + `api/Demands/GetLessonRoomN?LessonTime=${dateAr[v3].time}`,
            //     headers: { Authorization: localStorage.getItem('Tonken') },
            //     dataType: "json",
            //     success: function (json) {
            //         if (json.result == 1) {
            //             this.setState({
            //                 datas: json.data
            //             });
            //         } else {
            //             this.setState({
            //                 datas: []
            //             });
            //         }
            //     }.bind(this)
            // });
        // }.bind(this), 3000)

        $.ajax({
            type: "GET",
            url: urls + `api/Demands/GetLessonRoomN?LessonTime=${dateAr[v3].time}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    this.setState({
                        datas: json.data,
                        isActive: dateAr[v3].val,
                        nowday: dateAr[v3].time
                    });
                } else {
                    this.setState({
                        datas: [],
                        isActive:dateAr[v3].val,
                        nowday: dateAr[v3].time
                    });
                }
                // this.refs.lines.style.left = 0.477 + v3 * 1.294 + "rem";
                // this.refs.lines.style.transition = "0.5s";
            }.bind(this),
            error: function () {
                this.setState({
                    datas: [],
                    isActive: v3,
                    nowday: this.state.dateArr[v3].time
                });
            }.bind(this)
        });

    }
    componentDidMount() {
        if (GetCookie("Tonken") || localStorage.getItem('Tonken')) {
            //有没有定级
            $.ajax({
                type: "GET",
                url: urls + "api/HomePage/GetRecommendedCourses",
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == -2) {
                        hashHistory.push("/")
                    } else if (json.result == 1) {
                        $.ajax({
                            type: "GET",
                            url: urls + `api/HomePage/GetSystemTime`,
                            headers: { Authorization: localStorage.getItem('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                this.setState({
                                    serverTime: json.data.SysDateTime
                                })
                                //获取两周的时间
                                let nowDate = dateZhuan(json.data.SysDateTime);
                                let dataArrs = [];
                                let dataArr = [];
                                const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                                for (let i = 0; i < 7; i++) {
                                    let futDate = new Date(nowDate);
                                    futDate.setDate(nowDate.getDate() + i);
                                    let m = (futDate.getMonth() + 1) < 10 ? '0' + (futDate.getMonth() + 1) : (futDate.getMonth() + 1);
                                    let d = futDate.getDate() < 10 ? '0' + futDate.getDate() : futDate.getDate();
                                    let timeStr = futDate.getFullYear() + "-" + m + "-" + d;
                                    let dateStr = m + "-" + d;
                                    dataArrs.push({
                                        data: dateStr,
                                        week: weekArr[futDate.getDay()],
                                        time: timeStr,
                                        val: i
                                    });
                                }
                                for (let i = 7; i < 14; i++) {
                                    let futDate = new Date(nowDate);
                                    futDate.setDate(nowDate.getDate() + i);
                                    let m = (futDate.getMonth() + 1) < 10 ? '0' + (futDate.getMonth() + 1) : (futDate.getMonth() + 1);
                                    let d = futDate.getDate() < 10 ? '0' + futDate.getDate() : futDate.getDate();
                                    let timeStr = futDate.getFullYear() + "-" + m + "-" + d;
                                    let dateStr = m + "-" + d;
                                    dataArr.push({
                                        data: dateStr,
                                        week: weekArr[futDate.getDay()],
                                        time: timeStr,
                                        val: i
                                    });
                                }
                                this.setState({
                                    dateArr: dataArrs,
                                    dateAr: dataArr
                                });



                                $.ajax({
                                    type: "GET",
                                    url: urls + `api/Demands/GetLessonRoomN?LessonTime=${this.state.dateArr[this.state.isActive].time}`,
                                    headers: { Authorization: localStorage.getItem('Tonken') },
                                    dataType: "json",
                                    success: function (json) {
                                        if (json.result == 1) {
                                            this.setState({
                                                datas: json.data
                                            });
                                            console.log( json.data)
                                        } else {
                                            this.setState({
                                                datas: []
                                            });
                                            console.log( json.data)
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
                                    url: urls + `api/Demands/GetLessonRoomN?LessonTime=${dataArrs[0].time}`,
                                    headers: { Authorization: localStorage.getItem('Tonken') },
                                    dataType: "json",
                                    success: function (json) {
                                        if (json.result == 1) {
                                            this.setState({
                                                datas: json.data,
                                                nowday: dataArrs[0].time
                                            });
                                        } else {
                                            this.setState({
                                                datas: [],
                                                nowday: dataArrs[0].time
                                            });
                                        }
                                    }.bind(this)
                                });

                                setTimeout(function () {
                                    let swiper1 = new Swiper(this.refs.box, {
                                        slidesPerView: 1,
                                        paginationClickable: true,
                                        spaceBetween: 0,
                                        pagination: '.swiper-pagination',
                                        freeMode: false,
                                        loop: false,
                                        onTab: function (swiper) {
                                            let n = swiper1.clickedIndex;
                                        }
                                    });
                                }.bind(this), 500)

                            }.bind(this)
                        });
                    } else {
                        hashHistory.push("/My");
                    }
                }.bind(this)
            });
        } else {
            hashHistory.push("/My");
        }
        // if (cleTime1 == 0) {
            //服务器压力太大， 去掉   12/18


            // cleTime1 = setInterval(function () {
                // $.ajax({
                //     type: "GET",
                //     url: urls + `api/Demands/GetLessonRoomN?LessonTime=${this.state.dateArr[this.state.isActive].time}`,
                //     headers: { Authorization: localStorage.getItem('Tonken') },
                //     dataType: "json",
                //     success: function (json) {
                //         if (json.result == 1) {
                //             this.setState({
                //                 datas: json.data
                //             });
                //         } else {
                //             this.setState({
                //                 datas: []
                //             });
                //         }
                //     }.bind(this)
                // });
            // }.bind(this), 3000)


        // }
    }

    jiaruClick(v1, v2, v3, v4, v5) {
        this.refs.appointmentAlertBox.style.display = 'block';
        this.setState({
            isShow: true,
            time: v1.replace('T', ' '),
            lessonIds: v2,
            bookingid: v4,
            bdid: v5
        })
    }
    handleClickGuan() {
        this.refs.appointmentAlertBox.style.display = 'none';
    }
    yuyueSucClick() {//预约

        $.ajax({
            type: "GET",
            url: urls + `api/Demands/JoinLessonRoom?LessonId=${this.state.lessonIds}&LessonTime=${this.state.time}&BookingId=${this.state.bookingid}&BDEId=${this.state.bdid}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                this.refs.appointmentAlertBox.style.display = "none";
                this.refs.neirong.style.display = "block";
                if (json.result == 1) {
                    // this.refs.order.style.background = "#B8B8B8";
                    // this.refs.order.style.pointerEvents = "none";                    
                    this.setState({
                        neirong: json.msg
                    });
                } else if (json.result == -3) {
                    this.setState({
                        neirong: "您还未购买课时，请购买后再加入"
                    });
                } else if (json.result == -2) {
                    this.setState({
                        neirong: "您的课时已过期，暂时不能预约"
                    });
                } else if (json.result == -4) {
                    this.setState({
                        neirong: "剩余课时已被占用"
                    });
                } else if (json.result == -1) {
                    this.setState({
                        neirong: "您的课时不足，暂时不能预约"
                    });
                } else {
                    this.setState({
                        neirong: json.msg
                    });
                }
            }.bind(this)
        });

    }
    zhidaole() {
        this.refs.neirong.style.display = "none";
        $.ajax({
            type: "GET",
            url: urls + `api/Demands/GetLessonRoomN?LessonTime=${this.state.nowday}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    this.setState({
                        datas: json.data
                    });
                } else {
                    this.setState({
                        datas: []
                    });
                }
            }.bind(this)
        });
        // location.reload(true);
    }
    ykClick() {
        this.refs.shengyuks.style.display = "none";
    }
    render() {
        let dingji = this.state.isDingji ? { display: 'block' } : { display: 'none' };
        let yuyue = !this.state.isDingji ? { display: 'block' } : { display: 'none' };
        let dataObj = this.state.datas;
        let items = [];
        if (dataObj == null || dataObj.length == 0 || !dataObj) {
            items.push(
                <div className="remindbox" key={1}>
                    <div className="remin-imgbox"><img src="images/remind.png" alt="" /></div>
                    <p>没有合适的课程可加入，换个日期看看吧</p>
                    <p style={{ fontSize: '14px', 'textAlign':'center'}}>每周一晚8点，批量开放预约下一周的课程</p>
                </div>
            )
        } else if(dataObj[0].IsExpire == 1){
            items.push(
                <div className="remindbox" key={1}>
                    <div className="remin-imgbox"><img src="images/remind.png" alt="" /></div>
                    <p>当前日期已经超过了您的课时有效期，请换个近点</p>
                    <p style={{ fontSize: '14px', 'textAlign':'center'}}>的日期看看吧</p>
                </div>
            )
        }else {
            dataObj.map((d, i) => {
                let now = dateZhuan(this.state.serverTime);
                let classTime = dateZhuan(d.StartTime);
                let timeStr = '';
                let h = classTime.getHours();
                h = h < 10 ? '0' + h : h;
                let m = classTime.getMinutes();
                m = m < 10 ? '0' + m : m;
                timeStr = h + ':' + m;

                let timeCha = classTime.getTime() - now.getTime();
                let btn;
                if (timeCha < 600000) {
                    btn = <div className='rightBtn'><a ref="yuyuebtn" style={{ background: "#cdcdcd", pointerEvents: 'none' }} className="yuyuebtn appointment-yuyue"><span
                        className="class_ordered class_ordegrey" key={i}>加入</span></a></div>
                } else {
                    btn = <div className='rightBtn'><a ref="yuyuebtn" className="yuyuebtn appointment-yuyue"><span
                        className="class_ordered wordBtn" key={i}
                        onClick={this.jiaruClick.bind(this, d.StartTime, d.LessonId, i, d.BookingId, d.BdId)}>加入</span></a>
                    </div>
                }

                items.push(
                    <div key={i} style={{ background: '#fff' }}>
                        <div className="appointmentList marginTop0" style={{ border: '1px solid #e8e8e8' }}>
                            <div className="stateBox">
                                <p>{timeStr} 开课</p>
                                {btn}
                                {/* <button type="button">取消预约</button> */}
                            </div>
                            <Link to=''>
                                <div className="classImageBox">
                                    <img src={imgs + d.FilePath} alt="" />
                                </div>
                            </Link>
                            <div className="classConBox">
                                <div className="class-title">
                                    <span className="orgin-kong">{d.BookingTitle}</span>
                                    <p>体验课</p>
                                </div>
                                <p>{d.Describe} </p>
                            </div>
                        </div>
                    </div>
                );
            })
        }
        const { dateArr } = this.state;
        const { dateAr } = this.state;
        let dataArrs = [];
        let dataAra = [];
        dateArr.map((d, i) => {//两周时间
            let activeClass = "";
            let selectClass = ''
            let borderNo = i == 0 ? { borderLeft: '0px' } : {}
            if (this.state.isActive == dateArr[i].val) {
                selectClass = 'active'
            } else {
                selectClass = ''
            }
            dataArrs.push(
                <li key={i} onClick={this.handleClickO.bind(this, d.time, d.data, i)} ref="dayO"
                    className={activeClass + ' ' + selectClass} style={borderNo} >
                    <p className="date_day">{d.week}</p>
                    <p className="date_date">{d.data}</p>
                </li>
            )
        });
        dateAr.map((d, j) => {//两周时间
            let activeClass = "";
            let selectClass = '';
            let borderNo = j == 0 ? { borderLeft: '0px' } : {};
            if (this.state.isActive == dateAr[j].val) {
                
                selectClass = 'active'
                // selectClass = 'selected'
            } else {
                selectClass = ''
            }
            dataAra.push(
                <li key={j + 8} onClick={this.handleClickOs.bind(this, d.time, d.data, j)} ref="day1"
                    className={activeClass + ' ' + selectClass} style={borderNo}>
                    <p className="date_day">{d.week}</p>
                    <p className="date_date">{d.data}</p>
                </li>
            )
        });
        let appoint = this.state.isTiyan == 0 ? "/My_appointmentTY" : "/My_appointment";
        return (
            <div>

                {/*调查start*/}
                {/* <div className="CourseSurVew" style={dingji}>
                    <CourseSurVew className="shows" />
                </div> */}
                {/*调查end*/}
                <div style={yuyue}>
                    <div className='appBodyBox' style={{ width: '100%', height: `${document.documentElement.clientHeight}px`, 'position': 'relative' }}>
                        {/* <div className='appConwlh' style={{ position: 'absolute', left: '0px', top: '0px', width: '100%', height: `${document.documentElement.clientHeight - 80}px`, overflow: 'auto',background:'yellow'}> */}
                        <div className='appConwlh' style={{ position: 'relative', left: '0px', top: '0px', width: '100%', height: '88%', overflow: 'auto' }}>

                            {/*<!-- 顶部选项 start -->*/}
                            <div ref='father'>
                                <ul className="schedule-nav" ref="scheduleNav">
                                    <li>
                                        <Link to={appoint}>
                                            <p>预约课程</p>
                                            <div className="nav-line" style={{ display: 'block' }}>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/My_timetable" style={{ color: '#333' }}>
                                            <p>我的课表
                                                  {
                                                      this.state.isShows?<span style={{position:'absolute',top:'0',right:'1rem',width:'0.4rem',height:'0.4rem',textAlign:'center',lineHeight:'0.4rem',borderRadius:'100%',backgroundColor:'red',color:'#fff',fontSize:'12px'}}>{this.state.shareNum}</span>:''
                                                     }
                                            </p>
                                            <div className="nav-line">
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                                {/*<!-- 顶部选项 end -->*/}
                                <p className='tiyanTiltle'>亲爱的学员，我们会根据日期推荐适合您的体验课程，点击“加入”即可约课。购买30或60课时套餐成为正式学员后，可按教材体系上课。</p>

                                <div className="swiper-container swiper1" ref='box'>
                                    <div ref="hua" className="swiper-wrapper">
                                        <div className='swiper-slide'>
                                            <ul ref="hua" className="timebox">
                                                {dataArrs}
                                            </ul>
                                        </div>
                                        <div className='swiper-slide'>
                                            <ul className="timebox" ref="timebox">
                                                {dataAra}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="swiper-pagination"></div>
                                </div>
                            </div>
                            {items}
                        </div>

                        <div className="appointmentAlertBox" ref="appointmentAlertBox">
                            <div className="appointmentAlert">
                                <p>本次加入消耗1课时确定加入</p>
                                <div className="appointmentAlert-btnbox">
                                    <button type="button" className="appointmentAlert-cancel"
                                        onClick={this.handleClickGuan.bind(this)}>取消
                                </button>
                                    <button type="button" className="orange-btn appointmentAlert-suc"
                                        onClick={(e) => this.yuyueSucClick(e)}>确定
                                </button>
                                </div>
                            </div>
                        </div>
                        <div className="appointmentAlertBox" ref="neirong">
                            <div className="appointmentAlert">
                                <p>{this.state.neirong}</p>
                                <div className="appointmentAlert-btnbox">
                                    <button type="button" style={{ margin: '0 auto' }}
                                        className="orange-btn appointmentAlert-suc" onClick={(e) => this.zhidaole(e)}>确定
                                </button>
                                </div>
                            </div>
                        </div>
                        <div className="appointmentAlertBox" ref="shengyuks">
                            <div className="appointmentAlert">
                                <p>您的课时不足，暂时不能预约</p>
                                <div className="appointmentAlert-btnbox">
                                    <button type="button" style={{ margin: '0 auto' }}
                                        className="orange-btn appointmentAlert-suc" onClick={(e) => this.ykClick(e)}>确定
                                </button>
                                </div>
                            </div>
                        </div>
                        {/*尾部start*/}
                        <Footer num="2" />
                    </div>
                </div>
            </div>
        )
    }
}