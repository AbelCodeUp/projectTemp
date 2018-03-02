import React, { Component } from 'react';
import { Link } from 'react-router';
import Counter1 from './Counter1';
import $ from 'jquery';



function GetCookie(sName) {
    let aCookie = document.cookie.split("; ");
    for (let i = 0; i < aCookie.length; i++) {
        let aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return null;
}

export default class My_pay extends Component {
    constructor() {
        super();
        this.state = { goodInfo: { GName: '' }, OrderNUM: '', linkA: '', orderDao: true, min: 0, s: 0 }
    }
    componentWillMount(){
        let time = this.props.location.state.CreateTime,
                year = time.substr(0,4),
                month = time.substr(5,2),
                day = time.substr(8,2),
                hour = time.substr(11,2),
                minute = time.substr(14,2),
                second = 0,
                leftTime = (new Date(year,month-1,day,hour+1,minute,second)) - (new Date()) ,
                minutes = parseInt(leftTime / 1000 / 60 % 60, 10),
                seconds = parseInt(leftTime / 1000 % 60, 10),
                hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
                console.log(hours)
        this.setState({
            min:minutes,
            s:seconds
        })
        console.log(this.state.min)
    }
    
    componentDidMount() {
        var GoodsId = "";
        if (this.props.location.state.goodId && this.props.location.state.couponId != null) {
            GoodsId = this.props.location.state.goodId;
            console.log(GoodsId);
        } else {
            GoodsId = this.props.location.state.goodId;
        }
        /*获取商品信息*/
        $.ajax({
            type: "GET",
            url: urls + "api/Order/GetGoodDetail?goodId=" + GoodsId,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result >= 1000) {
                    document.cookie = "Tonken=" + '';
                    window.location.reload();
                } else {
                    this.setState({ goodInfo: json.data })
                }
            }.bind(this)
        });
        /*获取订单编号*/
        var OrderNUM = this.props.location.state.orderNUM;
        if (OrderNUM) {
            this.setState({ OrderNUM })
        } else {
            $.ajax({
                type: "GET",
                url: urls + "api/Order/GetNewOrderNum?GoodsId=" + GoodsId,
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result >= 1000) {
                        document.cookie = "Tonken=" + '';
                        window.location.reload();
                    } else {
                        console.log(json.data);
                        this.setState({ OrderNUM: json.data.OrderNUM });
                    }
                }.bind(this)
            });
        }

    }

    // payClick(goodId,goodName,price) {
    //     //确认支付
    //     //确认支付点击事件绑定的函数
    //     //var urlObj =
    //         //console.log(urlObj);
    //         // var goodsId = $('.confirmBox').attr('goodsId');
    //         // var goodsName = $('.confirmBox').attr('goodsName');
    //         // var price = $('.confirmBox').attr('price');
    //         // alert(goodsId+""+goodsName+price+"");
    //         var postUrl = urls+'api/Order/PostZhiFu';
    //         //微信
    //         $.ajax({
    //             url: postUrl,
    //             headers: {
    //                 Authorization: GetCookie('Tonken')
    //             },
    //             type: "post",
    //             data: {
    //                 ZhiFuType: 2,
    //                 OrderNum: this.state.OrderNUM,
    //                 GoodsId: this.state.goodInfo.GoodsId,
    //                 GoodsName: this.state.goodInfo.GName,
    //                 GPrice: this.state.goodInfo.DiscountAmount,
    //                 Remarks: "",
    //                 CouponId: 0,
    //                 PaySource: 1
    //             },
    //             success: function (data) {
    //                 //alert(data.result)
    //                 if (data.result == 1) {//调取微信接口
    //                     //alert('调取微信接口');
    //                     appId = data.data.appId;
    //                     timeStamp = data.data.timeStamp;
    //                     nonceStr = data.data.nonceStr;
    //                     packages = data.data.package;
    //                     signType = data.data.signType;
    //                     paySign = data.data.paySign;
    //                     callPay();
    //                 } else if (data.result >= 1000) {//Token过期后，重新获取Token
    //                     // alert(data.result);
    //                     document.cookie = "Tonken=" + '';
    //                     window.location.reload();
    //                 } else {
    //                     alert(data.msg);

    //                 }
    //             }
    //         });
    // }

    render() {
        

        var objUrl = `h5index/jump.html?OrderNum=${this.state.OrderNUM}&GoodsId=${this.state.goodInfo.GoodsId}&GoodsName=${escape(this.state.goodInfo.GName)}&Gprice=${this.props.location.state.price}&MyNum=${localStorage.getItem('Tonken')}&ZhiFuType=2&PaySource=0`;
        //console.log(objUrl);
        return (
            <div>
                <div className="orderbox">
                    <div className="orderbox-block">
                        <div className="titlebox">
                            <span></span>
                            <h2>订单编号：{this.state.OrderNUM}</h2>
                        </div>
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
                    <a href="javascript:;">
                        <p>使用优惠券<span>{this.props.location.state.jPrice ? "已选1张" : "未使用"}</span></p>
                        {this.props.location.state.jPrice == 0 ? <p></p>:<p>¥ {this.props.location.state.jPrice} </p>}
                    </a>
                </div>

                <div className="amountbox">
                    <p>实付金额：<span>¥ {this.state.goodInfo.GPrice - this.props.location.state.jPrice}</span></p>
                </div>
                {/*{this.state.min}分钟{this.state.s}秒*/}
                <Counter1 value={this.state.s} initM={this.state.min}/>

                {/*<a className="wxPayBtn" onClick={this.handleClick}>微信支付</a>*/}
                <a href={objUrl} className="wxPayBtn">微信支付</a>
                {/* <span className="wxPayBtn" onClick={this.payClick.bind(this,this.state.goodInfo.GoodsId,this.state.goodInfo.GName,this.state.goodInfo.DiscountAmount)}>微信支付</span> */}
            </div>
        )
    }
}
