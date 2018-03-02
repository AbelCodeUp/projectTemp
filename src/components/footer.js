import React, { Component } from 'react';
import { Link,hashHistory } from 'react-router';
import $ from 'jquery';
import store from '../redux/store';
import actions from '../redux/actions';
export default class Footer extends Component {
    constructor() {
        super();
        this.state = {
            nums: "1",
            isTiyan: null,
            isShows: store.getState().isShow,
            shareNum: store.getState().shareNum
        }
    }
    componentWillMount() {
        $.ajax({
            type: "GET",
            url: urls + `api/Lesson/IsOfficial`,//判断是否是正式学员，0为体验，1为正式
            headers: { Authorization: localStorage.getItem('Tonken') },
            dataType: "json",
            success: function (json) {
                if (json.result >= 1000) {
                    hashHistory.push("/My");
                } else {
                    this.setState({
                        isTiyan: json.result
                    })
                }
            }.bind(this)
        });

    //判断是否有积分可以领取
    $.ajax({
        type: "GET",
        url: urls + `api/HomePage/IsShowIntegral`,//判断是否是正式学员，0为体验，1为正式
        headers: { Authorization: localStorage.getItem('Tonken') },
        dataType: "json",
        success: function (json) {
            if (json.result == 1) {
                 actions.ChangeYou(true,json.total);
            }else if(json.result == 0 ){
                actions.ChangeYou(false,json.total);
            }
            this.setState({
                isShows : store.getState().isShow,
                shareNum: store.getState().shareNum
            })

        }.bind(this)
    });
    }
    handleClickFirst() {
        // this.setState({
        //     nums:"1"
        // })
        // if(this.state.nums=="1"){
        //     this.refs.shouye.src="../images/shouyeyi.png";
        //     this.refs.colorsOne.style.color="#47A8EE";
        // }
        // if(this.state.nums=="2"){
        //     this.refs.kebiao.src="../images/kebiaoyi.png";
        //     this.refs.colorsTwo.style.color="#47A8EE";
        // }
        // if(this.state.nums=="3"){
        //     this.refs.wode.src="../images/myyi.png";
        //     this.refs.colorsThree.style.color="#47A8EE";
        // }
    }
    handleClickSecond() {
        // this.setState({
        //     nums:"2"
        // })
        // if(this.state.nums=="1"){
        //     this.refs.shouye.src="../images/shouyeyi.png";
        //     this.refs.colorsOne.style.color="#47A8EE";
        // }
        // if(this.state.nums=="2"){
        //     this.refs.kebiao.src="../images/kebiaoyi.png";
        //     this.refs.colorsTwo.style.color="#47A8EE";
        // }
        // if(this.state.nums=="3"){
        //     this.refs.wode.src="../images/myyi.png";
        //     this.refs.colorsThree.style.color="#47A8EE";
        // }
        // alert(this.state.nums)
    }
    handleClickThired() {
        // this.setState({
        //     nums:"3"
        // })
        // if(this.state.nums=="1"){
        //     this.refs.shouye.src="../images/shouyeyi.png";
        //     this.refs.colorsOne.style.color="#47A8EE";
        // }
        // if(this.state.nums=="2"){
        //     this.refs.kebiao.src="../images/kebiaoyi.png";
        //     this.refs.colorsTwo.style.color="#47A8EE";
        // }
        // if(this.state.nums=="3"){
        //     this.refs.wode.src="../images/myyi.png";
        //     this.refs.colorsThree.style.color="#47A8EE";
        // }
    }
    componentDidMount() {
        // if(this.state.num==null){
        //
        // }else{
        if (this.props.num == "1") {
            this.refs.shouye.src = "../images/shouyeyi.png";
            this.refs.colorsOne.style.color = "#47A8EE";
        }
        if (this.props.num == "2") {
            this.refs.kebiao.src = "../images/kebiaoyi.png";
            this.refs.colorsTwo.style.color = "#47A8EE";
        }
        if (this.props.num == "3") {
            this.refs.wode.src = "../images/myyi.png";
            this.refs.colorsThree.style.color = "#47A8EE";
        }
        // }
    }

    render() {
        let appoint = this.state.isTiyan == 0 ? "/My_appointmentTY" : "/My_appointment";
        
        return (
            <div className="footBox" style={{ position: 'absolute', left: '0px', bottom: '0px' }}>
                <ul>
                    <li className="foot-active">
                        <Link to="/" onClick={this.handleClickFirst.bind(this)}>
                            <p><img ref="shouye" className="tubiao" src="../images/shouyewei.png" alt="" /></p>
                            <p ref="colorsOne" className="colors">首页</p>
                        </Link>
                    </li>
                    <li style={{position:'relative'}}>
                        <Link to={appoint} onClick={this.handleClickSecond.bind(this)}>
                            <p><img ref="kebiao" style={{ marginBottom: "6px" }} className="tubiao" src="../images/kebiaowei.png" alt="" />
                            </p>
                            <p ref="colorsTwo" className="colors" style={{ position: 'relative', top: '-5px' }}>课表</p>
                            {
                                this.state.isShows?<div style={{position:'absolute',top:'0.2rem',left:'1.9rem',width:'0.4rem',height:'0.4rem',textAlign:'center',lineHeight:'0.4rem',borderRadius:'100%',backgroundColor:'red',color:'#fff'}}>{this.state.shareNum}</div>:''
                            }
                        </Link>
                    </li>
                    <li>
                        <Link to="/My" onClick={this.handleClickThired.bind(this)}>
                            <p><img ref="wode" className="tubiao" src="../images/mywei.png" alt="" /></p>
                            <p ref="colorsThree" className="colors">我的</p>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

