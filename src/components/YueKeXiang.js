/**
 * Created by Administrator on 2017/8/24.
 */
import React, { Component } from 'react';
import Footer from './footer';
import CourseSurvew from './courseSurvew';
import Times from './times';//我的个人中心
import { hashHistory } from 'react-router';
import $ from 'jquery';


require('../js/swiper.js');
require('../styles/swiper-3.2.7.min.css');
window.cleTime = 0;

function dateZhuan(str) {
    let arr1 = str.split(' ')[0].split('-');
    let arr2 = str.split(' ')[1].split(':');
    let nowDate = new Date();
    nowDate.setFullYear(arr1[0]);
    nowDate.setMonth(parseInt(arr1[1]) - 1);
    nowDate.setDate(arr1[2]);
    nowDate.setHours(arr2[0]);
    nowDate.setMinutes(arr2[1]);
    nowDate.setSeconds(arr2[2].substring(0, arr2[2].indexOf(".")));
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
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

export default class MyAppointment extends React.Component {
    state = {
        time: new Date(),
        isOpen: false,
        theme: 'default'
    };

    constructor() {
        super();
        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            datas: null,
            days: '',
            isShow: false,
            time: '',
            data: '',
            lessonId: '',
            lessonIds: '',
            isSuc: false,
            isYue: false,
            dateArr: [],
            isActive: 0,
            levels: null,
            FileTittles: null,
            Describes: null,
            StartTimes: '',
            imgUrl: null,
            neirong: null,
            dateAr: [],
            demandid: null,
            bool: 0,
            yuekeshijian: null,
            DemandId: null,

            serverTime: null,
            modile: null,
            primaryuserid: null,
            openid: null,
            liked: true,
            count: 60
        };
        this.jiaruClick = this.jiaruClick.bind(this);
    }

    jiaruClick(v1, v2, v3) {
        this.refs.appointmentAlertBox.style.display = 'block';
        let id = location.href.substring(location.href.lastIndexOf("?") + 1);
        this.setState({
            isShow: true,
            time: v1.replace('T', ' '),
            data: v1,
            lessonIds: v2,
            isYue: true
        })
    }

    handleClickO(v1, v2, v3) {
        // clearInterval(cleTime);
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        this.setState({
            days:v1
        })
        // cleTime = setInterval(function () {
            $.ajax({
                type: "GET",
                url: urls + `api/Demands/GetLessonRoom?LessonTime=${v1}&BDEId=${ret.uid}&BookingId=${ret.bid}`,
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == 1) {
                        if (json.data == null || json.data.length == 0  ) {
                            this.refs.tableboxs.style.display = 'block';
                            this.refs.tableboxs1.style.display = 'none';
                            this.refs.tablebox.style.display = 'none';
                            return false;
                        } else if(json.data[0].IsExpire == 1){
                            this.refs.tableboxs.style.display = 'none';
                            this.refs.tableboxs1.style.display = 'block';
                            this.refs.tablebox.style.display = 'none';
                            return false;
                        } else {
                            this.refs.tableboxs.style.display = 'none';
                            this.refs.tableboxs1.style.display = 'none';
                            this.refs.tablebox.style.display = 'block';
                            this.setState({
                                datas: json.data
                            });
                        }

                    }
                }.bind(this)
            });
        // }.bind(this), 3000)
        

        const { dateArr } = this.state;
        this.setState({
            days: dateArr[v3].time,
            isActive: v3
        });
        function GetCookie(sName) {
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
        // $.ajax({
        //     type: "GET",
        //     url: urls + `api/Demands/GetLessonRoom?LessonTime=${this.state.dateArr[v3].time}&BDEId=${ret.uid}&BookingId=${ret.bid}`,
        //     headers: { Authorization: localStorage.getItem('Tonken') },
        //     dataType: "json",
        //     success: function (json) {
        //         if (json.result == 1) {
        //             if (json.data == null || json.data.length == 0  ) {
        //                     this.refs.tableboxs.style.display = 'block';
        //                     this.refs.tableboxs1.style.display = 'none';
        //                     this.refs.tablebox.style.display = 'none';
        //                     return false;
        //                 } else if(json.data[0].IsExpire == 1){
        //                     this.refs.tableboxs.style.display = 'none';
        //                     this.refs.tableboxs1.style.display = 'block';
        //                     this.refs.tablebox.style.display = 'none';
        //                     return false;
        //                 } else {
        //                     this.refs.tableboxs.style.display = 'none';
        //                     this.refs.tableboxs1.style.display = 'none';
        //                     this.refs.tablebox.style.display = 'block';
        //                     this.setState({
        //                         datas: json.data
        //                     });
        //                 }
        //         }
        //     }.bind(this)
        // });

    }

    handleClickOs(v1, v2, v3) {
        // clearInterval(cleTime);
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        this.setState({
            days:v1
        })
        // cleTime = setInterval(function () {
            $.ajax({
                type: "GET",
                url: urls + `api/Demands/GetLessonRoom?LessonTime=${v1}&BDEId=${ret.uid}&BookingId=${ret.bid}`,
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == 1) {
                        if (json.data == null || json.data.length == 0  ) {
                            this.refs.tableboxs.style.display = 'block';
                            this.refs.tableboxs1.style.display = 'none';
                            this.refs.tablebox.style.display = 'none';
                            return false;
                        } else if(json.data[0].IsExpire == 1){
                            this.refs.tableboxs.style.display = 'none';
                            this.refs.tableboxs1.style.display = 'block';
                            this.refs.tablebox.style.display = 'none';
                            return false;
                        } else {
                            this.refs.tableboxs.style.display = 'none';
                            this.refs.tableboxs1.style.display = 'none';
                            this.refs.tablebox.style.display = 'block';
                            this.setState({
                                datas: json.data
                            });
                        }
                    }
                }.bind(this)
            });
        // }.bind(this), 3000)
        

        const { dateAr } = this.state;
        this.setState({
            days: dateAr[v3].time,
            isActive: dateAr[v3].val
        });
        function GetCookie(sName) {
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
        // $.ajax({
        //     type: "GET",
        //     url: urls + `api/Demands/GetLessonRoom?LessonTime=${this.state.dateAr[v3].time}&BDEId=${ret.uid}&BookingId=${ret.bid}`,
        //     headers: { Authorization: localStorage.getItem('Tonken') },
        //     dataType: "json",
        //     success: function (json) {
        //         if (json.result == 1) {
        //             if (json.data == null || json.data.length == 0  ) {
        //                     this.refs.tableboxs.style.display = 'block';
        //                     this.refs.tableboxs1.style.display = 'none';
        //                     this.refs.tablebox.style.display = 'none';
        //                     return false;
        //                 } else if(json.data[0].IsExpire == 1){
        //                     this.refs.tableboxs.style.display = 'none';
        //                     this.refs.tableboxs1.style.display = 'block';
        //                     this.refs.tablebox.style.display = 'none';
        //                     return false;
        //                 } else {
        //                     this.refs.tableboxs.style.display = 'none';
        //                     this.refs.tableboxs1.style.display = 'none';
        //                     this.refs.tablebox.style.display = 'block';
        //                     this.setState({
        //                         datas: json.data
        //                     });
        //                 }
        //         }
        //     }.bind(this)
        // });

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
                                    dateAr: dataArr,
                                    days: dataArrs[0].time
                                });


                                let ret = {};//定义数组
                                location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
                                    ret[b] = unescape(c);
                                });



                                $.ajax({
                                    type: "GET",
                                    url: urls + `api/Demands/GetLessonRoom?LessonTime=${this.state.dateArr[this.state.isActive].time}&BDEId=${ret.uid}&BookingId=${ret.bid}`,
                                    headers: { Authorization: localStorage.getItem('Tonken') },
                                    dataType: "json",
                                    success: function (json) {
                                        if (json.result == 1) {
                                            if (json.data == null || json.data.length == 0  ) {
                                                this.refs.tableboxs.style.display = 'block';
                                                this.refs.tableboxs1.style.display = 'none';
                                                this.refs.tablebox.style.display = 'none';
                                                return false;
                                            } else if(json.data[0].IsExpire == 1){
                                                this.refs.tableboxs.style.display = 'none';
                                                this.refs.tableboxs1.style.display = 'block';
                                                this.refs.tablebox.style.display = 'none';
                                                return false;
                                            } else {
                                                this.refs.tableboxs.style.display = 'none';
                                                this.refs.tableboxs1.style.display = 'none';
                                                this.refs.tablebox.style.display = 'block';
                                                this.setState({
                                                    datas: json.data
                                                });
                                            }
                                        }
                                    }.bind(this)
                                });

                                

                                $.ajax({
                                    type: "GET",
                                    url: urls + `api/Demands/ClassBookDetails?BdeId=${ret.uid}&BookingId=${ret.bid}`,
                                    headers: { Authorization: localStorage.getItem('Tonken') },
                                    dataType: "json",
                                    success: function (json) {
                                        if (json.result == 1) {
                                            this.setState({
                                                levels: json.data[0].LevelName,
                                                FileTittles: json.data[0].FileTittle.substring(json.data[0].FileTittle.indexOf("L")),
                                                Describes: json.data[0].Describe,
                                                StartTimes: json.data[0].StartTime,
                                                imgUrl: json.data[0].FilePath,
                                                demandid: json.data[0].DemandId,
                                                yuekeshijian: json.data[0].StartTime,
                                                DemandId: json.data[0].DemandId
                                            });
                                        }
                                    }.bind(this)
                                });

                                $.ajax({
                                    type: "GET",
                                    url: urls + `api/Demands/GetLessonRoom?LessonTime=${dataArrs[0].time}&BDEId=${ret.uid}&BookIngId=${ret.bid}`,
                                    headers: { Authorization: localStorage.getItem('Tonken') },
                                    dataType: "json",
                                    success: function (json) {
                                        if (json.result == 1) {
                                           if (json.data == null || json.data.length == 0  ) {
                                                this.refs.tableboxs.style.display = 'block';
                                                this.refs.tableboxs1.style.display = 'none';
                                                this.refs.tablebox.style.display = 'none';
                                                return false;
                                            } else if(json.data[0].IsExpire == 1){
                                                this.refs.tableboxs.style.display = 'none';
                                                this.refs.tableboxs1.style.display = 'block';
                                                this.refs.tablebox.style.display = 'none';
                                                return false;
                                            } else {
                                                this.refs.tableboxs.style.display = 'none';
                                                this.refs.tableboxs1.style.display = 'none';
                                                this.refs.tablebox.style.display = 'block';
                                                this.setState({
                                                    datas: json.data
                                                });
                                            }
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
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        // if (cleTime == 0) {
            // cleTime = setInterval(function () {
                // $.ajax({
                //     type: "GET",
                //     url: urls + `api/Demands/GetLessonRoom?LessonTime=${this.state.dateArr[this.state.isActive].time}&BDEId=${ret.uid}&BookingId=${ret.bid}`,
                //     headers: { Authorization: localStorage.getItem('Tonken') },
                //     dataType: "json",
                //     success: function (json) {
                //         if (json.result == 1) {
                //             if (json.data == null || json.data.length == 0  ) {
                //                 this.refs.tableboxs.style.display = 'block';
                //                 this.refs.tableboxs1.style.display = 'none';
                //                 this.refs.tablebox.style.display = 'none';
                //                 return false;
                //             } else if(json.data[0].IsExpire == 1){
                //                 this.refs.tableboxs.style.display = 'none';
                //                 this.refs.tableboxs1.style.display = 'block';
                //                 this.refs.tablebox.style.display = 'none';
                //                 return false;
                //             } else {
                //                 this.refs.tableboxs.style.display = 'none';
                //                 this.refs.tableboxs1.style.display = 'none';
                //                 this.refs.tablebox.style.display = 'block';
                //                 this.setState({
                //                     datas: json.data
                //                 });
                //             }
                //         }
                //     }.bind(this)
                // });
            // }.bind(this), 3000)
        // }

    }

    yuyueSucClick() {//预约
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });

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
            url: urls + `api/Demands/JoinLessonRoom?LessonId=${this.state.lessonIds}&LessonTime=${this.state.time}&BookingId=${ret.bid}&BDEId=${ret.uid}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    this.refs.appointmentAlertBox.style.display = "none";
                    this.refs.neirong.style.display = "block";
                    this.setState({
                        neirong: json.msg
                    });
                } else if (json.result == -3) {
                    this.refs.neirong.style.display = "block";
                    this.refs.appointmentAlertBox.style.display = "none";
                    this.setState({
                        neirong: "您还未购买课时，请购买后再加入"
                    });
                } else if (json.result == -2) {
                    this.refs.neirong.style.display = "block";
                    this.refs.appointmentAlertBox.style.display = "none";
                    this.setState({
                        neirong: "您的课时已过期，暂时不能预约"
                    });
                } else if (json.result == -4) {
                    this.refs.neirong.style.display = "block";
                    this.refs.appointmentAlertBox.style.display = "none";
                    this.setState({
                        neirong: "剩余课时已被占用"
                    });
                } else if (json.result == -1) {
                    this.refs.neirong.style.display = "block";
                    this.refs.appointmentAlertBox.style.display = "none";
                    this.setState({
                        neirong: "您的课时不足，暂时不能预约"
                    });
                } else {
                    this.refs.neirong.style.display = "block";
                    this.refs.appointmentAlertBox.style.display = "none";
                    this.setState({
                        neirong: json.msg
                    });
                }
            }.bind(this)
        });

    }

    handleClickGuan() {
        this.refs.appointmentAlertBox.style.display = 'none';
    }

    zhidaole() {
        this.refs.neirong.style.display = "none";
        location.reload(true);
    }

    ykClick() {
        this.refs.shengyuks.style.display = "none";
    }

    render() {
        let dataObj = this.state.datas;
        let items = [];
        if (dataObj == null || dataObj.length == 0) {
            // this.refs.tablebox.innerHTML='没有可加入的课堂了！';
            // items.push(
            //     <p style={{margin:"10px auto",width:'140px',marginLeft:'150px'}}></p>
            // )
        } else {
            if (dataObj.length == 0) {

            } else {
                dataObj.map((d, i) => {
                    let str = d.StartTime.replace('T', " ");
                    let time = dateZhuan(str);
                    let h = time.getHours();
                    let m = time.getMinutes();

                    let timePiont = (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m);
                    let btn;
                    if (this.state.DemandId != 0) {
                        btn = <td><a ref="yuyuebtn" className="yuyuebtn appointment-yuyue"
                            style={{ background: "#cdcdcd", pointerEvents: 'none' }}><span
                                className="class_ordered class_ordegrey" key={i}>加入</span></a></td>
                    } else {
                        let now = dateZhuan(this.state.serverTime);
                        let classTime = dateZhuan(d.StartTime.replace("T", " "));
                        let timeCha = classTime.getTime() - now.getTime();
                        if (timeCha < 600000) {
                            btn = <td><a ref="yuyuebtn" style={{ background: "#cdcdcd", pointerEvents: 'none' }} className="yuyuebtn appointment-yuyue"><span
                                className="class_ordered class_ordegrey" key={i}>加入</span></a></td>
                        } else {
                            btn = <td><a ref="yuyuebtn" className="yuyuebtn appointment-yuyue"><span
                                className="class_ordered wordBtn" key={i}
                                onClick={this.jiaruClick.bind(this, d.StartTime, d.LessonId, i)}>加入</span></a>
                            </td>
                        }
                    }

                    items.push(
                        <tr className="class_item_content" key={i}>
                            <td>{timePiont}</td>
                            <td></td>
                            <td>{d.scount}</td>
                            <td></td>
                            {btn}
                        </tr>
                    );
                })
            }
        }
        const { dateArr } = this.state;
        const { dateAr } = this.state;
        let dataArrs = [];
        let dataAra = [];
        dateArr.map((d, i) => {//两周时间
            let activeClass = "";
            let selectClass = ''
            let borderNo = i == 0 ? { borderLeft: '0px' } : {}
            if (this.state.isActive == i) {
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
        dateAr.map((d, i) => {//两周时间
            let activeClass = "";
            let selectClass = '';
            let borderNo = i == 0 ? { borderLeft: '0px' } : {};
            if (this.state.isActive == dateAr[i].val) {
                selectClass = 'active'
            } else {
                selectClass = ''
            }
            dataAra.push(
                <li key={i * 2} onClick={this.handleClickOs.bind(this, d.time, d.data, i)} ref="day1"
                    className={activeClass + ' ' + selectClass} style={borderNo}>
                    <p className="date_day">{d.week}</p>
                    <p className="date_date">{d.data}</p>
                </li>
            )
        });
        return (
            <div className='appBodyBox' style={{ width: '100%', height: `${document.documentElement.clientHeight}px`, 'position': 'relative' }}>
                <div style={{ position: 'absolute', left: '0px', top: '0px', width: '100%', height:'88%', overflow: 'auto', '-webkit-overflow-scrolling': 'touch; ' }}>
                    <div id="indexssOne" ref="indexs">
                        <div className="classDetailbox">
                            <div className="classDetail">
                                <Times dateTime={this.state.days} />
                            </div>
                            {/* <div className="timebigbox">
                                <div className="top-line">

                                </div>
                                <div className="active-line" ref="lin">

                                </div>
                                <div className="timeinnerbox">
                                    <ReactSwipe className="ReactSwipe" swipeOptions={swipeOptions}>
                                        <ul ref="hua" className="timebox">
                                            {dataArrs}
                                        </ul>
                                        <ul className="timebox" ref="timebox">
                                            {dataAra}
                                        </ul>
                                    </ReactSwipe>
                                </div>
                                <ul className="time-pagbox">
                                    <li ref="first" className="active-pag">

                                    </li>
                                    <li ref="second">

                                    </li>
                                </ul>
                                <div className="sanjiao">

                                </div>
                            </div> */}
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
                        <div className="tablebox" ref="tablebox">
                            <table>
                                <thead>
                                    <tr>
                                        <th>开课时间</th>
                                        <th></th>
                                        <th>剩余席位</th>
                                        <th></th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items}
                                </tbody>
                            </table>
                        </div>
                        <div className="tablebox" ref="tableboxs" style={{'border':'none'}}>
                            <img src="../images/remind.png" style={{'display':'block','margin':'0 auto','width':'100px','height':'100px'}}></img>
                            <p style={{ fontSize: '14px', lineHeight: "60px",'textAlign':'center' }}>没有合适的课程可加入，换个日期看看吧</p>
                            <p style={{ fontSize: '14px', 'textAlign':'center','color':'#2B8EEF' }}>每周一晚8点，批量开放预约下一周的课程</p>
                        </div>
                        <div className="tablebox" ref="tableboxs1" style={{'border':'none'}}>
                            <img src="../images/remind.png" style={{'display':'block','margin':'0 auto','width':'100px','height':'100px'}}></img>
                            <p style={{ fontSize: '14px', lineHeight: "60px",'textAlign':'center' }}>当前日期已经超过了您的课时有效期，请换个近点</p>
                            <p style={{ fontSize: '14px', 'textAlign':'center'}}>的日期看看吧</p>
                        </div>
                        {/*<!-- 预约弹框 start -->*/}
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
                        {/*<!-- 预约弹框 end -->*/}
                        {/*尾部start*/}

                    </div>
                    {/*调查start*/}
                    <div className="CourseSurVew" ref="CourseSurVew" id="CourseSurVew">
                        <CourseSurvew className="shows" ref="shows" />
                    </div>
                    {/*调查end*/}

                </div>
                <Footer num="2" />
            </div>
        )
    }
}