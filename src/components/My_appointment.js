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

export default class MyAppointment extends React.Component {
    constructor() {
        super();
        this.state = {
            datas: null,
            levels: null,
            FileTittles: null,
            Describes: null,
            StartTimes: null,
            imgUrl: null,
            bool: true,
            index: null,
            LevelsData: null,
            bookDate: null,
            dengjiTitle: null,
            isDingji: false,
            totalcount: null,
            usecount: null,
            isTiyan:null,
            isShows: store.getState().isShow,
            shareNum: store.getState().shareNum
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

        if (GetCookie('Tonken') || localStorage.getItem('Tonken')) {
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
                        hashHistory.push('/courseSurvew/2')
                    } else if (json.result == 1) {//已定级
                        this.setState({
                            isDingji: false
                        })

                        //获取课程完成情况信息
                        $.ajax({
                            type: "GET",
                            url: urls + 'api/HomePage/GetBookOverInfo',
                            headers: { Authorization: localStorage.getItem('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result == 1) {
                                    this.setState({
                                        totalcount: json.data[json.data.length-1].TotalCount,
                                        usecount: json.data[json.data.length-1].UseCount
                                    })
                                    this.refs.tuijianP.innerHTML = "共" + json.data[json.data.length-1].TotalCount + "课，已完成" + json.data[json.data.length-1].UseCount + "课"
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
                                    if(json.result==0){
                                        hashHistory.push("/My_appointmentTY");
                                    }
                                }
                            }.bind(this)
                        });

                        $.ajax({
                            type: "GET",
                            url: urls + 'api/HomePage/GetBookList',
                            headers: { Authorization: localStorage.getItem('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result == 1) {
                                    this.setState({
                                        bookDate: json.data
                                    });
                                    if (json.data[0].Level == 0) {
                                        // this.refs.dengji.innerHTML='A0';
                                        this.setState({
                                            dengjiTitle: "A0"
                                        })
                                    } else if (json.data[0].Level == 1) {
                                        // this.refs.dengji.innerHTML='A1';
                                        this.setState({
                                            dengjiTitle: "A1"
                                        })
                                    }
                                    else if (json.data[0].Level == 2) {
                                        // this.refs.dengji.innerHTML='A2';
                                        this.setState({
                                            dengjiTitle: "A2"
                                        })
                                    }
                                    else if (json.data[0].Level == 3) {
                                        // this.refs.dengji.innerHTML='A3';
                                        this.setState({
                                            dengjiTitle: "A3"
                                        })
                                    }

                                    // if (json.data[json.data.length - 1].BookingTitle == "A1") {
                                    //     this.refs.spanOne.className = "big-red-btn";
                                    //     this.refs.spanTwo.className = "class-selectTitle";
                                    //     this.refs.spanTwo.checked = true;
                                    //     this.refs.spanTwo.style.display = "block";
                                    //     this.refs.spanThree.className = "big-grey-btn";
                                    //     this.refs.spanThree.style.display = "none";
                                    //     this.refs.spanFour.className = "big-grey-btn";
                                    //     this.refs.spanFour.style.display = "none";
                                    //     this.refs.AONE.style.display = 'block';
                                    //     this.refs.ATWO.style.display = 'block';
                                    //     this.refs.ATWO.checked = true;
                                    // } else if (json.data[json.data.length - 1].BookingTitle == "A2") {
                                    //     this.refs.spanOne.className = "big-red-btn";
                                    //     this.refs.spanTwo.className = "big-red-btn";
                                    //     this.refs.spanThree.className = "class-selectTitle";
                                    //     this.refs.spanThree.checked = true;
                                    //     this.refs.spanThree.style.display = "block";
                                    //     this.refs.spanFour.className = "big-grey-btn";
                                    //     this.refs.AONE.style.display = 'block';
                                    //     this.refs.ATWO.style.display = 'block';
                                    //     this.refs.ATHREE.style.display = 'block';
                                    //     this.refs.ATHREE.checked = true;
                                    // }
                                    this.refs.Plevel.innerHTML = this.state.bookDate[json.data.length - 1].BookingTitle;
                                    if (this.state.totalcount == null || this.state.usecount == null) {
                                        this.refs.tuijianP.innerHTML = "共0课，已完成0课"
                                    } else {
                                        this.refs.tuijianP.innerHTML = "共" + this.state.totalcount + "课，已完成" + this.state.usecount + "课"
                                    }
                                    if (json.result == 1) {
                                        this.setState({
                                            LevelsData: json.data,
                                            index: (json.data.length - 1)
                                        })
                                    }
                                    $.ajax({
                                        type: "GET",
                                        url: urls + `api/HomePage/GetUnitBookList?bookingid=${json.data[json.data.length - 1].BookingId}`,
                                        headers: { Authorization: localStorage.getItem('Tonken') },
                                        dataType: "json",
                                        success: function (json) {
                                            if (json.result == 1) {
                                                this.setState({
                                                    datas: json.data
                                                })
                                            }else if (json.result >= 1000 || json.result == 0) {
                                                hashHistory.push("/My");
                                            }
                                        }.bind(this)
                                    });
                                } else if (json.result >= 1000) {
                                    hashHistory.push("/My");
                                }
                            }.bind(this)
                        });
                    }else if(json.result>=1000){
                        hashHistory.push("/My");
                    }
                }.bind(this)
            })


        } else {
            // alert("未绑定");
            hashHistory.push("/My");
        }

    }
    handleClickXiaLa() {
        if (this.state.bool == true) {
            this.refs.selectListbox.style.height = '57.75px';
            this.refs.mengban.style.zIndex = '99';
            this.refs.mengban.style.opacity = '1';
            this.refs.selectListbox.style.transition = "0.3s";
            this.refs.scheduleNav.style.position = 'fixed';
            this.refs.scheduleNav.style.top = '0px';
            this.refs.scheduleNav.style.zIndex = '9999';
            this.refs.selectBox.style.position = 'fixed';
            this.refs.selectBox.style.top = '43px';
            this.refs.selectBox.style.zIndex = '9999';
            this.refs.selectBox.style.width = '100vw';
            this.setState({
                bool: false
            });
        } else {
            this.refs.selectListbox.style.height = '0px';
            this.refs.selectListbox.style.transition = "0.3s";
            this.refs.scheduleNav.style.position = 'static';
            this.refs.selectBox.style.position = 'static';
            setTimeout(() => {
                this.refs.mengban.style.opacity = '0';
                this.refs.mengban.style.zIndex = '-99';
            }, 200);
            this.setState({
                bool: true
            })
        }
    }



    handleClick() {//第一个等级单击事件
        function GetCookie(sName) {
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
        if (0 <= this.state.index) {
            // this.refs.AONE.style.display = "block";
            this.refs.AONE.checked = true;
            // this.refs.ATHREE.style.display = "none";
            // this.refs.BFOUR.style.display = "none";
            // this.refs.ATWO.style.display = "none";
            this.refs.Plevel.innerHTML = this.state.bookDate[0].BookingTitle;
            this.refs.tuijianP.innerHTML = "共" + this.state.totalcount + "课，已完成" + this.state.usecount + "课"
            $.ajax({
                type: "GET",
                url: urls + `api/HomePage/GetUnitBookList?bookingid=1`,
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == 1) {
                        this.setState({
                            datas: json.data
                        })

                    }
                }.bind(this)
            });
        }
    }
    handleClickSecond() {//第二个等级单击事件
        function GetCookie(sName) {
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
        if (1 <= this.state.index) {
            // this.refs.AONE.style.display = "block";
            // this.refs.ATWO.style.display = "block";
            this.refs.ATWO.checked = true;
            // this.refs.ATHREE.style.display = "none";
            // this.refs.BFOUR.style.display = "none";

            this.refs.Plevel.innerHTML = this.state.bookDate[1].BookingTitle;
            this.refs.tuijianP.innerHTML = "共" + this.state.totalcount + "课，已完成" + this.state.usecount + "课"
            $.ajax({
                type: "GET",
                url: urls + 'api/HomePage/GetUnitBookList?bookingid=2',
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == 1) {
                        this.setState({
                            datas: json.data
                        })
                        if (json.data[0].Level == '0') {
                            this.refs.dengji.innerHTML = 'A0';
                            this.setState({
                                dengjiTitle: "A0"
                            })
                        } else if (json.data[0].Level == '1') {
                            this.refs.dengji.innerHTML = 'A1';
                            this.setState({
                                dengjiTitle: "A1"
                            })
                        }
                        else if (json.data[0].Level == '2') {
                            this.refs.dengji.innerHTML = 'A2';
                            this.setState({
                                dengjiTitle: "A2"
                            })
                        }
                        else if (json.data[0].Level == '3') {
                            this.refs.dengji.innerHTML = 'A3';
                            this.setState({
                                dengjiTitle: "A3"
                            })
                        }
                    }
                }.bind(this)
            });

        }
    }
    handleClickThird() {//第三个等级单击事件
        function GetCookie(sName) {
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
        if (2 <= this.state.index) {
            // this.refs.AONE.style.display = "block";
            // this.refs.ATWO.style.display = "block";
            // this.refs.ATHREE.style.display = "block";
            this.refs.ATHREE.checked = true;
            this.refs.Plevel.innerHTML = this.state.bookDate[2].BookingTitle;
            this.refs.tuijianP.innerHTML = "共" + this.state.totalcount + "课，已完成" + this.state.usecount + "课"
            $.ajax({
                type: "GET",
                url: urls + 'api/HomePage/GetUnitBookList?bookingid=3',
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == 1) {
                        this.setState({
                            datas: json.data
                        })
                        if (json.data[0].Level == '0') {
                            this.refs.dengji.innerHTML = 'A0';
                            this.setState({
                                dengjiTitle: "A0"
                            })
                        } else if (json.data[0].Level == '1') {
                            this.refs.dengji.innerHTML = 'A1';
                            this.setState({
                                dengjiTitle: "A1"
                            })
                        }
                        else if (json.data[0].Level == '2') {
                            this.refs.dengji.innerHTML = 'A2';
                            this.setState({
                                dengjiTitle: "A2"
                            })
                        }
                        else if (json.data[0].Level == '3') {
                            this.refs.dengji.innerHTML = 'A3';
                            this.setState({
                                dengjiTitle: "A3"
                            })
                        }
                    }
                }.bind(this)
            });

        }
    }
    handleClickFourth() {//第四个等级单击事件
        function GetCookie(sName) {
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
        if (3 <= this.state.index) {
            // this.refs.AONE.style.display = "block";
            // this.refs.ATWO.style.display = "block";
            // this.refs.ATHREE.style.display = "block";
            // this.refs.BFOUR.style.display = "block";
            this.refs.BFOUR.checked = true;
            this.refs.Plevel.innerHTML = this.state.bookDate[3].BookingTitle;
            this.refs.tuijianP.innerHTML = "共" + this.state.totalcount + "课，已完成" + this.state.usecount + "课"
            $.ajax({
                type: "GET",
                url: urls + 'api/HomePage/GetUnitBookList?bookingid=4',
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == 1) {
                        this.setState({
                            datas: json.data,
                        })
                        if (json.data[0].Level == '0') {
                            this.refs.dengji.innerHTML = 'A0';
                            this.setState({
                                dengjiTitle: "A0"
                            })
                        } else if (json.data[0].Level == '1') {
                            this.refs.dengji.innerHTML = 'A1';
                            this.setState({
                                dengjiTitle: "A1"
                            })
                        }
                        else if (json.data[0].Level == '2') {
                            this.refs.dengji.innerHTML = 'A2';
                            this.setState({
                                dengjiTitle: "A2"
                            })
                        }
                        else if (json.data[0].Level == '3') {
                            this.refs.dengji.innerHTML = 'A3';
                            this.setState({
                                dengjiTitle: "A3"
                            })
                        }
                    }
                }.bind(this)
            });

        }
    }



    render() {
        let dingji = this.state.isDingji ? { display: 'block' } : { display: 'none' };
        let yuyue = !this.state.isDingji ? { display: 'block' } : { display: 'none' };
        let lock
        let dataObj = this.state.datas;
        let items = [];
        if (dataObj == null) {
        } else {
            dataObj.map((d, i) => {
                let levelName = ''
                switch (d.Level) {
                    case 0: levelName = 'A0';
                        break;
                    case 1: levelName = 'A1';
                        break;
                    case 2: levelName = 'A2';
                        break;
                }
                if (d.IsUnlock == 0) {//未解锁
                    lock = require('../images/suo.png');
                    items.push(
                        <li key={i}>
                            <div className="schedule-imgbox">
                                <img src={imgs+d.FilePath} alt="" />
                                <div className="img-suo">
                                    <img src="images/suo.png" alt="" />
                                </div>
                            </div>
                            <div className="schedule-con">
                                <div className="class-title">
                                    <span className="grey-kong" ref="dengji">{levelName}</span>
                                    <p>{d.FileTittle.substring(d.FileTittle.lastIndexOf("L"))}</p>
                                </div>
                                <p>{d.Describe}</p>
                            </div>
                        </li>
                    )
                } else {//已解锁
                    if (d.IsReservation == 1) {//已预约
                        if (d.IsComplete == 1) {//已完成
                            items.push(
                                <li key={i}>
                                    <Link to={{
                                        pathname: "/YueKeXiang",
                                        query: { bid: d.BookingId, LevelS: d.Level, uid: d.BDEId }
                                    }}>
                                        <div className="schedule-imgbox">
                                            <img src={imgs+d.FilePath} alt="" />
                                        </div>
                                        <div className="schedule-con">
                                            <div className="class-title">
                                                <span className="grey-kong" ref="dengji">{levelName}</span>
                                                <p>{d.FileTittle.substring(d.FileTittle.lastIndexOf("L"))}</p>
                                                <div className="class-success">
                                                    <img src="images/class_suc.png" alt="" />
                                                </div>
                                            </div>
                                            <p>{d.Describe}</p>
                                        </div>
                                    </Link>

                                </li>
                            )
                        } else {
                            items.push(
                                <li key={i}>
                                    <Link to={{ pathname: "/YueKeXiang", query: { bid: d.BookingId, levelS: d.Level, uid: d.BDEId } }}>
                                        <div className="schedule-imgbox">

                                            <img src={imgs+d.FilePath} alt="" />

                                            <div className="img-tab">
                                                <img src="images/suc.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="schedule-con">
                                            <div className="class-title">
                                                <span className="orgin-shi" ref="dengji">{levelName}</span>
                                                <p>{d.FileTittle.substring(d.FileTittle.lastIndexOf("L"))}</p>
                                            </div>
                                            <p>{d.Describe}</p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        }
                    }
                    if (d.IsReservation == 0) {//未预约
                        if (d.IsComplete == 1) {//已完成
                            items.push(
                                <li key={i}>
                                    <Link to={{
                                        pathname: "/YueKeXiang",
                                        query: { bid: d.BookingId, LevelS: d.Level, uid: d.BDEId }
                                    }}>
                                        <div className="schedule-imgbox">
                                            <img src={imgs+d.FilePath} alt="" />
                                        </div>
                                        <div className="schedule-con">
                                            <div className="class-title">
                                                <span className="grey-kong" ref="dengji">{levelName}</span>
                                                <p>{d.FileTittle.substring(d.FileTittle.lastIndexOf("L"))}</p>
                                                <div className="class-success">
                                                    <img src="images/class_suc.png" alt="" />
                                                </div>
                                            </div>
                                            <p>{d.Describe}</p>
                                        </div>
                                    </Link>

                                </li>
                            )
                        } else {
                            items.push(
                                <li key={i}>
                                    <Link to={{ pathname: "/YueKeXiang", query: { bid: d.BookingId, LevelS: d.Level, uid: d.BDEId } }}>
                                        <div className="schedule-imgbox">
                                            <img src={imgs+d.FilePath} alt="" />
                                            <div className="img-tab">
                                                <img src="images/wite.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="schedule-con">
                                            <div className="class-title">
                                                <span className="orgin-kong" ref="dengji">{levelName}</span>
                                                <p>{d.FileTittle.substring(d.FileTittle.lastIndexOf("L"))}</p>
                                            </div>
                                            <p>{d.Describe}</p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        }
                    }

                }
            })
        }
        let appoint = this.state.isTiyan == 0 ? "/My_appointmentTY" : "/My_appointment"
        return (
            <div>
                {/*调查start*/}
                {/* <div className="CourseSurVew" style={dingji}>
                    <CourseSurVew className="shows" />
                </div> */}
                {/*调查end*/}
                <div style={yuyue}>
                    <div className='appBodyBox' style={{ width: '100%', height: `${document.documentElement.clientHeight}px`, 'position': 'relative' }}>
                        <div className='appConwlh' style={{ position: 'absolute', left: '0px', top: '0px', width: '100%', height: '90vh', overflow: 'auto' }}>

                            {/*<!-- 顶部选项 start -->*/}
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
                            {/* <div ref="selectBox" className="class-selectBox" style={{ display: 'block' }} onClick={this.handleClickXiaLa.bind(this)}>
                        <div className="class-selectTitle">
                            <span ref="Plevel"></span>
                            <p ref="tuijianP"></p>
                            <i className="iconfont">&#xe60b;</i>
                        </div>
                        <div className="mengban" ref="mengban">
                            <div className="class-selectListbox" ref="selectListbox">
                                <label style={{ display: 'none' }} className="class-selectTitle" onClick={this.handleClick.bind(this)}>
                                    <span ref="spanOne">A0</span>
                                    <p>共{this.state.totalcount}课时，已完成{this.state.usecount}课时</p>
                                    <input ref="AONE" type="radio" name='class' className="rdo" />
                                </label>
                                <label className="class-selectTitle" onClick={this.handleClickSecond.bind(this)}>
                                    <span ref="spanTwo">A1</span>
                                    <p>共{this.state.totalcount}课时，已完成{this.state.usecount}课时</p>
                                    <input ref="ATWO" type="radio" name='class' className="rdo" />
                                </label>
                                <label style={{ display: 'none' }} className="class-selectTitle" onClick={this.handleClickThird.bind(this)}>
                                    <span ref="spanThree">A2</span>
                                    <p>共{this.state.totalcount}课时，已完成{this.state.usecount}课时</p>
                                    <input ref="ATHREE" type="radio" name='class' className="rdo" />
                                </label>
                                <label style={{ display: 'none' }} className="class-selectTitle" onClick={this.handleClickFourth.bind(this)}>
                                    <span ref="spanFour">B1</span>
                                    <p>共{this.state.totalcount}课时，已完成{this.state.usecount}课时</p>
                                    <input ref="BFOUR" type="radio" name='class' className="rdo" />
                                </label>
                            </div>
                        </div>

                    </div> */}

                            <div ref="selectBox" className="class-selectBox" style={{ display: 'block' }}>
                                <div className="class-selectTitle">
                                    <span ref="Plevel"></span>
                                    <p ref="tuijianP">共0课，已完成0课</p>
                                </div>
                            </div>
                            {/*<!-- 顶部选项 end -->*/}
                            {/*<!-- 课程列表 start -->*/}
                            <ul className="schedule-listbox">
                                {items}
                            </ul>
                        </div>
                        {/*尾部start*/}
                        <Footer num="2" />
                    </div>
                </div>
            </div>
        )
    }
}