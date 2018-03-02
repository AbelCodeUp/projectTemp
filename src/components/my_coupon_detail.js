/**
 * Created by W520-1 on 2017/8/22.
 */
import React, { Component } from 'react';
export default class My_coupon_detail extends Component{
  constructor(){
    super();
  }
  componentDidMount(){
    /*console.log(this.props.detail());*/
  }
  render(){
    console.log(this.props.detail);
    return (
      <div className="bg" ref="bg">
        <div className="popUp_wrapper">
          <div className="popUp">
            <h5>优惠券详情</h5>
            <ul>
              <li><span>优惠说明：</span>{this.props.detail.Description}</li>
              <li><span>有效日期：</span>{this.props.detail.valid}</li>
              <li>
                <span>使用须知：</span>
                <p>1、请在有效期内进行使用，过期作废</p>
                <p>2、该劵兑换后直接充值到课时中，可去课时记录内查看</p>
              </li>
            </ul>
            {/*onClick={this.handleClicks.bind(this)}*/}
            <a href="javascript:0;" className="paySucBtn">确定</a>
          </div>
        </div>
      </div>
    )
  }
}
