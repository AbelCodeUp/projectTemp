/**
 * Created by Administrator on 2017/8/24.
 */
import React, { Component } from 'react';
import Footer from './footer';
import { Link,hashHistory } from 'react-router';
import { Rate } from 'antd';
import $ from 'jquery';
import store from '../redux/store';
import actions from '../redux/actions';

function GetCookie(sName) {
    let aCookie = document.cookie.split("; ");
    for (let i = 0; i < aCookie.length; i++) {
        let aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return null;
}
export default class MyAppointment extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            teacherImg: '',
            teacherName: '',
            teacherGender: 0,
            isDingji: false,
            isComment:false
        }
    }
    componentWillMount(){
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        $.ajax({
            type: "GET",
            url: urls + "api/HomePage/GetCompleteMyLess",
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                 var num=0;
                if(ret.num){
                    num=ret.num;
                }
                if (json.result == 1) {
                   
                    if(json.data[num].IsComment==0){
                        $.ajax({
                            type: "GET",
                            url: urls + 'api/HomePage/GetLessonDeatil?lessonId=' + ret.lessonid,
                            headers: { Authorization: localStorage.getItem('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result == 1) {
                                    // location.href="http://localhost:8000/#/"
                                    this.setState({
                                        teacherImg: json.data[0].TeacherImg,
                                        teacherName: json.data[0].TeacherName,
                                        teacherGender: json.data[0].TeacherGender
                                    })
                                }
                            }.bind(this)
                        });
                        
                    }else if(json.data[num].IsComment==1){
                        // this.refs.shengyuks.style.display='block';
                        // this.refs.tishi.innerHTML='您已经评价过了，不能再评价了'
                        // var that=this;
                        // setTimeout(function(){
                        //     that.refs.shengyuks.style.display='none';
                        // },2000)
                        this.setState({
                            isComment:true
                        })
                    }
                }
            }.bind(this)
        });
        
    }
    
    handleClickWC() {
        if (this.refs.texta.value == "") {
            this.refs.texta.style.border = "1px solid #FF6600";

        } else if (this.state.value == 0) {
            this.refs.shengyuks.style.display='block';
            this.refs.tishi.innerHTML='请至少选择一颗星星！'
            var that=this;
            setTimeout(function(){
                that.refs.shengyuks.style.display='none';
            },2000)
        } else {

            let ret = {};//定义数组
            location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
                ret[b] = unescape(c);
            });
            $.ajax({
                type: "POST",
                url: urls + `api/HomePage/Tch_Comment`,
                headers: { 
                    Authorization: localStorage.getItem('Tonken'),

                 },
                dataType: "json",
                data: {
                    Content: this.refs.texta.value,
                    LessonId: ret.lessonid,
                    TeacherId: ret.teacherid,
                    StudentId: ret.studentid,
                    Points: this.state.value
                },
                success: function (json) {
                    if (json.result == 1) {
                        // 设置redux
                        $.ajax({
                            type: "GET",
                            url: urls + `api/HomePage/IsShowIntegral`,//判断是否是正式学员，0为体验，1为正式
                            headers: { Authorization: localStorage.getItem('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result == 1) {
                                     actions.ChangeYou(true,json.total);
                                }else if(json.result == 0 ){
                                    actions.ChangeYou(false,json.total);
                                }
                                this.setState({
                                    isShows : store.getState().isShow
                                })
                                
                                hashHistory.push(`/PingJiaSuc?studentid=${ret.studentid}&num=${this.state.value}&lessonid=${ret.lessonid}`);
                            }.bind(this)
                        });
                    }
                }.bind(this)
                
            });
        }



    }
  
    handleChange = (value) => {
        this.setState({ value });
    }
    hideFenxiangClick() {
        this.refs.okFenxiang.style.display = 'none';
    }
    imgError(obj){
        // alert(obj.src)
        let tchimgurl = '';
        if (this.state.teacherGender == 1) {
                obj.src = '../images/tch_boy.jpg';
            } else {
                obj.src = '../images/tch_girl.jpg';
            }
    }
    render() {
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        let tchimgurl = '';
        if (this.state.teacherImg == "") {
            if (this.state.teacherGender == 1) {
                tchimgurl = '../images/tch_boy.jpg';
            } else {
                tchimgurl = '../images/tch_girl.jpg';
            }
        } else {
            tchimgurl = this.state.teacherImg
        }
        const { value,isComment } = this.state;
        return (
            <div>
                {
                    this.state.isComment?
                    <div style={{textAlign:'center',paddingTop:'2rem'}}>
                        <p className='xieyi' style={{ lineHeight: '30px',color:'#333',marginBottom:'2rem',background:'rgb(245,245,245)',fontSize:'16px'}}>您已完成课后评价！</p>
                        <Link to="/My_timetable">
                            <button style={{color:'#fff',background:'#ff6600',width:'4rem',height:'1rem',lineHeight:'1rem',textAlign:'center',borderRadius:'1rem',fontSize:'16px'}}>返回课表</button>
                        </Link>
                    </div>:
                    <div>
                        <div className="memberBox memberBox2" ref="memberBox">
                            <div className="member-teacherBox">
                                <div className="member-teacher">
                                    <div>
                                        <img src={tchimgurl} alt="" onError={(e)=>this.imgError(e.target)} />
                                    </div>
                                </div>
                                <p>{this.state.teacherName}</p>
                            </div>
                            <Rate value={value} onChange={this.handleChange} style={{ color: '#DC2828', display: 'inherit', flexWrap: 'nowrap', border: 'none', height: '20px', textAlign: "center" }} />
                            {/*<div className="start-teacherBox">*/}
                            {/*<img src="images/star-kong.png" alt=""/><img src="images/star-red.png" alt=""/><img src="images/star-red.png" alt=""/><img src="images/star-red.png" alt=""/><img src="images/star-kong.png" alt=""/>*/}
                            {/*</div>*/}
                            <textarea maxLength="100" ref="texta" className="assess-text" name="" id="" cols="30" rows="10" placeholder="输入课后评价（100字以内）"></textarea>
                            <button type="button" className="complete-btn orange-btn" onClick={this.handleClickWC.bind(this)} style={{marginBottom:'1rem'}}>完成</button>
                            <div style={{textAlign:'center',fontSize:'16px',marginBottom:'3rem',color:'#aaa'}}> 完成课后评价可获得 <span style={{color:'#FF6600',fontSize:'18px'}}>5</span> 积分！</div>
                        </div>
                        <div className="appointmentAlertBox" ref="shengyuks">
                            <div className="appointmentAlert" style={{height:'2.87rem'}}>
                                <p ref="tishi">请至少选择一颗星星！</p>                        
                            </div>
                        </div>
                    </div>
                }
                
                
            </div>
        )
    }
}