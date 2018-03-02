/**
 * Created by Administrator on 2017/8/24.
 */
/**
 * Created by Administrator on 2017/8/24.
 */
import React, { Component } from 'react';
import Footer from './footer';
import { Link } from 'react-router';
import { Rate } from 'antd';
import $ from 'jquery';

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
            student: [],
            TeaGen: 0,
            TeaHead: null,
            TeaName: null,
            StudentStatus: 0,
            value: 0,
            IsComment: 0,
            studentId: 0,
            isTiyan:null,
            num:''
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
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        
        $.ajax({
            type: "GET",
            url: urls + `api/HomePage/GetLessonDeatil?lessonId=${ret.lessonId}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    this.setState({
                        level: json.data[0].LevelName,
                        times: json.data[0].StartTime,
                        img: json.data[0].FilePath,
                        title: json.data[0].FileTittle.substring(json.data[0].FileTittle.lastIndexOf("L")),
                        main: json.data[0].Describe,
                        TeaName: json.data[0].TeacherName,
                        TeaHead: json.data[0].TeacherImg,
                        TeaGen: json.data[0].TeacherGender,
                        StudentStatus: json.data[0].StudentStatus,
                        IsComment: json.data[0].IsComment,
                        studentId: json.data[0].StudentId,
                        LessonId: json.data[0].LessonId,
                        TeacherId: json.data[0].TeacherId,
                        GiftCount: json.data[0].GiftCount,
                        isTiyan:ret.tiyan,
                        num:ret.num
                    });
                    if (this.state.img == '') {
                        this.setState({
                            img: "../images/tch_girl.jpg"
                        })
                    }
                }
            }.bind(this)
        });

        $.ajax({
            type: "GET",
            url: urls + `api/HomePage/GetCompleteLessonInfo?lessonId=${ret.lessonId}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    this.setState({
                        student: json.data
                    })
                }
            }.bind(this)
        });


    }
    handleChange = (value) => {
        this.setState({ value });
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
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {

                } else {

                }
            }.bind(this)
        });

    }
    render() {
        const { value } = this.state;
        let studrentnum = this.state.student;
        console.log(studrentnum)
        let HeaderIng = [];
        if (studrentnum == null || studrentnum.length == 0) {
        } else {
            studrentnum.map((d, i) => {
                let stuimgurl = '';
                if (d.HeadImg == "") {
                    if (d.Gender == 1) {
                        stuimgurl = '../images/boy.png';
                    } else {
                        stuimgurl = '../images/girl.png';
                    }
                } else {
                    stuimgurl = d.HeadImg
                }
                HeaderIng.push(
                    <li>
                        <div className="member-student"><img src={stuimgurl} alt="" /></div>
                        <h2>{d.EName}</h2>
                        <Rate disabled className="xiao" value={d.Points} />
                        {/*<div className="starBox">*/}
                        {/*<img src="images/star-kong.png" alt=""/><img src="images/star-red.png" alt=""/><img src="images/star-red.png" alt=""/><img src="images/star-red.png" alt=""/><img src="images/star-kong.png" alt=""/>*/}
                        {/*</div>*/}
                        <p style={{width:'4.03rem',wordWrap:'break-word'}}>{d.EvaluateContent}</p>
                    </li>
                )
            });
        }


        let timeStr='';
        let classState = ''
        if(this.state.times!=''){
            let time = dateZhuan(this.state.times);
            //let time = new Date(this.state.times);
            let nowTime = new Date();
            const week = [ '周日','周一', '周二', '周三', '周四', '周五', '周六', '今天'];
            
            if (this.state.StudentStatus == 1) {
                classState = '缺勤'
            } else if (this.state.StudentStatus == 2) {
                classState = '迟到'
            }
            // alert(time.getDay()-1);
            var weekStr = ''
            if (time.getDay() - 1 == nowTime.getDay() - 1 && time.getDate() == nowTime.getDate()) {
                weekStr = week[7];
            } else {
                weekStr = week[time.getDay()];
            }
            
            let h=time.getHours();
            h=h<10?'0'+h:h;
            let ms=time.getMinutes();
            ms=ms<10?'0'+ms:ms;
            let m=parseInt(this.state.times.split('-')[1]);//解决月份多加一
            m=m<10?'0'+m:m;
            let day=time.getDate();
            day=day<10?'0'+day:day;
            timeStr = (m) + '月' + day + '日（' + weekStr + '） ' + h + ":" + ms;
        }
        

        let tchimgurl = '';
        if (this.state.TeaHead == "") {
            if (this.state.TeaGen == 1) {
                tchimgurl = '../images/tch_boy.jpg';
            } else {
                tchimgurl = '../images/tch_girl.jpg';
            }
        } else {
            tchimgurl = this.state.TeaHead
        }

        let pinjia;
        if (this.state.IsComment == '0') {
            pinjia = <div className="index_ds_states">
                <Link to={{ pathname: "/PingJia", query: { studentid: this.state.studentId, teacherNam: this.state.TeaName, point: this.state.Points,num:this.state.num, lessonid: this.state.LessonId, teacherid: this.state.TeacherId, teacherGender: this.state.TeaGen, teacherImg: this.state.TeaHead } }}>
                    <span id="pingji" className="state-right" ref="pingj">待评价
                        <img src="../images/lhb-jifen.png" className='lingjifen' />
                    </span>
                </Link>
            </div>
        } else {
            pinjia = ''
        }
        return (
            <div>
                {/*<!-- 还没有开始的课  start -->*/}
                <div className="appointmentBox" style={{position:'relative'}}>
                    <div className="appointmentList marginTop0">
                        <div className="stateBox">
                            {/* <p>{timeStr}</p> */}
                            <p>{timeStr}<span>{classState}</span></p>
                            {pinjia}
                            {/*<button onClick={this.handleKeBiao.bind(this)} ref="kebiaoyueke" style={{width:'2rem',height:"0.7rem"}} className="kebiaoYuyue">取消预约</button>*/}
                        </div>
                        <div className="classImageBox">
                            <img src={imgs+this.state.img} alt="" />
                        </div>
                        <div className="classConBox">
                            <div className="class-title">
                                <span className="orgin-shi">{this.state.level}</span>
                                <p>{this.state.isTiyan == 0 ?'体验课':this.state.title}</p>
                                {
                                    this.state.GiftCount <= 0 ? ''
                                        : <p className="classTitle-right">{this.state.GiftCount}<i className="iconfont">&#xe712;</i></p>
                                }
                            </div>
                            <p>{this.state.main}</p>
                        </div>
                    </div>
                </div>
                {/*<!-- 还没有开始的课 end -->*/}
                <div className="memberBox">
                    <div className="member-teacherBox">
                        <div className="member-teacher">
                            <div>
                                <img src={tchimgurl} alt="" />
                            </div>
                        </div>
                        <p>{this.state.TeaName}</p>
                    </div>
                    <ul className="memberBox" style={{marginTop:'0px',paddingTop:'0px'}}>
                        {HeaderIng}
                    </ul>
                </div>
                {/*<ul className="studentSixthbox">*/}


                {/*</ul>*/}
            </div>

        )
    }
}