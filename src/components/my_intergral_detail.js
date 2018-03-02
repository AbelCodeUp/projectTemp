/**
 * Created by W520-1 on 2017/8/21.
 */
import React, { Component } from 'react';
import $ from 'jquery';
export default class my_intergral_detail extends Component {
  constructor() {
    super();
    this.state = {
      jifenArr: [],
      jifenTip: '',
      current: 1,
      total: 0,
      pageSize: 100,
      isPagination: true
    }
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
    $.ajax({
      type: "GET",
      url: urls + `api/HomePage/GetScoreList?pageIndex=${this.state.current}&pageSize=${this.state.pageSize}`,
      headers: { Authorization: localStorage.getItem('Tonken') },
      dataType: "json",
      success: function (json) {
        if (json.result == 1) {
          this.setState({
            jifenArr: json.data,
            total: json.TotalCount
          })
          if (this.state.total <= 10) {
            this.setState({
              isPagination: false
            })
          }
        }
      }.bind(this)
    });

  }
  render() {
    console.log(this.state.jifenArr);
    return (
      <div className="classHourbox" style={{paddingBottom:'0px'}}>
        <div className="titlebox">
          <span></span>
          <h2>积分明细</h2>
        </div>
        <ul className="myNavListbox">
          {this.state.jifenArr.map((item, index) => {
            return (
              <li key={index}>
                <span className="word-width">{item.SourceName}</span>
                <span>{item.Types === 1 ? "+" + item.Points + "积分" : "-" + item.Points + "积分"}</span>
                <span className="word-time">{item.CreateTime}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
