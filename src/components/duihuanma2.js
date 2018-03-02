/**
 * Created by Administrator on 2017/9/7.
 */
import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import $ from 'jquery';
require('../js/qrcode1.js');

import PopUp from "./popUp";
function GetCookie(sName) {
    let aCookie = document.cookie.split("; ");
    for (let i = 0; i < aCookie.length; i++) {
        let aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return null;
}
export default class duihuanma extends Component {
    constructor() {
        super();
        this.state = {
            carNumber: 0,
            result:''
        }
    }
    componentWillMount() {

        this.setState({
            carNumber: this.props.params.id
        })

    }
    duihuanFn() {

        $.ajax({
            type: "GET",
            url: urls + 'api/ExChange/ExchangeClass',
            headers: { Authorization: GetCookie('Tonken') },
            dataType: "json",
            data: {
                CarNumber: this.props.params.id
            },
            success: function (json) {
                if (json.result == 1) {
                    
          
                }else{
                    this.setState({
                        result: json.msg
                      })
                      let that = this;
                      setTimeout(function () {
                        document.getElementsByClassName('bg')[0].style.display = 'block';
                      }, 500);
                      setTimeout(function () {
                        document.getElementsByClassName('bg')[0].style.display = 'none';
                        /*history.go(0);*/
                      }, 1500)
                }
            }.bind(this)
        });
    }
    render() {
        return (
            <div>
                <div className="exchangebox3">
                    <img src="./images/duihuan/duihuanbg3.png" alt="" />
                    <div className="duiNumbox" id='carNumber'>{this.state.carNumber}</div>
                </div>
                <div className="exchangeConbox">
                    <div className="duiNumbtn" onClick={this.duihuanFn.bind(this)}>点击兑换</div>
                    <h2 className="tishiword">激活提示</h2>
                    <div className="tishicon">
                        <div className="tishicon1">
                            <p>1、兑换码兑换成功后，赠送4课时+50元优惠劵</p>
                            <p>（有效期30天）</p>
                            <p>2、如您已报名 ¥99元套餐，无法再次兑换
                       </p>
                            <p>3、点击【我的课时】，查看赠送课时</p>
                            <p>4、点击【我的优惠劵】，查看赠送后的优惠劵</p>
                            <p>5、如有疑问请拨打 400-6767-671 联系客服咨询</p>
                        </div>
                    </div>
                </div>
                <PopUp data={this.state.result} />
            </div>
        )
    }
}
