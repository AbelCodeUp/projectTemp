import React,{Component} from 'react';
import {Link} from 'react-router';
export default class My_personCenter extends Component{
  constructor(){
    super();
  }
  render(){
    return (
      <div>
        <ul className="myNavListbox">
          <li>
            <Link to="/My_personCenter/My_personCenter_base"><i className="iconfont" style={{"fontSize": "16px"}}>&#xe614;</i>基本信息<span><i className="iconfont">&#xe64a;</i></span></Link>
          </li>
          <li>
            <Link to="/My_personCenter/My_personCenter_changePs"><i className="iconfont" style={{"fontSize":"20px"}}>&#xe644;</i>修改密码<span><i className="iconfont">&#xe64a;</i></span></Link>
          </li>
          <li style={{"border":"0px"}}>
            <Link to="/My_personCenter/My_personCenter_changePhone1"><i className="iconfont">&#xe687;</i>修改手机号<span><i className="iconfont">&#xe64a;</i></span></Link>
          </li>
        </ul>
      </div>
    )
  }
}
