import React,{Component} from 'react';
import {Link} from 'react-router';
export default class My_order_sure extends Component{
  constructor(){
    super();
    this.state={coupon:[],Amount:0};
  }
  render(){
    let goodInfo=this.props.location.state.goodInfo;
    let couponAmount=(this.props.location.state.chooseC||this.props.location.state.chooseC==0)?
      this.props.location.state.couponInfo[this.props.location.state.chooseC].Amount
      :
      0;
    let couponId=(this.props.location.state.chooseC||this.props.location.state.chooseC==0)?
      this.props.location.state.couponInfo[this.props.location.state.chooseC].CouponId
      :
      null;
    return (
      <div>
        <div className="orderbox">
          <div className="orderbox-block">
            <div className="ordercon ordercon2">
              <div>
                <span className="orderName">商品名称：{this.props.location.state.goodInfo.GName}</span>
                <span className="word-time">课时有效期：{this.props.location.state.goodInfo.ExpireDay/30}个月</span>
              </div>
              <div className="pay-priceBox">
                <span>{this.props.location.state.goodInfo.ClassHours}课时</span>
                <span>价格：¥ {this.props.location.state.goodInfo.GPrice}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="userCouponbox">
          {
            this.props.location.state.couponInfo.length == 0 || this.props.location.state.couponInfo == null?
              <Link>
                <p>使用优惠券<span>无可用</span></p>
              </Link>
              :
              <Link to="/My_order/My_order_sure/Choose_my_coupon">
                <p>使用优惠券<span>{this.props.location.state.chooseC||this.props.location.state.chooseC==0?"已选1张":"未使用"}</span></p>
                <p>-¥{couponAmount} <i className='iconfont'>&#xe64a;</i></p>
              </Link>
          }
        </div>

        <div className="amountbox">
          <p>实付金额：<span>¥ {this.props.location.state.goodInfo.DiscountAmount-couponAmount}</span></p>
        </div>

        <Link to={
          {
            pathname:"/My_order/My_pay",
            state:{
              price:this.props.location.state.goodInfo.DiscountAmount,
              jPrice:couponAmount,/*优惠券金额*/
              couponId:couponId,
              goodId:this.props.location.state.goodInfo.GoodsId
            }
          }
        } className="paySucBtn">提交定单</Link>
      </div>
    )
  }
}
