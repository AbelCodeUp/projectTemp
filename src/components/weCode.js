import React, { Component } from 'react';
import { Link ,  hashHistory} from 'react-router';
require('../styles/LoginWeCode.css');
/* login 二维码扫码登录右侧组件 */
export default class weCode extends Component {
    constructor() {
        super();
        this.state = {
            codeUrl: 'string',
            randomNuber: null
        };
    };
    componentDidMount() {
        fetch("http://learnapi.gogo-talk.com:8082/api/Register/GetImageUrl",
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => {
                if(json.res == 1){
                    this.setState({
                        codeUrl:json.data,
                        randomNuber : json.randomNuber
                    })
                    hashHistory.push('/Main/Index');
                    // let testTimer = setInterval(() => {
                    //     fetch("http://learnapi.gogo-talk.com:8082/api/Register/GetOpenId?RandomNuber="+this.state.randomNuber,
                    //     {
                    //         method: "GET"
                    //     })
                    //     .then(res => res.json())
                    //     .then(json => {
                    //         window.localStorage.setItem('openId',json.openid)
                    //         if(json.res == 1){
                    //             clearInterval(testTimer);
                    //             hashHistory.push('/Register');
                    //         }
                            
                    //     })
                    // },1000);
                }
                    
            })
    }
    render() {
        return (
            <div className="login_code_box">
                <div className="code_img">
                   <img src={this.state.codeUrl} alt=""/> 
                </div>
                <div className="code_b_text">
                    微信扫码快速/登录
                </div>
                <ul className="login_btn_box">
                    <li>
                        <Link to="/PwdLogin">密码登录</Link>
                    </li>
                    <li>
                        <Link to="/CodeLogin">验证码登录</Link>
                    </li>
                </ul>
            </div>
        )
    }
}