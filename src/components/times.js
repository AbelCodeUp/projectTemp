import React, { Component } from 'react';

import ReactDOM from 'react-dom';
//import { convertDate } from '../lib/time.js';
// import DatePicker from '../lib/index';
//import DatePicker from 'react-mobile-datepicker';
// import DatePicker from '../../dist/react-mobile-datepicker.js';
import $ from 'jquery';
window.Perf = require('react-addons-perf');
function GetCookie(sName) {
    let aCookie = document.cookie.split("; ");
    for (let i = 0; i < aCookie.length; i++) {
        let aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return null;
}

function dateZhuan(str) {
    let arr1 = str.split(' ')[0].split('-');
    let arr2 = str.split(' ')[1].split(':');
    let nowDate = new Date();
    nowDate.setFullYear(arr1[0]);
    nowDate.setMonth(parseInt(arr1[1]) - 1);
    nowDate.setDate(arr1[2]);
    nowDate.setHours(arr2[0]);
    nowDate.setMinutes(arr2[1]);
    //nowDate.setSeconds(arr2[2].substring(0,arr2[2].indexOf(".")));
    return nowDate;
}
window.dateStr = ''
// (function main() {
export default class MyAppointment extends React.Component {

    state = {
        time: new Date(),
        isOpen: false,
        theme: 'default',
        ModalText: 'Content of the modal',
        visible: false,
        datas: null,
        days: null,
        isShow: false,
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
        aa: false,
        serverTime: '',
        dateArr: [],
        days: '',
        timeobj1: [],
        timeobj2: [],
        timeobj3: [],
        isActive: 0,
        isActive2: null
    };


    bb(a) {
        // this.setState({
        //     aa:true
        // })
        console.log(a.state.timess);
    }
    componentWillMount() {
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        $.ajax({
            type: "GET",
            url: urls + 'api/HomePage/GetSystemTime',//系统时间
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                this.setState({
                    serverTime: json.data.SysDateTime
                })
            }.bind(this)
        })
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
                        lessonid: json.data[0].LessionId
                    });

                }
            }.bind(this)
        });

    }

    handleToggle = (isOpen) => () => {
        this.setState({ isOpen });
    }
    handleThemeToggle = (theme) => () => {
        this.setState({ theme, isOpen: true });
        $.ajax({
            type: "GET",
            url: urls + 'api/HomePage/GetSystemTime',//系统时间
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    this.setState({
                        serverTime: json.data.SysDateTime
                    })
                    //获取两周的时间

                    if (json.data.SysDateTime != '') {
                        let arr1 = json.data.SysDateTime.split(' ')[0].split('-');
                        let arr2 = json.data.SysDateTime.split(' ')[1].split(':');
                        let nowDate = new Date();
                        nowDate.setFullYear(arr1[0]);
                        nowDate.setMonth(parseInt(arr1[1]) - 1);
                        nowDate.setDate(arr1[2]);
                        nowDate.setHours(arr2[0]);
                        nowDate.setMinutes(arr2[1]);
                        nowDate.setSeconds(arr2[2].substring(0, arr2[2].indexOf(".")));
                        //let nowDate = new Date(arr1[0], arr1[1] - 1, arr1[2], arr2[0], arr2[1], '00');
                        let dataArrs = [];
                        const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                        for (let i = 1; i < 14; i++) {
                            let futDate = new Date(nowDate);
                            futDate.setDate(nowDate.getDate() + i)

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
                        })
                        this.refs.dateBox.style.display = 'block';
                    }
                }
            }.bind(this)
        });

    }

    handleSelect = (time) => {
        console.log(time)
        // setTimeout(()=>{
        //     this.setState({ time, isOpen: false });
        // },199999999999999999)
    }

    handleYuYuea(timeval) {

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
        // window.history.go(0);
        //location.href=location.href;
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        // $.ajax({
        //     type: "GET",
        //     url: urls + `api/Demands/ClassBookDetails?BdeId=${ret.uid}&BookingId=${ret.bid}`,
        //     headers: { Authorization: GetCookie('Tonken') },
        //     dataType: "json",
        //     success: function (json) {
        //         if (json.result == 1) {
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

        //         }
        //     }.bind(this)
        // });
        // $.ajax({
        //     type: "GET",
        //     url: urls+`api/Demands/GetLessonRoom?LessonTime=${dateStr}&BDEId=${ret.uid}&BookingId=${ret.bid}`,
        //     headers: { Authorization: GetCookie('Tonken') },
        //     dataType: "json",
        //     success: function (json){
        //         if (json.result == 1) {
        //             if (json.data.length == 0) {
        //                 this.refs.tableboxs.style.display = 'block';
        //                 this.refs.tablebox.style.display = 'none';
        //                 return false;
        //             } else {
        //                 this.refs.tableboxs.style.display = 'none';
        //                 this.refs.tablebox.style.display = 'block';
        //                 this.setState({
        //                     datas: json.data,
        //                     LessonIds: json.data[0].LessonId
        //                 });
        //             }
        //         }
        //     }.bind(this)
        // });
        location.reload(true)
    }

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleCancel = () => {
        this.setState({ isOpen: false });
    }

    handleSelect = (time) => {
        this.setState({ time, isOpen: false });
        console.log(time);
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        $.ajax({
            type: "GET",
            url: urls + `api/Demands/ReserveLessonRoom?BookingId=${ret.bid}&BDEId=${ret.uid}&LessonTime=${time}`,//预约课程
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    this.refs.shengyuks.style.display = 'block';
                    this.refs.tishis.innerHTML = json.msg;

                } else if (json.result == -3) {
                    this.refs.shengyuks.style.display = 'block';
                    //this.refs.tishis.innerHTML = json.msg;
                } else if (json.result == -1) {//课时不足
                    this.refs.shengyuks.style.display = 'block';
                    this.refs.tishis.innerHTML = json.msg;
                }
                else {
                    this.refs.errorTishi.style.display = 'block';
                    this.refs.errorTishiword.innerHTML = json.msg;
                    let that = this;
                    setTimeout(function () {
                        that.refs.errorTishi.style.display = 'none';
                    }, 2000)
                }
            }.bind(this)
        });

    }
    handleClickO(v1, v2, v3) {//根据日期获取时间
        this.setState({
            days: v1,
            isActive: v3,
            isActive2: null
        });
        $.ajax({
            type: "GET",
            url: urls + `api/Demands/GetTch_Lesson?LessonTime=${v1}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    this.refs.dateBox.style.display = 'none';
                    this.refs.datedayBox.style.display = 'block';
                    let obj = json.data;
                    this.setState({
                        timeobj1: json.data[0],
                        timeobj2: json.data[1],
                        timeobj3: json.data[2]
                    })
                }
            }.bind(this)
        });

    }
    timeClick(v, v2) {
        this.setState({
            isActive2: v,
            time: v2
        })

    }
    yekeSucClick() {//预约确定

        let ret = {};//定义数组  
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        $.ajax({
            type: "GET",
            url: urls + `api/Demands/ReserveLessonRoom?BookingId=${ret.bid}&BDEId=${ret.uid}&LessonTime=${this.state.days + ' ' + this.state.time}`,//预约课程
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                this.refs.datedayBox.style.display = 'none';
                if (json.result == 1) {
                    this.refs.shengyuks.style.display = 'block';
                    this.refs.tishis.innerHTML = json.msg;

                } else if (json.result == -3) {
                    this.refs.shengyuks.style.display = 'block';
                    this.refs.tishis.innerHTML = '您还未购买课程！';
                } else if (json.result == -1) {//课时不足
                    this.refs.shengyuks.style.display = 'block';
                    this.refs.tishis.innerHTML = '您的课时不足，暂时不能预约';
                }
                else {
                    this.refs.errorTishi.style.display = 'block';
                    this.refs.errorTishiword.innerHTML = json.msg;
                    let that = this;
                    setTimeout(function () {
                        that.refs.errorTishi.style.display = 'none';
                    }, 2000)
                }
            }.bind(this)
        });
    }
    keshitipClick() {
        this.refs.dateBox.style.display = 'none'
    }
    keshitipClick2() {
        this.refs.datedayBox.style.display = 'none'
    }
    backClick() {
        this.refs.datedayBox.style.display = 'none'
        this.refs.dateBox.style.display = 'block'
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
                    this.refs.tishis.innerHTML = "已取消预约";                   
                } else {
                    this.refs.shengyuks.style.display = "block";
                    this.refs.tishis.innerHTML = json.msg
                }
            }.bind(this)
        });
    }

    render() {
        dateStr = this.props.dateTime;
        var t_date = new Date();

        let min;
        if (t_date.getHours() <= 8 || (t_date.getHours >= 9 && t_date.getMinutes() >= 20)) {
            min = new Date(new Date().getTime() + 8 * 60);
        } else {
            min = new Date();
        }

        let sum = 13 * 24 * 60 * 60 * 1000;
        let nextDay = new Date(min.getFullYear(), min.getMonth(), min.getDate(), '08', '00', '00');
        let fuDay = new Date(min.getTime() + sum);
        let max = new Date(fuDay.getFullYear(), fuDay.getMonth(), fuDay.getDate(), '22', '00', '00');

        let yuyuebtn;
        if (this.state.StartTimes == "") {
            // yuyuebtn = <p className="classDetailP" ref="yuyueshijianOne"><span ref="tishi">点击预约，可自主选择预约开课时间</span>
            //     <button ref="yuyuebtn" className="yuyue">
            //         <div>
            //             <a ref="yuyueA" className="select-btn sm" onClick={this.handleThemeToggle('ios')} style={{ width: '80px', height: '30px', margin: '0px', padding: '0px', background: 'rgba(0,0,0,0)', border: 'none', color: 'white' }}>
            //                 预约 </a>
            //         </div>
            //         {/* <DatePicker
            //             value={new Date(nextDay)}
            //             isOpen={this.state.isOpen}
            //             onSelect={this.handleSelect}
            //             onCancel={this.handleCancel}
            //             max={new Date(max)}
            //             min={new Date(nextDay)}
            //             dateFormat={['M', 'D', 'h', 'm']}
            //         /> */}
            //     </button>
            // </p>
            yuyuebtn = ''
        } else if (this.state.lessonid != 0 && this.state.StartTimes != ""  && this.state.serverTime!='') {
            let now = dateZhuan(this.state.serverTime);
            let classTime = dateZhuan(this.state.StartTimes);
            let timeCha = classTime.getTime() - now.getTime();
            if (timeCha < 0) {                
                yuyuebtn = <p className="classDetailP" ref="yuyueshijianFour"><span ref="tishiThird">已加入{this.state.yuekeshijian}的课程</span>
                    <button ref="yuyuebtn" className="yuyue">正在上课</button>
                </p>
            }else if(timeCha < 600000 && timeCha >= 0){
                yuyuebtn = <p className="classDetailP" ref="yuyueshijianThree"><span ref="tishiThird">已加入{this.state.yuekeshijian}的课程</span>
                <button ref="yuyuebtn" className="yuyue" style={{ background:"#ccc"}}>取消课程</button>
            </p>
            } else {
                yuyuebtn = <p className="classDetailP" ref="yuyueshijianThree"><span ref="tishiThird">已加入{this.state.yuekeshijian}的课程</span>
                    <button ref="yuyuebtn" className="yuyue" onClick={this.handleYuYuea.bind(this, this.state.yuekeshijian)}>取消课程</button>
                </p>
            }

        } else if (this.state.lessonid == 0 && this.state.StartTimes != "") {
            yuyuebtn = <p className="classDetailP" ref="yuyueshijianTwo"><span ref="tishiSecond">已预约课程：{this.state.yuekeshijian}</span>
                <button ref="yuyuebtn" className="yuyue" onClick={this.handleYuYuea.bind(this, this.state.yuekeshijian)}>取消预约</button>
            </p>
        }

        const { dateArr, timeobj1, timeobj2, timeobj3 } = this.state;
        let newArr = [];
        dateArr.map((d, i) => {//两周时间
            let activeClass = "";
            let selectClass = ''
            if (d.week == '周六' || d.week == '周日') {
                activeClass = 'week'
            } else {
                activeClass = ''
            }
            if (this.state.isActive == i) {
                selectClass = 'active'
            } else {
                selectClass = ''
            }
            newArr.push(
                // 
                <li key={i} onClick={this.handleClickO.bind(this, d.time, d.data, i)} className={activeClass + ' ' + selectClass}>
                    <p>{d.week}</p>
                    <p>{d.data}</p>
                </li>
            )
        })
        let hourArr = [];
        if (timeobj1.length != 0) {
            let keynum = 0;
            timeobj1.map((d, i) => {
                keynum++;
                let timeClass = '';
                let selectClass = "";
                if (d.Status == 0) {
                    timeClass = '';
                } else if (d.Status == 1) {
                    timeClass = 'week';
                }
                if (this.state.isActive2 == keynum) {
                    selectClass = 'active'
                } else {
                    selectClass = ''
                }
                hourArr.push(
                    <li className={timeClass + ' ' + selectClass} key={keynum} onClick={this.timeClick.bind(this, keynum, d.Time)}>
                        {d.Time}
                    </li>
                )
            })
            timeobj2.map((d, i) => {
                keynum++;
                let timeClass = '';
                let selectClass = "";
                if (d.Status == 0) {
                    timeClass = '';
                } else if (d.Status == 1) {
                    timeClass = 'week';
                }
                if (this.state.isActive2 == keynum) {
                    selectClass = 'active'
                } else {
                    selectClass = ''
                }
                hourArr.push(
                    <li className={timeClass + ' ' + selectClass} key={keynum} onClick={this.timeClick.bind(this, keynum, d.Time)}>
                        {d.Time}
                    </li>
                )
            })
            timeobj3.map((d, i) => {
                keynum++;
                let timeClass = '';
                let selectClass = "";
                if (d.Status == 0) {
                    timeClass = '';
                } else if (d.Status == 1) {
                    timeClass = 'week';
                }
                if (this.state.isActive2 == keynum) {
                    selectClass = 'active'
                } else {
                    selectClass = ''
                }
                hourArr.push(
                    <li className={timeClass + ' ' + selectClass} key={keynum} onClick={this.timeClick.bind(this, keynum, d.Time)}>
                        {d.Time}
                    </li>
                )
            })
        }

        let quedingClass = this.state.isActive2 == null ? 'quedingBtn' : 'quedingBtn active'





        return (
            <div className="App" ref="apps">
                {yuyuebtn}
                <div className="schedule-imgbox">
                    <img src={imgs+this.state.imgUrl} alt="" />
                </div>
                <div className="schedule-con">
                    <div className="class-title">
                        <span className="orgin-shi">{this.state.levels}</span>
                        <p>{this.state.FileTittles}</p>
                    </div>
                    <p>{this.state.Describes}</p>
                </div>

                <div className="appointmentAlertBox" ref="shengyuks">
                    <div className="appointmentAlert">
                        <p ref="tishis">您的课时不足，暂时不能预约</p>
                        <div className="appointmentAlert-btnbox">
                            <button type="button" style={{ margin: '0 auto' }} className="orange-btn appointmentAlert-suc"
                                onClick={(e) => this.ykClick(e)}>知道了
                                </button>
                        </div>
                    </div>
                </div>

                <div className="appointmentAlertBox" ref="errorTishi">
                    <div className="appointmentAlert appointmentAlert1">
                        <p ref="errorTishiword">您的课时不足，暂时不能预约</p>
                    </div>
                </div>

                <div className="appointmentAlertBox" ref="dateBox">
                    <div className="dateBox">
                        <span className="closeX" onClick={this.keshitipClick.bind(this)}>&times;</span>
                        <div className="dateBoxTop">

                            <p>预约日期</p>
                        </div>
                        <ul className="dateDayBox">
                            {newArr}
                        </ul>
                    </div>
                </div>

                <div className="appointmentAlertBox" ref="datedayBox">
                    <div className="dateBox dateBox2">
                        <span className="closeX" onClick={this.keshitipClick2.bind(this)}>&times;</span>
                        <div className="dateBoxTop">
                            <p><span onClick={this.backClick.bind(this)}>&lt; 返回</span>预约时间</p>
                        </div>
                        <ul className="dateHourBox">
                            {hourArr}
                        </ul>
                        <button type='button' className={quedingClass} refs='quedingBtn1' onClick={this.yekeSucClick.bind(this)}>完成</button>
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
                    <div className="appointmentAlert" style={{height:"5.47rem"}}>
                        <p style={{padding:"0.885rem 0.23rem 0"}}>本月您有2次不扣课时的取消机会<br/>（课前24小时），本次取消不会扣除课时</p>
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
                        <p style={{padding:"0.885rem 0.23rem 0"}}>本月您已消耗完2次机会，<br/>本次取消将扣除您1课时</p>
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
        );
    }
}