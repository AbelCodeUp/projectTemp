import React, { Component } from 'react';
import { Link } from 'react-router';
import { Avatar } from 'antd';
import { Rate, Icon } from 'antd';
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

//已结束
export default class LessonCompleted extends Component {
    constructor() {
        super();
        this.state = {
            isPinjiabox: false,
            isPinjia: true,
            value: 0,
            count: null,
            teacherName: '',
            teacherFileUrl: '',
            teacherGender: 0,
            describe: {
                value: '',
                flag: true
            },
            lessonId: 0,
            teacherId: 0,
            studentId: 0,
            pingjiaSucs: false
        };
        this.pingjiaClick = this.pingjiaClick.bind(this);
        this.pingjiaHide = this.pingjiaHide.bind(this);
    }
    componentWillMount() {

    }
    pingjiaClick(v1, v2, v3, v4, v5, v6, v7) {
        if (v7 == null) {
            v7 = 0;
        }
        this.setState({
            isPinjiabox: true,
            isPinjia: true,
            lessonId: v2,
            teacherId: v1,
            teacherName: v3,
            teacherFileUrl: v4,
            teacherGender: v7,
            studentId: v5
        })

    }
    pingjiaHide() {
        this.setState({
            isPinjia: false,
            isPinjiabox: false,
        })
    }
    handleChange = (value) => {
        this.setState({ value });
    }
    GradSubmit() {
        const { describe, value, studentId, lessonId, teacherId } = this.state;
        if (value <= 0 || describe.value == "") {
            alert('请填写信息');
            return;
        }
        $.ajax({
            type: "POST",
            url: urls + 'api/HomePage/Tch_Comment',
            headers: { Authorization: GetCookie('Tonken') },
            dataType: "json",
            data: {
                Content: describe.value,
                LessonId: teacherId,
                TeacherId: lessonId,
                StudentId: studentId,
                Points: value
            },
            success: function (json) {
                if (json.result == 1) {
                    this.setState({
                        isPinjiabox: true,
                        isPinjia: false,
                        value: value,
                        count: value,
                        teacherName: '',
                        teacherFileUrl: '',
                        describe: {
                            value: describe.value,
                            flag: true
                        },
                        lessonId: 0,
                        teacherId: 0,
                        studentId: 0,
                        isA: false,
                        pingjiaSucs: true
                    })
                    //window.history.go(0);
                }
            }.bind(this)
        });

    }
    valueChange(val) {
        const { describe } = this.state;
        this.setState({
            describe: {
                value: val,
                flag: false
            }
        })

    }
    pingjiaHides() {
        this.setState({
            isPinjia: false,
            pingjiaSucs: false,
            isPinjiabox: false
        })
        // window.history.go(0);
        // location.href=location.href;
        location.reload(true)
    }
    render() {
        let dataObj = this.props.data;
        let b_img = ''
        // require('../images/jiangbei.png');
        let userImg = { marginLeft: '0px' };
        let items = [];
        var textError = this.state.describe.flag ? { border: '1px solid #ccc' } : { border: '1px solid #f60000' }
        let isShowz = this.state.isPinjiabox ? { display: 'block', height: document.documentElement.clientHeight + 'px' } : { display: 'none', height: document.documentElement.clientHeight + 'px' }
        let isShows = this.state.isPinjia ? { display: 'block' } : { display: 'none' }
        let pingjiaSuc = this.state.pingjiaSucs ? { display: 'block' } : { display: 'none' };
        if (dataObj.length == 0 || dataObj == null) {
            items = <div>
                <div className="remindbox">
                    <div className="remin-imgbox"><img src="images/remind.png" alt="" /></div>
                    <p>还没有已上课程记录。</p>
                </div>
            </div>
        } else {
            dataObj.map((d, i) => {
                // let arr1 = d.StartTime.split(' ')[0].split('-');
                // let arr2 = d.StartTime.split(' ')[1].split(':');
                // dateZhuan(d.StartTime)
                let time = dateZhuan(d.StartTime);
                let nowTime = new Date();
                const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '今天'];
                let classState = ''
                if (d.StudentStatus == 1) {
                    classState = '缺勤'
                } else if (d.StudentStatus == 2) {
                    classState = '迟到'
                }

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



                let isjianBeiShow = d.GiftCount <= 0 ? { display: 'none' } : { display: 'block' };
                let pinjia;


                if (d.IsComment == '0') {
                    pinjia = <div className="index_ds_states">
                        <Link to={{ pathname: "/PingJia", query: { studentid: d.StudentId, lessonid: d.LessonId, teacherid: d.TeacherId, num: i } }}><span id="pingji" className="state-right" ref="pingj">
                            <div className="lingjifen"></div>
                        待评价</span></Link>
                    </div>
                } else {
                    if (!this.state.isA) {
                        pinjia = ''
                    }
                }


                items.push(
                    <div className="appointmentList marginTop0" key={i} style={{ borderTop: '1px solid #e8e8e8',position:'relative'}}>

                        <div className="stateBox">
                            <p>{timeStr}<span>{classState}</span></p>
                            {pinjia}
                        </div>
                        <Link to={`/YijieshuClassXiang?lessonId=${d.LessonId}&tiyan=${this.props.tiyan}&num=${i}`}>
                            <div className="classImageBox">
                                <img src={imgs+d.FilePath} alt="" />
                            </div>
                        </Link>
                        <div className="classConBox">
                            <div className="class-title">
                                <span className="grey-kong">{d.LevelName}</span><p>{this.props.tiyan == 0 ? '体验课' : d.FileTittle.split(' ')[1]}</p>
                                {
                                    d.GiftCount <= 0 ? ''
                                        : <p className="classTitle-right">{d.GiftCount}<i className="iconfont">&#xe712;</i></p>
                                }
                            </div>
                            <p>{d.Describe} </p>
                        </div>
                    </div>
                )
            })
        }
        let tchimgurl = '';
        if (this.state.teacherFileUrl == "") {
            if (this.state.teacherGender == 1) {
                tchimgurl = '';
            } else {
                tchimgurl = '';
            }
        } else {
            tchimgurl = this.state.teacherFileUrl
        }
        return (
            <div>
                <ul className="index_panelbox">
                    <li>
                        {items}
                    </li>
                </ul>
            </div>
        )
    }
}