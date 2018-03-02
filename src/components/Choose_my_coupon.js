/**
 * Created by W520-1 on 2017/8/22.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
let chooseCoupon = require('../images/choose-coupon.png');
export default class Choose_my_coupon extends Component {
  constructor() {
    super();
    this.state = { couponInfo: [], goodInfo: {} }
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


    /*获取商品信息*/
    $.ajax({
      type: "GET",
      url: urls + "api/Order/GetGoodDetail?" + this.props.location.state.goodId,
      headers: { Authorization: localStorage.getItem('Tonken') },
      dataType: "json",
      success: function (json) {
        if (json.result == 1) {
          this.setState({ goodInfo: json.data })
        }
      }.bind(this)
    });
    /*获取优惠券信息*/
    $.ajax({
      type: "GET",
      url: urls + "api/Order/GetCouponList?" + this.props.location.state.goodId,
      headers: { Authorization: localStorage.getItem('Tonken') },
      dataType: "json",
      success: function (json) {
        if (json.result == 1) {
          this.setState({ couponInfo: json.data })
        }
      }.bind(this)
    });
  }
  handleClick(param) {
    let c = 'coupon' + param;
    let add = 'add' + param;
    let chooseYes = document.getElementsByClassName('chooseYes');
    var newInfo = [];
    for (var i = 0; i < chooseYes.length; i++) {
      if (chooseYes[i] == this.refs[add]) {
        chooseYes[i].style.display = "block";
        newInfo.push({ ...this.state.couponInfo[i], Status: 1 });
      } else {
        chooseYes[i].style.display = "none";
        newInfo.push({ ...this.state.couponInfo[i], Status: 0 });
      }
      this.setState({ couponInfo: newInfo });
    }
    this.setState({ chooseC: param });
  }
  render() {
    console.log(this.state.couponInfo);
    console.log(this.props.location);
    return (
      <div>
        <div className="couponBox">
          {this.state.couponInfo.length > 0 ?
            this.state.couponInfo.map((item, index) => {
              return (
                <div className="couponInner noUsedCoupon" ref={"coupon" + index} key={index} onClick={this.handleClick.bind(this, index)}>
                  <p className="price"><span>优惠券</span><br />￥{item.Amount}</p>
                  <ul className="coupon-con">
                    <li className="coupon-contop">
                      <p>
                        <span>{item.CouponName}</span>
                      </p>
                    </li>
                    <li className="validityBox">
                      <span>有效期：</span>
                      <span>{item.StartTime} - {item.EndTime}</span>
                    </li>
                    <li>
                      <div className="chooseYes" ref={"add" + index}>
                        <img src={chooseCoupon} alt="" />
                      </div>
                    </li>
                  </ul>
                </div>
              )
            })
            :
            <div><p style={{ textAlign: 'center' }}>没有课选择的优惠券</p></div>
          }


        </div>
        {/*<Link to="/My_order/My_order_sure" className="paySucBtn">确定</Link>*/}
        {this.state.couponInfo.length > 0 ?
          <Link to={
            {
              pathname: "/My_order/My_order_sure",
              state: {
                couponInfo: this.state.couponInfo,
                goodInfo: this.state.goodInfo,
                chooseC: this.state.chooseC,
                goodId: this.props.location.state.goodId
              }
            }
          } className="paySucBtn">确定</Link>
          :
          null
        }
      </div>
    )
  }
}
