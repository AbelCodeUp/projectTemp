import React, { Component } from 'react';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import $ from 'jquery';
import { Spin } from 'antd';


export default class My_order extends Component {
    constructor() {
        super();
        this.state = {
            datas: [], openid: null,
            liked: true,
            count: 60,
            orderid:0
        };
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
        if (GetCookie("Tonken") || localStorage.getItem('Tonken')) {
            $.ajax({
                type: "GET",
                url: urls + "api/HomePage/GetRecommendedCourses",
                headers: { Authorization: localStorage.getItem('Tonken') },
                dataType: "json",
                success: function (json) {
                    if (json.result == -2) {
                        hashHistory.push("/courseSurvew/4")
                    } else if (json.result == 1) {
                        /*获取订单列表*/
                        $.ajax({
                            type: "GET",
                            url: urls + "api/Order/GetOrderPage?pageIndex=0&&pageSize=100",
                            headers: { Authorization: localStorage.getItem('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result == 1) {
                                    this.setState({
                                        datas: json.data
                                    })
                                }else if (json.result >= 1000) {
                                    document.cookie = "Tonken=" + '';
                                    hashHistory.push("/My");
                                }
                            }.bind(this)
                        });
                    } else if (json.result >= 1000) {
                        document.cookie = "Tonken=" + '';
                        hashHistory.push("/My");
                    }
                }.bind(this)
            });

        } else {
            hashHistory.push("/My");
        }
    }

