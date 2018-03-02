import React, { Component } from 'react';
import Footer from './footer';
import { hashHistory } from 'react-router';
import { DatePicker } from 'antd';
import PopUp from "./popUp";
import $ from 'jquery';

function GetCookie(sName) {
    let aCookie = document.cookie.split("; ");
    for (let i = 0; i < aCookie.length; i++) {
        let aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return null;
}
export default class courseSurVew extends React.Component {
    constructor() {
        super();
        this.state = {
            long: null,//学习时间
            timelong: null,//每周学习时间
            // tujin:null,//途径
            yesOrNo: null,//是否
            EName: null,//英文名
            Birthdays: null,//生日
            data: {
                val: ""
            },
            titles: null,
            gender: 1,
            isGradeBgShow: false,
            isGradeSuc: false,
            tuijian:[]
        }
    }

    componentDidMount () {
        $.ajax({
            type: "GET",
            url: urls + "api/HomePage/GetRecommendedCourses",
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                // alert(json.result)
                
                if (json.result == -2) {// 1定级  -2未定级 -3有预约课程//未定级,isReate为true
                    this.setState({
                        isGradeBgShow: true,
                        gender: 1
                    })
                } else {
                    this.setState({
                        isGradeBgShow: false
                    })
                   
                }

                if (this.state.gender == 1) {
                    this.refs.boy.checked = true;
                    this.setState({
                        gender: 1
                    })
                } else if (this.state.gender == 0) {
                    this.refs.girl.checked = true;
                    this.setState({
                        gender: 0
                    })
                }
            }.bind(this)
        });
    }
    handleclick() {

        if (this.refs.boy.checked == true) {
            this.setState({
                gender: 1
            })
        } if (this.refs.girl.checked == true) {
            this.setState({
                gender: 0
            })
        }
        if (this.state.long == null ||this.state.timelong == null ||this.state.yesOrNo == null || this.state.gender == null) {
            return false
        }
        var reg = /^[a-zA-Z]+$/;
        var value = this.refs.ENames.value;
        value=value.replace(/<\/?[^>]*>/gim,"");
        if(!reg.test(value)){
            this.setState({
              result: '英文名只能是小于20位的字母'
            })
            let that = this;
            setTimeout(function () {
              document.getElementsByClassName('bg')[0].style.display = 'block';
            }, 500);
            setTimeout(function () {
              document.getElementsByClassName('bg')[0].style.display = 'none';
              /*history.go(0);*/
            }, 1500)
            this.refs.ENames.value='';
            this.refs.ENames.focus();
            return false;
          }
        if (this.refs.ENames.value == "") {
            return false
        }

        $.ajax({
            type: "POST",
            url: urls + "api/HomePage/GradeInvestigation",
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            data: {
                EName: this.refs.ENames.value,
                Birthday: this.state.data.val,
                Gender: this.state.gender,
                HeadImg: '',
                StudyTime: this.state.long,
                StudyWeekTime: this.state.timelong,
                IsJoinEnglishTest: this.state.yesOrNo
            },
            success: function (json) {
                if (json.result == 1) {
                    // console.log(json);
                    // $.ajax({
                    //     type: "GET",
                    //     url: urls + "api/HomePage/GetRecommendedCourses",//推荐预约
                    //     headers: { Authorization: localStorage.getItem('Tonken') },
                    //     dataType: "json",
                    //     success: function (json) {
                    //         if (json.result == 1) {
                    //             const newTuijian = json.data;
                    //             if (newTuijian == null) {
                    //                 this.setState({
                    //                     tuijian: []
                    //                 })
                    //             } else {
                    //                 this.setState({
                    //                     tuijian: newTuijian,
                    //                 })
                    //             }
            
                    //         } 
                    //     }.bind(this)
                    // });

                    this.setState({
                        titles: json.data.LevelName,
                        isGradeSuc: true,
                        isGradeBgShow: false
                        
                    });

                }
            }.bind(this)
        });

        

    }
    //学习了多久start
    handleClickF() {
        this.refs.btnF.className = "click-active";
        this.refs.btnS.className = "";
        this.refs.btnT.className = "";
        this.refs.btnFO.className = "";
        this.setState({
            long: 1
        })
    }
    handleClickS() {
        this.refs.btnF.className = "";
        this.refs.btnS.className = "click-active";
        this.refs.btnT.className = "";
        this.refs.btnFO.className = "";
        this.setState({
            long: 2
        })
    }
    handleClickT() {
        this.refs.btnF.className = "";
        this.refs.btnS.className = "";
        this.refs.btnT.className = "click-active";
        this.refs.btnFO.className = "";
        this.setState({
            long: 3
        })
    }
    handleClickFO() {
        this.refs.btnF.className = "";
        this.refs.btnS.className = "";
        this.refs.btnT.className = "";
        this.refs.btnFO.className = "click-active";
        this.setState({
            long: 4
        })
    }
    //学习了多久end

    //英语时长start
    HowTimeF() {
        this.refs.HowTimesF.className = "click-active";
        this.refs.HowTimesS.className = "";
        this.refs.HowTimesT.className = "";
        this.refs.HowTimesFO.className = "";
        this.setState({
            timelong: 1
        })
    }
    HowTimeS() {
        this.refs.HowTimesF.className = "";
        this.refs.HowTimesS.className = "click-active";
        this.refs.HowTimesT.className = "";
        this.refs.HowTimesFO.className = "";
        this.setState({
            timelong: 2
        })
    }
    HowTimeT() {
        this.refs.HowTimesF.className = "";
        this.refs.HowTimesS.className = "";
        this.refs.HowTimesT.className = "click-active";
        this.refs.HowTimesFO.className = "";
        this.setState({
            timelong: 3
        })
    }
    HowTimeFO() {
        this.refs.HowTimesF.className = "";
        this.refs.HowTimesS.className = "";
        this.refs.HowTimesT.className = "";
        this.refs.HowTimesFO.className = "click-active";
        this.setState({
            timelong: 4
        })
    }
    //英语时长start

    //是否start
    handleYes() {
        this.refs.Yes.className = "btn click-active";
        this.refs.No.className = "";
        this.setState({
            yesOrNo: 3
        })
    }
    handleNo() {
        this.refs.Yes.className = "btn";
        this.refs.No.className = "click-active";
        this.setState({
            yesOrNo: 0
        })
    }
    //是否end

    //日历start
    onChange(date1, dateString) {
        if (dateString == "") {
            this.setState({
                data: {
                    val: ''
                }
            })
        } else {
            this.setState({
                data: {
                    val: dateString
                }
            });
        }
    }
    //日历end

    handleGuan() {
        this.setState({
            isGradeSuc: false,
            isGradeBgShow: false
        })
        // window.history.go(0);
        // location.href = location.href;
        let id = this.props.params.id;
        if(id==1){//首页
            hashHistory.push('/')
        }else if(id==2){//预约课程
            hashHistory.push('/My_appointment')
        }else if(id==3){//我的账户
            hashHistory.push('/My');
        }else if(id==4){//我的订单  
            hashHistory.push('/My_order');
        }else if(id==5){//我的课时
            hashHistory.push('/My_class_hours');
        }else{
            hashHistory.push('/');
        }
        
        // if(/android/i.test(navigator.userAgent)){
        //     alert('Android')
        //     window.history.go(0);
        //     //document.write("This is Android'browser.");//这是Android平台下浏览器
        // }
        // if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        //     alert(iOS)
        //     location.reload(true)
        //     //document.write("This is iOS'browser.");//这是iOS平台下浏览器
        // }
    }
    handleChange() {
        // let str = new RegExp(/^[A-Za-z]*$/);
        // console.log(str.test(this.refs.ENames.value));
        // if (str.test(this.refs.ENames.value)) {
        //     this.refs.ENames.style.border = "1px solid #cdcdcd";
        // } else {
        //     this.refs.ENames.style.border = "1px solid #ff6600";
        // }
    }
    changeSex(val) {
        this.setState({
            gender: val
        })
    }

    render() {
        let isShowz = this.state.isGradeBgShow ? { display: 'block' } : { display: 'none' }
        let isShowSuc = this.state.isGradeSuc ? { display: 'block' } : { display: 'none' };

        let tuijianCon;
        const {tuijian}=this.state;
        if (tuijian.length == 0 || tuijian == null) {
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
                            <img src={tuijian.FilePath} alt="" />
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
        return (
            <div>
                <div id="investigation" style={isShowz}>
                    {/*调查start*/}
                    <div className="courseTitle">
                        <h2><i className="iconfont"><img src="../images/diaoCha.png" alt="" style={{ width: '20px' }} /></i>课程分级调查</h2>
                        <p>我们需要对孩子的学习情况做一个简单的调查，以初步确定孩子的学习课程等级。</p>
                    </div>
                    <ul className="surveyBox">
                        <li>
                            <p>1. 孩子学习英语已有多久：</p>
                            <div className="btnbox">
                                <button ref="btnF" onClick={this.handleClickF.bind(this)} type="button">一年以下</button>
                                <button ref="btnS" onClick={this.handleClickS.bind(this)} type="button">1-2年</button>
                                <button ref="btnT" onClick={this.handleClickT.bind(this)} type="button">2-3年</button>
                                <button ref="btnFO" onClick={this.handleClickFO.bind(this)} type="button">3年以上</button>
                            </div>
                        </li>
                        <li>
                            <p>2. 孩子每周学习英语时长：</p>
                            <div className="btnbox">
                                <button ref="HowTimesF" onClick={this.HowTimeF.bind(this)} type="button">小于1小时</button>
                                <button ref="HowTimesS" onClick={this.HowTimeS.bind(this)} type="button">1-2小时</button>
                                <button ref="HowTimesT" onClick={this.HowTimeT.bind(this)} type="button">2-3小时</button>
                                <button ref="HowTimesFO" onClick={this.HowTimeFO.bind(this)} type="button">大于3小时</button>
                            </div>
                        </li>
                        <li>
                            <p>3. 孩子是否参加过校外英语培训：</p>
                            <div className="btnbox" style={{ justifyContent: 'flex-start' }}>
                                <button type="button" ref="Yes" onClick={this.handleYes.bind(this)} className="btn">是</button>
                                <button type="button" ref="No" onClick={this.handleNo.bind(this)}>否</button>
                            </div>
                        </li>
                    </ul>
                    {/*调查end*/}
                    {/*完善信息start*/}
                    <div className="perfectInfor" style={{ paddingBottom: '2rem' }}>
                        <div className="titlebox">
                            <span>

                            </span>
                            <h2>完善孩子信息</h2>
                        </div>
                        <ul>
                            <li>
                                <span><i>*</i>英文名:</span>
                                <input style={{width:'64%'}} onChange={this.handleChange.bind(this)} maxLength="20" type="text" ref="ENames" name="studentName" id="EName" />
                            </li>
                            <li>
                                <span><i>*</i>生日<i className="iconfont xiala"><img src="../images/xiaLa.png" alt="" /></i></span>
                                <DatePicker style={{width:'64%'}} ref="Birthdayss" onChange={this.onChange.bind(this)} />
                            </li>
                            <li>
                                <span><i>*</i>性别</span>
                                <div className="sexbox" style={{position:'relative',top:'0'}}>
                                    <input type="radio" name="sex" className="rdo" value="1" ref="boy" onClick={(e) => this.changeSex(e.target.value)} />
                                    <label htmlFor="boy" style={{ marginRight: '25px' }}>男</label>
                                    <input type="radio" name="sex" className="rdo" value="0" ref='girl' onClick={(e) => this.changeSex(e.target.value)} />
                                    <label htmlFor="girl">女</label>
                                </div>
                            </li>
                        </ul>
                        <span className="susBtn" onClick={this.handleclick.bind(this)}>完成</span>
                    </div>
                    {/*完善信息end*/}
                </div>
                <div className="InMengtai" style={isShowSuc}>
                    <div className="InMeImg">
                        <img src="../images/waikuang.png" alt="" />
                        <div className="InTitle">
                            <p>预估报告</p>
                            <p>亲爱的家长您好：</p>
                            <p>当前孩子的英语水平预估为{this.state.titles}级别，推荐孩子从{this.state.titles}课程学起</p>
                            <p>如有问题，请在微信公众号咨询，或</p>
                            <p>或拨打客服电话：400-6767-671</p>
                            <div className="btnKnow" onClick={this.handleGuan.bind(this)} style={{marginTop:'10px'}}>知道了</div>
                            <img src="../images/guan.png" alt="" className="guan" onClick={this.handleGuan.bind(this)} />
                        </div>
                    </div>
                </div>
                <div style={isShowSuc}>
                    {/* <!-- 上课提醒 start --> */}
                    <div className="appointmentBox box-marginTop20">
                        <div className="titlebox">
                            <span></span>
                            <h2>上课提醒</h2>
                        </div>
                        <div className="remindbox">
                            <div className="remin-imgbox"><img src="images/remind.png" alt="" /></div>
                            <p>您还没有预约课程，快去预约一节吧！</p>
                        </div>
                    </div>
                    {/* <!-- 上课提醒 end --> */}

                    {/* <!-- 最近结束 start --> */}
                    <div className="appointmentBox">
                        <div className="titlebox">
                            <span className="color-grey"></span>
                            <h2>最近结束</h2>
                        </div>
                        <div className="remindbox">
                            <div className="remin-imgbox"><img src="images/remind.png" alt="" /></div>
                            <p>还没有已上课程记录。</p>
                        </div>
                    </div>
                    {/* <!-- 最近结束 end --> */}

                    {tuijianCon}
                    <PopUp data={this.state.result} />
                </div>

            </div>
        )
    }
}

