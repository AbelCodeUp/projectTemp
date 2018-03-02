import React,{Component} from 'react';
import {Link,hashHistory} from 'react-router';
import $ from 'jquery';

export default class My_personCenter_changePhone1 extends Component{
    constructor(){
        super();
        this.state={Mobiles:'',haoma:''}
    }
    componentDidMount(){
        function GetCookie(sName){
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
    }
    /*获取验证码*/
    handleClick(){
        function GetCookie(sName){
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
            url: urls+`api/HomePage/SendChangePwdSMS?cell=${this.state.haoma}`,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json){
                console.log(json);
            }.bind(this)
        });
        
    }
    /*校验原手机号*/
    handleOldMobile(){
        function GetCookie(sName){
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
        let yzms=this.refs.PhoneNum.value;
        $.ajax({
            type: "GET",
            url: urls+`api/HomePage/ExistMobilCode?cell=${this.state.haoma}&&code=${yzms}&&type=0`,
            headers: { Authorization:localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json){
                console.log(json);
                if(json.result==0){
                    return false
                }
                /*hashHistory.push('/My_personCenter/My_personCenter_changePhone2');*/
                hashHistory.push({pathname:'/My_personCenter/My_personCenter_changePhone2',state:{haoma:this.state.haoma}})
            }.bind(this)
        });
    }
    render(){
        return (
            <div>
                <ul className="myPersonCenterbox">
                    <li>
                        <span className="phonebox">{this.state.Mobiles}</span>
                    </li>
                    <li>
                        <input ref="PhoneNum" type="text" placeholder="请输入短信验证码" className="yanzhen" maxLength="4" />
                        <button type="button" className="yanzhenBtn" onClick={this.handleClick.bind(this)}>获取验证码</button>
                    </li>
                </ul>
                <a className="saveBtn" onClick={this.handleOldMobile.bind(this)}>确定</a>
            </div>
        )
    }
}
