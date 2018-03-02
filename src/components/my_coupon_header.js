/**
 * Created by W520-1 on 2017/8/22.
 */
import React, { Component } from 'react';
import {Link} from 'react-router';
export default class My_coupon_header extends Component{
  constructor(){
    super();
  }
  handleClick=(e)=>{
   /* console.log(e.target.parentNode.getAttribute('href'));
    console.log(e.target.parentNode.nextSibling);*/
    let tagA=e.target.parentNode;
    let tagDiv=e.target.parentNode.nextSibling;
    console.log(tagA, tagDiv);
    let list=document.getElementsByClassName('coupon-line');
    for(let i=0;i<list.length;i++){
      if(tagA.getAttribute('href')==location.hash){
        console.log(1,tagA.getAttribute('href'),location.hash);
        list[i].style.display='block';
        console.log(document.getElementsByClassName(tagDiv.className)[0].style.display);
        //document.getElementsByClassName(tagDiv.className)[0].style.display="block";
      }else{
        list[i].style.display='none';
      }
    }
  }
  render(){
    return (
      <div>
        <ul className="couponHead" onClick={(event)=>this.handleClick(event)}>
          <li>
            <Link to="/My_coupon_noUsed"><p>未使用(2)</p></Link>
            <div className="coupon-line coupon-line1" style={{display:'block'}}></div>
          </li>
          <li>
            <Link to="/My_coupon_hasUsed"><p>已使用(3)</p></Link>
            <div className="coupon-line coupon-line2"></div>
          </li>
          <li>
            <Link to="/My_coupon_expired"><p>已过期</p></Link>
            <div className="coupon-line coupon-line3"></div>
          </li>
        </ul>
      </div>
    )
  }
}
