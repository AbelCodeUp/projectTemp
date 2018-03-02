/**
 * Created by W520-1 on 2017/8/22.
 */
import React, { Component } from 'react';
import MyCouponDetail from './my_coupon_detail';
import {Link} from 'react-router';
import $ from 'jquery';
/*import MyCouponHeader from './my_coupon_header';*/
export default class My_coupon_hasUser extends Component{
  constructor(){
    super();
    this.state={hasUsed:[],noUsedL:0,expiredCL:0};
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
    /*未使用*/
    $.ajax({
      type: "POST",
      url: urls + 'api/GiveCouponIntegral/GetCouponListStudent?status=0',
      headers: { Authorization: GetCookie('Tonken') },
      dataType: "json",
      success: function (json) {
        if (json.result == 1) {
          console.log(json);
          this.setState({ noUsedL: json.data.length });
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
          this.setState({hasUsed:json.data});
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
          this.setState({expiredCL:json.data.length});
        }
      }.bind(this)
    });
  }
  handleClick(params){
    console.log(1);
    document.getElementsByClassName('bg')[0].style.display='block';
  }
  render(){
    return (
      <div>
        <ul className="couponHead">
          <li>
            <Link to={"/My_coupon_noUsed/"+this.props.params.id}><p>未使用({this.state.noUsedL})</p></Link>
            <div className="coupon-line"></div>
          </li>
          <li>
            <Link to={"/My_coupon_hasUsed/"+this.props.params.id}><p>已使用({this.state.hasUsed.length})</p></Link>
            <div className="coupon-line" style={{display:'block'}}></div>
          </li>
          <li>
            <Link to={"/My_coupon_expired/"+this.props.params.id}><p>已过期({this.state.expiredCL})</p></Link>
            <div className="coupon-line"></div>
          </li>
        </ul>
        <div className="couponBox">
          {this.state.hasUsed.length>0?
            this.state.hasUsed.map((item,index)=>{
            return (
              <div className="couponInner hasUsedCoupon" onClick={this.handleClick.bind(this,item)} key={index}>
                <p className="price"><span>优惠券</span><br/>￥{item.Amount}</p>
                <ul className="coupon-con">
                  <li className="coupon-contop">
                    <p>
                      <span>{item.CouponName}</span>
                    </p>
                  </li>
                  <li className="validityBox">
                    <span>有效期：</span>
                    <span>{item.valid}</span>
                  </li>
                </ul>
                <MyCouponDetail></MyCouponDetail>
              </div>
            )
          })
            :
            <div><p style={{textAlign:'center',fontSize:'14px',lineHeight:'50px'}}>没有已使用的优惠券</p></div>
          }

        </div>
      </div>
    )
  }
}
