/**
 * Created by W520-1 on 2017/8/21.
 */
import React, { Component } from 'react';
export default class My_intergral_rules extends Component{
  render(){
    return (
        <div className="classHourbox">
          <div className="titlebox">
            <span></span>
            <h2>积分规则</h2>
          </div>
          <div className="rulesbox">
            <h2>一、获取规则</h2>
            <p>1. 首次分享“邀请好友”页面到朋友圈，可获得225积分；</p>
            <p>2. 每次课后完成课后评价，可获得5积分；课后评价成功后分享到朋友圈可再次获得10积分；</p>
            <p>3. 通过邀请函邀请好友购买4课时套餐，且完成首次上课，可获得225积分；好友购买30课时套餐、60课时套餐或120课时套餐，且完成首次上课，可获得1125积分（邀请的朋友每次购买课时套餐，均可获赠相应积分）。</p>
            </div>
          <div className="rulesbox">
            <h2>二、兑换规则</h2>
            <p>1. 积分兑换课时：300积分可兑换1课时；</p>
            <p>2. 积分兑换其他物品：以具体的积分兑换活动规则为准；</p>
            <p>3. 积分不能折现、不能转送其他用户；积分兑换的课时或其他物品也不能折现、不能再次转换为积分。</p>
          </div>
        </div>
    )
  }
}
