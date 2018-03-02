/**
 * Created by Administrator on 2017/8/24.
 */
/**
 * Created by Administrator on 2017/8/24.
 */
import React, { Component } from 'react';
import Footer from './footer';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';
import $ from 'jquery';

export default class MyAppointment extends React.Component {
    constructor() {
        super();
        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            datas: null,
            days: null,
            isShow: false,
            time: '',
            data: '',
            lessonId: '',
            isSuc: false,
            isYue: false,
            dateArr: [],
            isActive: 0,
            levels: null,
            FileTittles: null,
            Describes: null,
            StartTimes: null,
            imgUrl: null
        };
        this.yuyueClick = this.yuyueClick.bind(this);
    }
    yuyueClick(v1, v2) {
        this.refs.appointmentAlertBox.style.display = 'block';
        let id = location.href.substring(location.href.lastIndexOf("?") + 1);
        this.setState({
            isShow: true,
            time: v2,
            data: v1,
            lessonId: id,
            isYue: true
        })

    }
    handleClickO(v1, v2, v3) {
        this.refs.lin.style.left = 0.477 + v3 * 1.294 + "rem";
        this.refs.lin.style.transition = "0.5s";
        this.setState({
            days: v1,
            isActive: v3
        });
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        console.log(v3);
        const { dateArr } = this.state;
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
            url: urls + `api/Lesson/GetLessonList?Date=${this.state.dateArr[v3].time}&BdId=${ret.uid}&Level=${ret.levels}&BookIngId=${ret.bid}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    console.log(json);
                    this.setState({
                        datas: json.data
                    });
                }
            }.bind(this)
        });
    }
    componentDidMount() {
        //获取两周的时间
        let nowDate = new Date();
        let dataArrs = [];
        const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        for (let i = 0; i < 14; i++) {
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
        this.setState({
            dateArr: dataArrs,
            days: dataArrs[0].time
        });
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
            url: urls + `api/Lesson/ClassBookDetails?BdeId=${ret.uid}&BookingId=${ret.bid}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                this.setState({
                    levels: json.data[0].LevelName,
                    FileTittles: json.data[0].FileTittle.substring(json.data[0].FileTittle.indexOf("L")),
                    Describes: json.data[0].Describe,
                    StartTimes: json.data[0].StartTime.substring(json.data[0].StartTime.indexOf("-") + 1),
                    imgUrl: json.data[0].FilePath
                })
            }.bind(this)
        });

        $.ajax({
            type: "GET",
            url: urls + `api/Lesson/GetLessonList?Date=${dataArrs[0].time}&BdId=${ret.uid}&Level=${ret.levels}&BookIngId=${ret.bid}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                this.setState({
                    datas: json.data
                });
            }.bind(this)
        });
    }

    GradSubmit() {
        this.setState({
            isShow: false
        });

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
            type: "POST",
            url: urls + `api/Lesson/AddLesson?date=${this.state.days}&hours=${this.state.time}&bookingid=${ret.bid}&bdeId=${ret.uid}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    this.setState({
                        isSuc: true,
                        isYue: false
                    })
                    let that = this;

                    setTimeout((that) => {
                        this.setState({
                            isSuc: false,
                            isShow: false
                        })
                        // window.history.go(0);
                        location.href=location.href;
                    }, 1500)
                    this.refs.appointmentAlertBox.style.display = 'none';
                } else {
                    alert('预约失败');
                }
            }.bind(this)
        });
    }
    handleClickGuan() {
        this.refs.appointmentAlertBox.style.display = 'none';
    }
    handleClickNo() {
        this.refs.yy.style.display = "none";
    }
    handleClickQX() {
        function GetCookie(sName) {
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
        let id = location.href.substring(location.href.lastIndexOf("=") + 1);
        $.ajax({
            type: "POST",
            url: urls + `api/Lesson/DelLesson?lessonId=${id}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    this.refs.yyPrompts.style.display = "block";
                } else {
                    this.refs.yyPrompts.style.display = "block";
                    this.refs.yyPromptsP.innerHTML = "取消失败";
                }
                setTimeout(() => {
                    this.refs.yyPrompts.style.display = "none";
                }, 2000)
            }.bind(this)
        });

    }
    render() {
        let dataObj = this.state.datas;
        let items = [];
        if (dataObj == null) {
            // items.push(
            //     <p>今天不能再预约了</p>
            // )
        } else {
            dataObj.map((d, i) => {
                let arr = d.LessonTime.split(/[- : \/]/);
                let time = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
                //let time = new Date(d.LessonTime.replace(/-/g,"/"));
                let h = time.getHours();
                let m = time.getMinutes();
                let timePiont = (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m);
                let btn;
                if (d.IsAnInvitation == 0) {
                    if (d.Seat == 0) {
                        btn = <span className="class_ordered class_full" key={i} onClick={this.yuyueClick.bind(this, d.StartTime, timePiont)} >满员</span>
                    } else {
                        btn = <span className="class_ordered" ref="order" key={i} onClick={this.yuyueClick.bind(this, d.StartTime, timePiont)} >预约</span>
                    }
                } else {
                    btn = <span className="class_ordered class_ordegrey" key={i} onClick={this.yuyueClick.bind(this, d.StartTime, timePiont)} >预约</span>
                }

                items.push(
                    <tr className="class_item_content" key={i}>
                        <td>{timePiont}</td>
                        <td>{d.TeacherCount}</td>
                        <td>{d.Seat}</td>
                        <td>1</td>
                        <td><a href="javascript:;" className="yuyuebtn appointment-yuyue">{btn}</a></td>
                    </tr>
                );
            })
        }
        const { dateArr } = this.state;
        let dataArrs = [];
        dateArr.map((d, i) => {//两周时间
            let activeClass = "";
            let selectClass = ''
            let borderNo = i == 0 ? { borderLeft: '0px' } : {};
            // if (d.week == '周六' || d.week == '周日') {
            //     activeClass = 'date_item mo'
            // } else {
            //     activeClass = 'date_item'
            // }
            console.log(i);
            if (this.state.isActive == i) {
                selectClass = 'active'
            } else {
                selectClass = ''
            }
            dataArrs.push(
                <li key={i} onClick={this.handleClickO.bind(this, d.time, d.data, i)} ref="dayO" className={selectClass} style={borderNo}>
                    <p className="date_day">{d.week}</p>
                    <p className="date_date">{d.data}</p>
                </li>
            )
        });
        return (
            <div className='appBodyBox' style={{ width: '100%', height: `${document.documentElement.clientHeight}px`, 'position': 'relative' }}>
                <div style={{ position: 'absolute', left: '0px', top: '0px', width: '100%', height: `${document.documentElement.clientHeight - 80}px`, overflow: 'auto' }}>
                    <div className="classDetailbox">
                        <div className="classDetail" style={{ paddingTop: '0' }}>
                            <div className="stateBox">
                                <p>已预约 {this.state.StartTimes} 的课程 </p>
                                <button type="button" onClick={this.handleClickQX.bind(this)}>取消预约</button>
                            </div>
                            <div className="schedule-imgbox">
                                <img src={this.state.imgUrl} alt="" />
                            </div>
                            <div className="schedule-con">
                                <div className="class-title">
                                    <span className="orgin-shi">{this.state.levels}</span>
                                    <p>{this.state.FileTittles}</p>
                                </div>
                                <p>{this.state.Describes}</p>
                            </div>
                        </div>
                        <div className="timebigbox">
                            <div className="top-line">
                            </div>
                            <div className="active-line" ref="lin">

                            </div>
                            <div className="timeinnerbox">
                                <ul className="timebox">
                                    {/*<ReactSwipe>*/}
                                    {dataArrs}
                                    {/*</ReactSwipe>*/}
                                </ul>
                            </div>
                            <ul className="time-pagbox">
                                <li className="active-pag"></li>
                                <li></li>
                            </ul>
                            <div className="sanjiao"></div>
                        </div>
                    </div>

                    <div className="tablebox">
                        <table>
                            <thead>
                                <tr>
                                    <th>开课时间</th>
                                    <th>教室数</th>
                                    <th>剩余席位</th>
                                    <th>消耗课时</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/*尾部start*/}
                <Footer />

                {/*<!-- 满员弹框 start -->*/}
                <div className="mengtai" ref="mengtai">
                    <div className="fullAlertBox" ref="yys">
                        <div className="appointmentAlert">
                            <p>开课前两小时内不能取消预约</p>
                            <div className="fullAlert-btnbox">
                                <button type="button" className="orange-btn manyuanAlert-suc"
                                    onClick={this.handleClickNo.bind(this)}>确定
                                </button>
                            </div>
                        </div>
                    </div>
                    {/*<!-- 满员弹框 end -->*/}
                    {/*<!-- 取消预约弹框 start -->*/}
                    <div className="cancelYuyueAlertBox" ref="yyPrompts">
                        <p ref="yyPromptsP">已取消预约</p>
                    </div>
                    {/*<!-- 取消预约弹框 end -->*/}
                </div>
            </div>
        )
    }
}