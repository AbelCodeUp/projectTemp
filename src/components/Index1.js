import React, { Component } from 'react';
import { Link } from 'react-router';
import Footer from './footer';
import Counter from './Counter';
import Pingjia from './Pingjia';
import CourseSurVew from './courseSurvew';
import { hashHistory } from 'react-router';
import jQuery from '../js/jquery-3.2.0';

export default class Index extends React.Component {
    constructor(){
        super();
        this.state={
            dingji:null,//定级状态
            //最近结束
            JSDay:null,//结束时间
            levels:null,//等级
            title:null,//标题
            jieshao:null,//介绍
            bannerImg:null,//banner图地址
            lessonId:null,
            points:null,
            studentId:null,
            teacherId:null,
            pj:0,
            //推荐预约
            TJLevel:null,//等级
            TJtitle:null,//标题
            TJbannerImg:null,//banner图地址
            TJjieshao:null,//介绍
            bookingid:null,
            bdid:null,
            //上课提醒
            BdId: 0,//单元id
            BookingId: 0,//教材id
            Describe: '',//单元简介
            FilePath: '',//单元图片地址
            LevelName: '',//单元等级
            TXtime:null,
            seconds:null,
            minutes:null,
            isOpens:null,
            levela:null,

            lessonidss:null,

            fuwuqiTime:null,

            openid:null,

            dengjiTitle:null,

            isOpen:null,
            aa:1
        }
    }
    componentDidMount(){
        // location.reload(false);
        function GetCookie(sName){
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
        if(GetCookie("Tonken")){
            // alert(GetCookie("Tonken"));
            //有没有定级
            fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetRecommendedCourses",
                {
                    headers: {
                        'Authorization': GetCookie("Tonken")
                    }
                })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    if (json.result == -2) {
                        // alert("为定级");
                        this.refs.CourseSurVew.style.display = "block";
                        this.refs.indexss.style.display = "none";
                        this.setState({
                            dingji:0//未定级
                        })
                    } else if (json.result == 1) {
                        //alert("已定级");
                        this.refs.CourseSurVew.style.display = "none";
                        this.refs.indexss.style.display = "block";
                        this.setState({
                            dingji:1//已定级
                        });
                        if(json.data.LevelName=="A0"){
                            this.setState({
                                levela:1
                            })
                        }else if(json.data.LevelName=="A1"){
                            this.setState({
                                levela:2
                            })
                        }else if(json.data.LevelName=="A2"){
                            this.setState({
                                levela:3
                            })
                        }else if(json.data.LevelName=="B1"){
                            this.setState({
                                levela:4
                            })
                        }
                        this.setState({
                            TJLevel:json.data.LevelName,
                            TJtitle:json.data.UnitName.substring(json.data.UnitName.lastIndexOf("L")),
                            TJbannerImg:json.data.FilePath,
                            TJjieshao:json.data.Describe,
                            bookingid:json.data.BdId,
                            bdid:json.data.BookingId
                        });
                        //有没有付费
                        fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetOrdinaryStudentInfo",
                            {
                                method: "GET",
                                headers: {
                                    Authorization: GetCookie("Tonken")
                                }
                            })
                            .then(res => res.json())
                            .then(json => {
                                console.log(json);
                                if (json.result == 1) {
                                    if (json.data.UserCategory == 1) {//付费用户
                                        //this.refs.recommendbox.style.display = 'none';
                                        //this.refs.appointmentBoxFO.style.display = 'none';
                                        this.refs.appointmentBox.style.display = 'none';
                                        this.refs.appointmentBoxS.style.display = 'block';
                                        this.refs.appointmentBoxT.style.display = 'block';
                                        if (this.state.dingji == 1) {
                                            this.refs.TJappointmentBox.style.display = 'block';
                                        } else {
                                            this.refs.TJappointmentBox.style.display = 'none';
                                        }
                                        //最近结束
                                        fetch("http://learnapi.gogo-talk.com:8333/api/Lesson/GetLatelyClassInfo",
                                            {
                                                method: "GET",
                                                headers: {
                                                    Authorization:GetCookie("Tonken")
                                                }
                                            })
                                            .then(res => res.json())
                                            .then(json => {
                                                console.log(json);
                                                if(json.result==1){
                                                    if(json.data[0].Level==0){
                                                        this.setState({
                                                            dengjiTitle:"A0"
                                                        })
                                                    }else if(json.data[0].Level==1){
                                                        this.setState({
                                                            dengjiTitle:"A1"
                                                        })
                                                    }
                                                    else if(json.data[0].Level==2){
                                                        this.setState({
                                                            dengjiTitle:"A2"
                                                        })
                                                    }
                                                    else if(json.data[0].Level==3){
                                                        this.setState({
                                                            dengjiTitle:"A3"
                                                        })
                                                    }
                                                    this.refs.appointmentBoxT.style.display="block";
                                                    let time = new Date(json.data[0].StartTime);
                                                    let nowTime = new Date();
                                                    const week = ['周一','周二','周三','周四','周五','周六','周日','今天'];
                                                    let weekStr = '';
                                                    if(time.getDay()-1 == nowTime.getDay()-1){
                                                        weekStr = week[7];
                                                    }else{
                                                        weekStr = week[time.getDay()];
                                                    }
                                                    let timeStr = (time.getMonth()+1) + '月' +   time.getDate()+'日（'+weekStr+'） '+time.getHours()+":"+time.getMinutes();
                                                    this.setState({
                                                        JSDay:timeStr,
                                                        levels:json.data[0].Level,
                                                        title:json.data[0].FileTittle.substring(json.data[0].FileTittle.lastIndexOf("L")),
                                                        jieshao:json.data[0].Describe,
                                                        bannerImg:json.data[0].FilePath,

                                                        lessonId:json.data[0].LessonId,
                                                        points:json.data[0].Points,
                                                        studentId:json.data[0].StudentId,
                                                        teacherId:json.data[0].TeacherId
                                                    });

                                                    fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/GetStudentInOut?StartTime=${json.data[0].StartTime}&LessonId=${json.data[0].LessonId}&userid=${json.data[0].StudentId}`,
                                                        {
                                                            method: "GET",
                                                            headers: {
                                                                Authorization: GetCookie("Tonken")
                                                            }
                                                        })
                                                        .then(res => res.json())
                                                        .then(json => {
                                                            console.log(json);
                                                            if(json==1){
                                                                this.refs.qingkuang.innerHTML='缺席'
                                                            }else if(json==0){
                                                                this.refs.qingkuang.innerHTML=''
                                                            }else if(json==2){
                                                                this.refs.qingkuang.innerHTML='迟到'
                                                            }
                                                        });
                                                }else if(json.result==0){
                                                    this.refs.appointmentBoxT.style.display="none"
                                                }
                                            });
                                        //上课提醒

                                        fetch("http://learnapi.gogo-talk.com:8333/api/HomePage/GetNotMyLess",
                                            {
                                                method: "GET",
                                                headers: {
                                                    Authorization: GetCookie("Tonken")
                                                }
                                            })
                                            .then(res => res.json())
                                            .then(json => {
                                                console.log(json);
                                                if(json.result==1){
                                                    fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/GetSystemTime`,
                                                        {
                                                            method: "GET",
                                                            headers: {
                                                                'Content-Type': 'application/x-www-form-urlencoded'
                                                                , 'Authorization': GetCookie('Tonken')
                                                            }
                                                        })
                                                        .then(res => res.json())
                                                        .then(json => {
                                                            this.setState({
                                                                fuwuqiTime:json
                                                            })
                                                        });

                                                    this.refs.appointmentBoxFO.style.display = 'block';
                                                    this.refs.appointmentBoxS.style.display='none';
                                                    let times=new Date(json.data[0].StartTime);
                                                    let nowTimes=new Date(this.state.fuwuqiTime);
                                                    let timeCha =times.getTime()-nowTimes.getTime();
                                                    let leftsecond = parseInt(timeCha / 1000);
                                                    let day1 = Math.floor(leftsecond / (60 * 60 * 24));
                                                    let hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
                                                    let minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
                                                    let second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
                                                    if (timeCha < 600000 && timeCha >= 0) {
                                                        this.setState({
                                                            seconds:second,
                                                            minutes:minute,
                                                            lessonidss:json.data[0].LessonId
                                                        });
                                                        this.setState({
                                                            isOpens:<button type="button" className="classInBtn">距离开课  <Counter value={this.state.minutes} initM={this.state.seconds} step='1'/></button>
                                                        });
                                                    } else if(timeCha <= 0)  {
                                                        this.setState({
                                                            isOpens:<button type="button" className="classInBtn">正在上课</button>
                                                        });
                                                    }else{
                                                        this.setState({
                                                            isOpens:""
                                                        });
                                                    }


                                                    let timess = new Date(json.data[0].StartTime);
                                                    let nowTime = new Date();
                                                    const week = ['周一','周二','周三','周四','周五','周六','周日','今天'];
                                                    let weekStr = '';
                                                    if(timess.getDay()-1 == nowTime.getDay()-1){
                                                        weekStr = week[7];
                                                    }else{
                                                        weekStr = week[timess.getDay()-1];
                                                    }
                                                    let mon = (timess.getMonth() + 1);
                                                    mon = mon<10?'0'+mon:mon;
                                                    let days = timess.getDate();
                                                    days = days<10?'0'+days:days;
                                                    let h = timess.getHours();
                                                    h = h<10?'0'+h:h;
                                                    let ms = timess.getMinutes();
                                                    ms = ms<10?'0'+ms:ms;
                                                    let timeStr = mon + '月' + days + '日（' + weekStr + '） ' + h + ":" + ms;

                                                    this.setState({
                                                        Describe: json.data[0].Describe,
                                                        FilePath: json.data[0].FilePath,
                                                        LevelName: json.data[0].LevelName,
                                                        TXtime:timeStr,
                                                        FileTittle:json.data[0].FileTittle.substring(json.data[0].FileTittle.lastIndexOf("L"))
                                                    });

                                                    if(this.state.TXtime.sub){}
                                                }else{
                                                    this.refs.appointmentBoxFO.style.display = 'none';
                                                    this.refs.appointmentBoxS.style.display='block';
                                                }
                                            });
                                    } else if (json.data.UserCategory == 0) {//普通用户
                                        this.refs.TJappointmentBox.style.display = 'none';
                                        //无推荐
                                        this.refs.recommendbox.style.display = 'block';
                                        this.refs.appointmentBoxS.style.display = 'none';
                                        this.refs.appointmentBoxT.style.display = 'none';
                                        this.refs.appointmentBoxFO.style.display = 'none';
                                        //有推荐
                                        if (this.state.dingji == 1) {//已定级
                                            this.refs.appointmentBox.style.display = 'block';
                                        } else {//未定级
                                            this.refs.appointmentBox.style.display = 'none';
                                        }
                                    }
                                }
                            });
                    }
                });
        }
        else {
            //alert("未绑定");
            hashHistory.push("/My");
        }
    }
    pingjia(){
        let pingjias=document.getElementById("pingji");
        pingjias.innerHTML="已评价";
    }
    render() {
        return (
            <div className="body-con">
                {/*调查start*/}
                <div className="CourseSurVew" ref="CourseSurVew" id="CourseSurVew">
                    <CourseSurVew className="shows" ref="shows"/>
                </div>
                {/*调查end*/}
                {/* <div className="errorBox">
                    <div className="errorImg">
                        <img src="../images/error1.png" alt=""/>
                    </div>
                </div> */}
                <div className="index" ref="indexss" id="indexss">
                    {/*banner图start*/}
                    {/*<div className="recommendbox" ref="recommendbox">*/}
                        {/*/!*<!-- 推荐1 start -->*!/*/}
                        {/*<div className="recommend1 recommend-border">*/}
                            {/*<a target="s-self" href="../h5index/index.html"><img src="images/recommend1.png" alt=""/></a>*/}
                        {/*</div>*/}
                        {/*/!*<!-- 推荐1 end -->*!/*/}

                        {/*/!*<!-- 推荐2 start -->*!/*/}
                        {/*<div className="recommend2 recommend-border">*/}
                            {/*<a target="s-self" href="../h5active/index.html"><img src="images/recommend2.png" alt=""/></a>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*banner图end*/}

                    

                    {/*<!-- 正在上课 start -->*/}
                    <div className="appointmentBox" ref="appointmentBoxFO">
                        <div className="titlebox">
                        <span>

                        </span>
                            <h2>上课提醒</h2>
                        </div>
                        <div className="appointmentList marginTop0">
                            <div className="stateBox">
                                <p>{this.state.TXtime}</p>
                            </div>
                            <Link to={{ pathname: "/My_ClassXiang" , query:{Lessonid:this.state.lessonidss} }}>
                                <div className="classImageBox">
                                    <img src={this.state.FilePath} alt=""/>
                                </div>
                            </Link>
                            <div className="classConBox">
                                <div className="class-title">
                                    <span className="orgin-kong">{this.state.LevelName}</span>
                                    <p>{this.state.FileTittle}</p>
                                </div>
                                <p>{this.state.Describe}</p>
                            </div>
                        </div><button type="button" className="classInBtn"><span ref="hou">30</span>:<span ref="min">00</span></button>
                        {this.state.isOpens}
                    </div>
                    {/*<!-- 正在上课 end -->*/}


                    {/*<!-- 未预约 start -->*/}
                    <div className="appointmentBox box-marginTop20" ref="appointmentBoxS">
                        <div className="titlebox">
                        <span>

                        </span>
                            <h2>上课提醒</h2>
                        </div>
                        <div className="remindbox">
                            <div className="remin-imgbox"><img src="images/remind.png" alt=""/></div>
                            <p>您还没有预约课程，快去预约一节吧！</p>
                        </div>
                    </div>
                    {/*<!-- 未预约 end -->*/}

                    {/*<!-- 最近结束 start -->*/}
                    <div className="appointmentBox" ref="appointmentBoxT">
                        <div className="titlebox">
                        <span className="color-grey">

                        </span>
                            <h2>最近结束</h2>
                        </div>
                        <div className="appointmentList marginTop0">
                            <div className="stateBox">
                                <p>{this.state.JSDay}</p>
                                <span ref="qingkuang"></span>
                                <Link to={{ pathname: "/PingJia" , query:{studentid:this.state.studentId,point:this.state.points,lessonid:this.state.lessonId,teacherid:this.state.teacherId} }}><span onClick={this.pingjia.bind(this)} id="pingji" className="state-right" ref="pingj">待评价</span></Link>
                            </div>
                            <Link to={{pathname: "/YijieshuClassXiang", query: {Lessonid: this.state.lessonId}}}>
                            <div className="classImageBox">
                                    <img src={this.state.bannerImg} alt=""/>
                                </div>
                            </Link>
                            <div className="classConBox">
                                <div className="class-title">
                                    <span className="grey-kong">{this.state.dengjiTitle}</span><p>{this.state.title}</p>
                                    <p className="classTitle-right">14<i className="iconfont">&#xe712;</i></p>
                                </div>
                                <p>{this.state.jieshao}</p>
                            </div>
                        </div>
                    </div>
                    {/*<!-- 最近结束 end -->*/}

                    {/*付费推荐预约start*/}
                    {/* <div className="appointmentBox" ref="TJappointmentBox">
                        <div className="titlebox">
                        <span>

                        </span>
                            <h2>推荐预约</h2>
                        </div>
                        <Link to={{pathname: "/YueKeXiang", query: {uid: this.state.bookingid, bid: this.state.bdid,Level:this.state.levela}}}>
                            <div className="appointmentList">
                                <div className="classImageBox">
                                    <img src={this.state.TJbannerImg} alt=""/>
                                </div>
                                <div className="classConBox">
                                    <div className="class-title">
                                        <span className="orgin-kong">{this.state.TJLevel}</span><p>{this.state.TJtitle}</p>
                                    </div>
                                    <p>{this.state.TJjieshao}</p>
                                </div>
                            </div>
                        </Link>
                    </div> */}
                    {/*付费推荐预约end*/}

                    {/*<!-- 预约推荐 start -->*/}
                    <div className="appointmentBox" ref="appointmentBox">
                        <div className="titlebox">
                        <span>
                        </span>
                            <h2>推荐预约</h2>
                        </div>
                        <Link to={{pathname: "/YueKeXiang", query: {uid: this.state.bookingid, bid: this.state.bdid,LevelS:this.state.levela}}}>
                            <div className="appointmentList">
                                <div className="classImageBox">
                                    <img src={this.state.TJbannerImg} alt=""/>
                                </div>

                                <div className="classConBox">
                                    <div className="class-title">
                                        <span className="orgin-kong">{this.state.TJLevel}</span>
                                        <p>{this.state.TJtitle}</p>
                                    </div>
                                    <p>{this.state.TJjieshao}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/*<!-- 预约推荐 end -->*/}

                    {/*尾部start*/}
                    <Footer num="1"/>
                    {/*尾部end*/}
                </div>
            </div>
        )
    }
}

