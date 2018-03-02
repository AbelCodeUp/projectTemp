import React, {Component} from 'react';
import {Link} from 'react-router';
import {hashHistory} from 'react-router';
import $ from 'jquery';
import BangPhone from './bangdingshoujihao';
export default class My_order_no extends Component {
    constructor() {
        super();
        this.state = {goodInfo: {}, couponInfo: {},isHide:false,channelId:0};
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
        ;
        let goodId = location.href.slice(location.href.lastIndexOf('?')+1).split('&')[0];
        console.log(goodId);
        let channelId=location.href.slice(location.href.lastIndexOf('?')+1).split('&')[1];
        console.log("channelId="+channelId);
        // alert (channelId);
        this.setState({channelId});
        if (GetCookie("Tonken") || localStorage.getItem('Tonken')) {

            /*获取商品信息*/
            $.ajax({
                type: "GET",
                url: urls+"api/Order/GetGoodDetail?" + goodId,
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json){
                    if(json.result>=1000){
                        document.cookie = "Tonken="+'';
                        window.location.reload();
                    }else{
                        this.setState({goodInfo: json.data})
                    }
                }.bind(this)
            });
            
            /*获取优惠券信息*/
            $.ajax({
                type: "GET",
                url: urls+"api/Order/GetCouponList?" + goodId,
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json){
                    if(json.result>=1000){
                        document.cookie = "Tonken="+'';
                        window.location.reload();
                    }else{
                        this.setState({couponInfo: json.data})
                    }
                }.bind(this)
            });
        } else {
            // this.setState({isHide:true});
            hashHistory.push("/My?"+goodId+'&'+channelId);
        }
        function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null;
        }
    }
    render() {
        console.log(this.state);
       // var hide= this.state.isHide?{display:'none'}:{display:'block'};
       // var dis=!this.state.isHide?{display:'none'}:{display:'block'};
        return (
            <div>
                {/*<div ref="order" style={hide}>*/}
                <div ref="order">
                    <div className="orderbox">
                        <div className="orderbox-block">
                            <div className="ordercon ordercon2">
                                <div>
                                    <span className="orderName">商品名称：{this.state.goodInfo.GName}</span>
                                    <span className="word-time">课时有效期：{this.state.goodInfo.ExpireDay / 30}个月</span>
                                </div>
                                <div className="pay-priceBox">
                                    <span>{this.state.goodInfo.ClassHours}课时</span>
                                    <span>价格：¥ {this.state.goodInfo.GPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="userCouponbox">
                        {
                            this.state.couponInfo.length > 0 ?
                                <Link to={
                                    {
                                        pathname: "/My_order/My_order_no/Choose_my_coupon",
                                        state: {goodId: window.location.href.split("?")[1]}
                                    }
                                }>
                                    <p>使用优惠券</p>
                                    <p>{this.state.couponInfo.length} <i className='iconfont'>&#xe64a;</i></p>
                                </Link>
                                :
                                <Link>
                                    <p>使用优惠券</p>
                                    <p>无可用<i className='iconfont'>&#xe64a;</i></p>
                                </Link>
                        }
                    </div>

                    <div className="amountbox">
                        <p>实付金额：<span>¥ {this.state.goodInfo.DiscountAmount}</span></p>
                    </div>


                    {/*<Link to={
                        {
                            pathname: "/My_order/My_order_sure",
                            state: {couponInfo: this.state.couponInfo, goodInfo: this.state.goodInfo}
                        }
                    } className="paySucBtn">提交定单</Link>*/}
                    <Link to={
                        {
                            pathname: "/My_order/My_pay",
                            state: {price:this.state.goodInfo.DiscountAmount,
                                jPrice:0,/*优惠券金额*/
                                couponId:undefined,
                                goodId:this.state.goodInfo.GoodsId}
                        }
                    } className="paySucBtn">提交订单</Link>
                </div>
                {/*<div style={dis}>*/}
                    {/*<BangPhone ref="bindPhone" jump="my_order_no" channelId={this.state.channelId}/>*/}
                {/*</div>*/}
            </div>
        )
    }
}