    handleClick(){
        function GetCookie(sName) {
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }
        this.refs.appointmentAlertBox.style.display='none';
        $.ajax({
            type: "GET",
            url: urls + "api/Order/CancelOrder?orderId=" + this.state.orderid,
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json){
                if (json.result >= 1000) {
                    document.cookie = "Tonken=" + '';
                    hashHistory.push("/My");
                }else if(json.result==1){                    
                    this.refs.appointmentAlertBox2.style.display='block';
                    let that=this;
                    setTimeout(function(){
                        that.refs.appointmentAlertBox2.style.display='none';
                        $.ajax({
                            type: "GET",
                            url: urls + "api/HomePage/GetRecommendedCourses",
                            headers: { Authorization: localStorage.getItem('Tonken') },
                            dataType: "json",
                            success: function (json) {
                                if (json.result == -2) {
                                    hashHistory.push("/")
                                } else if (json.result == 1) {
                                    /*获取订单列表*/
                                    $.ajax({
                                        type: "GET",
                                        url: urls + "api/Order/GetOrderPage?pageIndex=0&&pageSize=100",
                                        headers: { Authorization: localStorage.getItem('Tonken') },
                                        dataType: "json",
                                        success: function (json) {
                                            if (json.result == 1) {
                                                that.setState({
                                                    datas: json.data
                                                })
                                            }
                                        }.bind(that)
                                    });
                                } else if (json.result >= 1000) {
                                    document.cookie = "Tonken=" + '';
                                    hashHistory.push("/My");
                                }
                            }.bind(that)
                        });
                    },2000)
                }
            }.bind(this)
        });
       
    }
    handleClickGuan(){
        this.refs.appointmentAlertBox.style.display='none';
    }
    cancelClick = (e, orderid) =>{
        this.refs.appointmentAlertBox.style.display='block';
        this.setState({
            orderid:orderid
        })
    }

    render() {
        let dataObj = this.state.datas;
        let orderList = [];
        if (dataObj == null || dataObj.length == 0) {
            orderList.push(
                <div key="0">
                    <p className='xieyi' style={{ lineHeight: '30px',color:'#333' }}>没有订单列表</p>
                </div>
            )
        } else {
            dataObj.map((item, index) => {
                /*等待付款*/
                if (item.Status === 0) {
                    orderList.push(<div className="orderbox" key={index}>
                        <div className="orderbox-block">
                            <div className="titlebox" style={{ paddingTop: '0px' }}>
                                <span></span>
                                <h2>{item.OrderNUM}</h2>
                                <i>{item.CreateTime}</i>
                            </div>
                            <div className="ordercon">
                                <div>
                                    <span className="orderName">商品名称：{item.GoodsName}</span>
                                    <span>{item.Hours}课时</span>
                                    <span className="word-time">课时有效期：{item.ExpDay}天</span>
                                </div>
                                <div className="youhuibox">
                                    <span>原价：<i>￥{item.AmountPayable}</i></span>
                                    <span>优惠券抵现：<b>￥{item.AmountPayable - item.Prices > 0 ? (item.AmountPayable - item.Prices) : 0}</b></span>
                                </div>
                            </div>
                            <div className="payment" ref="cancel">
                                <p>实际支付：¥ {item.Prices}</p>
                                {
                                    item.IsExp==1?
                                        <div><Link to={{
                                            pathname: '/My_order/My_pay',
                                            state: {
                                                price: item.Prices,
                                                jPrice: Number(item.Coupon),
                                                /*jPrice:this.props.location.state.couponInfo[this.props.location.state.chooseC].Amount,
                                                 couponId:this.props.location.state.couponInfo[this.props.location.state.chooseC].CouponId,
                                                 goodId:this.props.location.state.goodId*/
                                                goodId: item.GoodsId,
                                                orderNUM: item.OrderNUM,
                                                CreateTime: item.CreateTime
                                            }
                                        }} className="pay btn">去支付</Link>
                                        <span className="cancel btn" onClick={(event) => this.cancelClick(event, item.OrderId)}>取消订单</span></div>:
                                        <span>已过期</span>
                                }
                            </div>
                            <div className="payment" ref="canceled" style={{ 'display': 'none' }}>
                                <p>实际支付：¥ {item.Prices}</p>
                                <span className="word-grey">已取消</span>
                            </div>
                        </div>
                    </div>)
                }
                /*已支付*/
                if (item.Status === 1) {
                    orderList.push(<div className="orderbox" key={index}>
                        <div className="orderbox-block">
                            <div className="titlebox" style={{ paddingTop: '0px' }}>
                                <span></span>
                                <h2>{item.OrderNUM}</h2>
                                <i>{item.CreateTime}</i>
                            </div>
                            <div className="ordercon">
                                <div>
                                    <span className="orderName">商品名称：{item.GoodsName}</span>
                                    <span>{item.Hours}课时</span>
                                    <span className="word-time">课时有效期：{item.ExpDay}天</span>
                                </div>
                                <div className="youhuibox">
                                    <span>原价：<i>￥{item.AmountPayable}</i></span>
                                    <span>优惠券抵现：<b>￥{item.AmountPayable - item.Prices > 0 ? (item.AmountPayable - item.Prices) : 0}</b></span>
                                </div>
                            </div>
                            <div className="payment">
                                <p>实际支付：¥ {item.Prices}</p>
                                <span>已支付</span>
                            </div>
                        </div>
                    </div>)
                }
                /*已取消*/
                if (item.Status === 2) {
                    orderList.push(<div className="orderbox" key={index}>
                        <div className="orderbox-block">
                            <div className="titlebox" style={{ paddingTop: '0px' }}>
                                <span></span>
                                <h2>{item.OrderNUM}</h2>
                                <i>{item.CreateTime}</i>
                            </div>
                            <div className="ordercon">
                                <div>
                                    <span className="orderName">商品名称：{item.GoodsName}</span>
                                    <span>{item.Hours}课时</span>
                                    <span className="word-time">课时有效期：{item.ExpDay}天</span>
                                </div>
                                <div className="youhuibox">
                                    <span>原价：<i>￥{item.AmountPayable}</i></span>
                                    <span>优惠券抵现：<b>￥{item.AmountPayable - item.Prices > 0 ? (item.AmountPayable - item.Prices) : 0}</b></span>
                                </div>
                            </div>
                            <div className="payment">
                                <p>实际支付：¥ {item.Prices}</p>
                                <span>已取消</span>
                            </div>
                        </div>
                    </div>)
                }
                /*已过期*/
                if (item.Status === 3) {
                    orderList.push(<div className="orderbox" key={index}>
                        <div className="orderbox-block">
                            <div className="titlebox" style={{ paddingTop: '0px' }}>
                                <span></span>
                                <h2>{item.OrderNUM}</h2>
                                <i>{item.CreateTime}</i>
                            </div>
                            <div className="ordercon">
                                <div>
                                    <span className="orderName">商品名称：{item.GoodsName}</span>
                                    <span>{item.Hours}课时</span>
                                    <span className="word-time">课时有效期：{item.ExpDay}天</span>
                                </div>
                                <div className="youhuibox">
                                    <span>原价：<i>￥{item.AmountPayable}</i></span>
                                    <span>优惠券抵现：<b>￥{item.AmountPayable - item.Prices > 0 ? (item.AmountPayable - item.Prices) : 0}</b></span>
                                </div>
                            </div>
                            <div className="payment">
                                <p>实际支付：¥ {item.Prices}</p>
                                <span>已过期</span>
                            </div>
                        </div>
                    </div>)
                }
            });
        }
        return (
            <div>
                {orderList}
                <Link className='xieyi' to='/My_classXieYi'>《hi翻外教课堂课程协议》</Link>
                <div className="appointmentAlertBox" ref="appointmentAlertBox">
                    <div className="appointmentAlert">
                        <p>确定要取消这个订单吗？</p>
                        <div className="appointmentAlert-btnbox">
                            <button type="button" className="appointmentAlert-cancel"
                                onClick={this.handleClickGuan.bind(this)}>取消
                                </button>
                            <button type="button" className="orange-btn appointmentAlert-suc"
                                onClick={this.handleClick.bind(this)}>确定
                                </button>
                        </div>
                    </div>
                </div>
                <div className="appointmentAlertBox" ref="appointmentAlertBox2">
                    <div className="appointmentAlert" style={{height:'2.87rem'}}>
                        <p>已取消</p>
                    </div>
                </div> 
                              
            </div>
        )
    }
}
