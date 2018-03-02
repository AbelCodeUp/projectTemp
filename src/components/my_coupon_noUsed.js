/**
 * Created by W520-1 on 2017/8/22.
 */
import React, { Component } from 'react';
import MyCouponDetail from './my_coupon_detail';
import { Link } from 'react-router';
import $ from 'jquery';
/*import MyCouponHeader from './my_coupon_header';*/
let couponOrange = require('../images/coupon-orange.png');
export default class My_coupon_noUser extends Component {
    constructor() {
        super();
        this.state = { noUsed: [], hasUsedL: 0, expiredCL: 0, dataArr: [], con: '未使用',nowData:[],time:'' }
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

        /*未使用*/
        $.ajax({
            type: "POST",
            url: urls + 'api/GiveCouponIntegral/GetCouponListStudent?status=0',
            headers: { Authorization: GetCookie('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    console.log(json);
                    this.setState({ noUsed: json.data, dataArr: json.data });
                } else if (json.result >= 1000) {
                    hashHistory.push("/My");
                }
            }.bind(this)
        });
        /*已使用*/
        $.ajax({
            type: "POST",
            url: urls + 'api/GiveCouponIntegral/GetCouponListStudent?status=1',
            headers: { Authorization: GetCookie('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    console.log(json);
                    this.setState({ hasUsedL: json.data.length });
                } else if (json.result >= 1000) {
                    hashHistory.push("/My");
                }
            }.bind(this)
        });
        /*已过期*/
        $.ajax({
            type: "POST",
            url: urls + 'api/GiveCouponIntegral/GetCouponListStudent?status=2',
            headers: { Authorization: GetCookie('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    console.log(json);
                    this.setState({ expiredCL: json.data.length });
                } else if (json.result >= 1000) {
                    hashHistory.push("/My");
                }
            }.bind(this)
        });
    }

