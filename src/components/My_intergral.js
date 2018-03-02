/**
 * Created by W520-1 on 2017/8/21.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
export default class My_intergral extends Component {
  constructor() {
    super();
    this.state = {
      isShow4: false,
      jifenTip: '',
      totalPoints: '',
      num:0
    }
  }
  componentDidMount() {
    /*获取学生总积分*/
    $.ajax({
      type: "GET",
      url: urls + `api/HomePage/GetStudentAllScore?num=${Math.random()}`,
      headers: { Authorization: localStorage.getItem('Tonken') },
      dataType: "json",
      success: function (json) {
        if (json.result == 1) {
          this.setState({ totalPoints: json.data[0] ,num:Math.floor(json.data[0]/300)});
        } else {
          this.setState({ totalPoints: 0 ,num: 0 });
        }
      }.bind(this)
    });
  }
  minClick(){
    let zong=this.state.num;
    if(zong==0){
      return
    }else{
      zong--;
      this.setState({
        num:zong
      })
    }
  }
  maxClick(){
    let zong=this.state.num;
    if(zong==Math.floor(this.state.totalPoints/300)){
      return
    }else{
      zong++;
      this.setState({
        num:zong
      })
    }
  }
  DuiHuanSuc() {/*是否能够积分兑换*/
    $.ajax({
      type: "POST",
      url: urls + `api/GiveCouponIntegral/Exchange?LessonNum=${this.state.num}`,
      headers: { Authorization: localStorage.getItem('Tonken') },
      dataType: "json",
      success: function (json) {
        if (json.result == 1) {
          this.setState({
            isShow4: true,
            jifenTip: json.msg
          });
          let that = this;
          setTimeout(function () {
            document.getElementsByClassName('bg')[0].style.display = 'block';
          }, 500);
          setTimeout(function () {
            document.getElementsByClassName('bg')[0].style.display = 'none';
            that.setState({
              isShow4: false,
              jifenTip: ''
            })
            location.reload(true);
          }, 1500)
        } else {
          this.setState({
            isShow4: true,
            jifenTip: json.msg
          });
          let that = this;
          setTimeout(function () {
            document.getElementsByClassName('bg')[0].style.display = 'block';
          }, 500);
          setTimeout(function () {
            document.getElementsByClassName('bg')[0].style.display = 'none';
            that.setState({
              isShow4: false,
              jifenTip: ''
            })
          }, 1500)
        }
      }.bind(this)
    });

  }
  render() {
    let tanceng = this.state.isShow4?{display:'block'}:{display:'none'};
    //let btnColor = this.state.totalPoints>=300? {background:"#f60"}:{background:'#ccc',cursor:'not-allowed'}
    return (
      <div>
        <div className="integralbox">
          <p><i className="iconfont">&#xe658;</i>{this.state.totalPoints} <span>积分</span></p>
          <ul>
            <li>
              <Link to={"/My_intergral/My_intergral_detail/"+this.props.params.id}>积分明细</Link>
            </li>
            <li>
              <Link to={"/My_intergral/My_intergral_how/"+this.props.params.id}>如何获取？</Link>
            </li>
            <li>
              <Link to={"/My_intergral/My_intergral_rules/"+this.props.params.id}>积分规则</Link>
            </li>
          </ul>
        </div>
        <div className="intergralbox_bottom">
          <div className="intergralbox_bottom_bg">
            <div style={{fontSize:'18px',textAlign:'center',color:'#ff6600',marginTop:'0.5rem'}}>兑换课时</div>
            <div style={{fontSize:'14px',textAlign:'center',color:'#999',marginTop:'0.5rem'}}>300积分可以兑换一课时哦！</div>
            <div style={{display:'flex',justifyContent:'center',textAlign:'center',marginTop:'0.74rem',fontSize:'16px'}}>
                  {this.state.num == 0 ? 
                    <div className="min1" style={{width:'1.5rem',height:'1.5rem',border:'1px solid #ccc',paddingTop:'0.35rem',backgroundSize:'cover'}} ></div>:
                    <div className="min2" style={{width:'1.5rem',height:'1.5rem',border:'1px solid #ccc',paddingTop:'0.35rem',backgroundSize:'cover'}} onClick={this.minClick.bind(this)}></div>
                  }
                <div style={{width:'3rem',height:'1.5rem',borderTop:'1px solid #ccc',borderBottom:'1px solid #ccc',color:'#ff6600',paddingTop:'0.38rem'}}><span ref="keshi">{this.state.num}</span>课时</div>
                   {this.state.totalPoints < 300 || this.state.num == Math.floor(this.state.totalPoints/300)? 
                    <div className="add1" style={{width:'1.5rem',height:'1.5rem',border:'1px solid #ccc',backgroundSize:'cover'}}></div>:
                    <div className="add2" style={{width:'1.5rem',height:'1.5rem',border:'1px solid #ccc',backgroundSize:'cover'}} onClick={this.maxClick.bind(this)}></div>
                    }
                  
            </div>
          </div>
          <div className="inter_btn">
            {
              this.state.num == 0?
                <button className="my_pointer_btn" style={{background:'#ccc',cursor:'not-allowed'}} >立即兑换</button>
              :
              <button className="my_pointer_btn" style={{background:"#f60"}} onClick={this.DuiHuanSuc.bind(this)}>立即兑换</button>
            }
            
          </div>
        </div>
        <div className="bg" style={tanceng}>
          <div className="popUp_wrapper">
            <div className="popUp exchange_success">
              <h5>{this.state.jifenTip}</h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
