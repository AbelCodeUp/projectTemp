import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
import PopUp from "./popUp";
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
export default class My_personCenter_base extends Component {
  constructor() {
    super();
    this.state = {
      Birthday: '',
      EName: '',
      sex: null,
      HeadImg: '',
      IsSetPwd: 0,
      Mobile: '',
      StudentId: null
    }
  }
  componentDidMount() {

    $.ajax({
      type: "GET",
      url: urls + 'api/HomePage/GetStudentInfo',
      headers: { Authorization: GetCookie('Tonken') },
      dataType: "json",
      success: function (json) {
        if (json.result == 1) {
          /*获取英文名*/
          this.refs.EName.value = (json.data.EName ? json.data.EName : null);
          
          /*获取生日*/
          if (json.data.Birthday) {
            document.getElementsByClassName('ant-input')[0].value = json.data.Birthday;
          }
          /*获取性别*/
          if (json.data.Gender == 1) {
            this.refs.Boy.checked = true;
          } else if (json.data.Gender == 0) {
            this.refs.Girl.checked = true;
          }
          this.setState({
            EName: json.data.EName,
            Birthday: json.data.Birthday.split(" ")[0],
            sex: json.data.Gender
          });
        }
      }.bind(this)
    });
  }
  /*修改英文名*/
  // handleFocus = () => {
  //   this.refs.EName.value = this.refs.EName.value;
  // }
  changeName(val) {
    var reg = new RegExp('/[a-zA-Z]+/');
    if (reg.test(this.refs.EName.value)) {
      this.setState({ EName: this.refs.EName.value })
    }
  }
  handleBirth(date1, dateString) {
    if (dateString != "") {
      this.setState({ Birthday: dateString });
    } else {
    }
  }
  handlbcxg = () => {
    let regName = /^[a-zA-Z]+$/;
    let EName=this.refs.EName.value
    if (EName == '') {
      this.setState({
        result: '英文名不能为空'
      })
      this.refs.EName.focus();
      let that = this;
      setTimeout(function () {
        document.getElementsByClassName('bg')[0].style.display = 'block';
      }, 500);
      setTimeout(function () {
        document.getElementsByClassName('bg')[0].style.display = 'none';
        /*history.go(0);*/
      }, 1500)
      return false;
    }
    if(!regName.test(EName)){
      this.setState({
        result: '英文名只能是小于20位的字母'
      })
      let that = this;
      setTimeout(function () {
        document.getElementsByClassName('bg')[0].style.display = 'block';
      }, 500);
      setTimeout(function () {
        document.getElementsByClassName('bg')[0].style.display = 'none';
        /*history.go(0);*/
      }, 1500)
      this.refs.EName.value='';
      this.refs.EName.focus();
      return false;
    }
    
    let BirthdayV = document.getElementsByClassName('ant-input')[0].value;
    let BirthdayP = document.getElementsByClassName('ant-input')[0].placeholder;
    let sexValue = $('input[name="sex"]:checked').val();
    //console.log(EName, BirthdayV, BirthdayP);
    if ((EName && BirthdayV) || (EName && BirthdayP)) {
      $.ajax({
        type: "POST",
        url: urls + "api/HomePage/UpdateStudentInfo",
        headers: { Authorization: GetCookie('Tonken') },
        dataType: "json",
        data: {
          EName: EName,
          Birthday: this.state.Birthday,
          Gender: sexValue,
          HeadImg: '',
          StudyTime: 0,
          StudyWeekTime: 0,
          StudyEnglishChannel: 0,
          IsJoinEnglishTest: 0
        },
        success: function (json) {
          if (json.result == 1) {
            this.setState({
              result: json.msg
            })
            let that = this;
            setTimeout(function () {
              document.getElementsByClassName('bg')[0].style.display = 'block';
            }, 500);
            setTimeout(function () {
              document.getElementsByClassName('bg')[0].style.display = 'none';
              /*history.go(0);*/
            }, 1500)

            /*hashHistory.push('/My_personCenter');*/
          }
          this.setState({ result: json.msg });
        }.bind(this)
      });
    }

  }
  changeValue(){
    let val = this.refs.EName.value;
    this.setState({
      EName:val
    })
  }
  render() {
    var birth = document.getElementsByClassName('ant-input')[0];
    if (!birth) {
      console.log(1);
    } else {
      document.getElementsByClassName('ant-input')[0].placeholder = this.state.Birthday;
    }
    return (
      <div>
        <ul className="myPersonCenterbox">
          <li>
            <span>英文名</span>
            <span><input style={{ position: 'relative', top: '0.35rem' }} className="EName" value={this.state.EName} maxLength='20' ref="EName" type="text" name="studentName" placeholder="请输入英文名" onBlur={(e) => this.changeName(e.target.value)} onChange={this.changeValue.bind(this)} /></span>
          </li>
          <li>
            <span>生日</span>
            <DatePicker style={{ 'float': 'right' }} onChange={this.handleBirth.bind(this)} />
          </li>
          <li>
            <span>性别</span>
            <div className="sexbox">
              <input ref="Boy" type="radio" name="sex" className="rdo" id="boy" value="1" />
              <label htmlFor="#boy">男孩</label>
              <input ref="Girl" type="radio" name="sex" className="rdo" id="girl" value="0" />
              <label htmlFor="#girl">女孩</label>
            </div>
          </li>
        </ul>
        <a className="saveBtn" onClick={this.handlbcxg}>保存</a>
        <PopUp data={this.state.result} />
      </div>
    )
  }
}