    handleClick(e, items,time) {
        // if (e.target.className == 'paySucBtn') {
            
        //     document.getElementsByClassName('bg')[0].style.display = 'none';
        // } else {
            
        // }
        document.getElementsByClassName('bg')[0].style.display = 'block';
        this.setState({
            nowData:items,
            time:time
        })
    }
    noUsedFn() {
        $.ajax({
            type: "POST",
            url: urls + 'api/GiveCouponIntegral/GetCouponListStudent?status=0',
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    console.log(json);
                    this.setState({ dataArr: json.data, con: '未使用' });
                    this.refs.onusedLine.style.display = 'block';
                    this.refs.usedLine.style.display = 'none';
                    this.refs.expiredLine.style.display = 'none';
                } else if (json.result >= 1000) {
                    hashHistory.push("/My");
                }
            }.bind(this)
        });
    }
    UsedFn() {
        $.ajax({
            type: "POST",
            url: urls + 'api/GiveCouponIntegral/GetCouponListStudent?status=1',
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    console.log(json);
                    this.setState({ dataArr: json.data, hasUsedL: json.data.length, con: '已使用' });
                    this.refs.onusedLine.style.display = 'none';
                    this.refs.usedLine.style.display = 'block';
                    this.refs.expiredLine.style.display = 'none';
                } else if (json.result >= 1000) {
                    hashHistory.push("/My");
                }
            }.bind(this)
        });
    }
    expiredFn() {
        $.ajax({
            type: "POST",
            url: urls + 'api/GiveCouponIntegral/GetCouponListStudent?status=2',
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    console.log(json);
                    this.setState({ expiredCL: json.data.length, dataArr: json.data, con: '已过期' });
                    this.refs.onusedLine.style.display = 'none';
                    this.refs.usedLine.style.display = 'none';
                    this.refs.expiredLine.style.display = 'block';
                } else if (json.result >= 1000) {
                    hashHistory.push("/My");
                }
            }.bind(this)
        });
    }
    hideClick(){
        document.getElementsByClassName('bg')[0].style.display = 'none';
    }
    render() {
        console.log(this.state.noUsed);
        const { dataArr } = this.state;
        let newArr = dataArr;
        return (
            <div>
                <ul className="couponHead">
                    {/* <li>
                        <Link to={"/My_coupon_noUsed/"+this.props.params.id}><p>未使用({this.state.noUsed.length})</p></Link>
                        <div className="coupon-line" style={{display: 'block'}}></div>
                    </li>
                    <li>
                        <Link to={"/My_coupon_hasUsed/"+this.props.params.id}><p>已使用({this.state.hasUsedL})</p></Link>
                        <div className="coupon-line"></div>
                    </li>
                    <li>
                        <Link to={"/My_coupon_expired/"+this.props.params.id}><p>已过期({this.state.expiredCL})</p></Link>
                        <div className="coupon-line"></div>
                    </li> */}
                    <li onClick={this.noUsedFn.bind(this)}>
                        <span><p>未使用({this.state.noUsed.length})</p></span>
                        <div className="coupon-line" style={{ display: 'block' }} ref='onusedLine'></div>
                    </li>
                    <li onClick={this.UsedFn.bind(this)}>
                        <span><p>已使用({this.state.hasUsedL})</p></span>
                        <div className="coupon-line" ref='usedLine'></div>
                    </li>
                    <li onClick={this.expiredFn.bind(this)}>
                        <span><p>已过期({this.state.expiredCL})</p></span>
                        <div className="coupon-line" ref='expiredLine'></div>
                    </li>
                </ul>
                <div className="couponBox">
                    {newArr.length > 0 ?
                        newArr.map((item, index) => {
                            let reg=/-/g;
                            let n = 0;
                            let valids = item.valid.replace(reg,function(a,b,c){
                                n++;
                                if(n==3){
                                    return '-'
                                }else{
                                    return '.'
                                }                                
                            });
                            let strClass = ''
                            switch(this.state.con){
                                case '未使用':strClass='couponInner noUsedCoupon';
                                break;
                                case '已使用':strClass='couponInner hasUsedCoupon';
                                break;
                                case '已过期':strClass='couponInner expiredCoupon';
                                break;
                            }
                            return (
                                /*onClick={this.handleClick.bind(this,item)}*/
                                <div className={strClass}
                                    onClick={(event) => this.handleClick(event, item,valids)} key={index}>
                                    <p className="price"><span>优惠券</span><br />¥ {item.Amount}</p>
                                    <ul className="coupon-con">
                                        <li className="coupon-contop">
                                            <p>
                                                <span style={{'fontWeight':'600'}}>{item.CouponName}</span>
                                                <span style={{'color':'#bbb','lineHeight':'0.5rem','height':'1rem'}}>{item.Description}</span>
                                            </p>
                                        </li>
                                        <li className="validityBox" style={{'lineHeight':'0.6rem'}}>
                                            <span>有效期：</span>
                                            <span>{valids}</span>
                                        </li>
                                    </ul>
                                    {/* <MyCouponDetail ref="coupon" detail={item}></MyCouponDetail> */}
                                </div>)
                        })
                        :
                        <div><p style={{ textAlign: 'center', fontSize: '14px', lineHeight: '50px' }}>没有{this.state.con}优惠券</p></div>
                    }
                </div>
                {
                    this.state.con == '未使用' ? <a href={urlsguan + "h5active/index.html?stuid=" + this.props.params.id} className="invite">参与邀请活动，赠送积分哦！<br /><span
                        className="go">点击去参与>></span></a>
                        :
                        ''
                }
                <div className="bg" ref="bg" style={{height:`${document.documentElement.clientHeight}px`}}>
                    <div className="popUp_wrapper">
                        <div className="popUp">
                            <h5>优惠券详情</h5>
                            <ul>
                                <li><span>优惠说明：</span>{this.state.nowData.CouponName}</li>
                                <li><span>有效日期：</span>{this.state.time}</li>
                                <li>
                                    <span>使用须知：</span>
                                    <p>{this.state.nowData.Description}</p>
                                </li>
                            </ul>
                            {/*onClick={this.handleClicks.bind(this)}*/}
                            <span className="paySucBtn" onClick={this.hideClick.bind(this)}>确定</span>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
