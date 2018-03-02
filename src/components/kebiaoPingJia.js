/**
 * Created by Administrator on 2017/8/24.
 */
import React, { Component } from 'react';
import Footer from './footer';
import { Link } from 'react-router';
import $ from 'jquery';

export default class MyAppointment extends React.Component {
    constructor(){
        super();
        this.state={
        }
    }
    handleClickWC(){
        function GetCookie(sName){
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
        if(this.refs.texta.value==""){
            this.refs.texta.style.border="1px solid #FF6600"
        }else{
            let ret = {};//定义数组
            location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
                ret[b] = unescape(c);
            });

            $.ajax({
                type: "POST",
                url: urls+`api/HomePage/Tch_Comment`,
                headers: { Authorization: GetCookie('Tonken') },
                dataType: "json",
                data:{
                    Content:this.refs.texta.value,
                    LessonId:ret.lessonid,
                    TeacherId:ret.teacherid,
                    StudentId:ret.studentid,
                    Points:ret.point
                },
                success: function (json){
                    if(json.result==1){
                        location.href="/#/My_timetable";
                    }
                }.bind(this)
            });
            
        }

    }
    render() {
        return (
            <div>
                <div className="memberBox">
                    <div className="member-teacherBox">
                        <div className="member-teacher">
                            <div>
                                <img src="images/student.png" alt=""/>
                            </div>
                        </div>
                        <p>teacher1</p>
                    </div>
                    <div className="start-teacherBox">
                        <img src="images/star-kong.png" alt=""/><img src="images/star-red.png" alt=""/><img src="images/star-red.png" alt=""/><img src="images/star-red.png" alt=""/><img src="images/star-kong.png" alt=""/>
                    </div>
                    <textarea ref="texta" className="assess-text" name="" id="" cols="30" rows="10" placeholder="输入课后评价（100字以内）"></textarea>
                    <button type="button" className="complete-btn orange-btn" onClick={this.handleClickWC.bind(this)}>完成</button>
                </div>
                {/*尾部start*/}
                {/* <Footer/> */}
            </div>
        )
    }
}