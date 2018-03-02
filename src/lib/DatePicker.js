/**
 * @module DatePicker Component
 */

import React, { Component, PropTypes } from 'react';
import DatePickerItem from './DatePickerItem.js';
import PureRender from './pureRender.js';
import { convertDate, nextDate } from './time.js';

/**
 * Class DatePicker Component Class
 * @extends Component
 */
class DatePicker extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: nextDate(this.props.value),
            neirong:null,
            data: '',
            lessonId: '',
            lessonIds: '',
            isSuc: false,
            isYue: false,
            dateArr: [],
            isActive: 0,
            levels: null,
            FileTittles: null,
            Describes: null,
            StartTimes: null,
            imgUrl: null,
            dateAr:[],
            demandid:null,
            bool:0,
            yuekeshijian:null,

            timess:null
        };

        this.handleFinishBtnClick = this.handleFinishBtnClick.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // update value of state
        const date = nextDate(nextProps.value);
        if (date.getTime() !== this.state.value.getTime()) {
            this.setState({ value: date });
        }
    }

    /**
     * Optimization component, Prevents unnecessary rendering
     * Only props or state change or value before re-rendering
     *
     * @param  {Object} nextProps next props
     * @param  {Object} nextState next state
     * @return {Boolean}          Whether re-rendering
     */
    shouldComponentUpdate(nextProps, nextState) {
        const date = nextDate(nextState.value);
        return date.getTime() !== this.state.value.getTime() ||
                PureRender.shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }

    /**
     * 点击完成按钮事件
     * @return {undefined}
     */

    handleFinishBtnClick() {
        let timers=`2017-${this.refs.dateHeader.innerHTML.substring(0,2)}-${this.refs.dateHeader.innerHTML.substring(3,5)} ${this.refs.dateHeader.innerHTML.substring(6)}`;
        this.setState({
            timess:timers
        });
        this.props.bba(this,timers);
        this.refs.abc.parentNode.style.display='block';
        console.log(timers);
        this.props.onSelect(this.state.value);
        function GetCookie(sName) {
            let aCookie = document.cookie.split("; ");
            for (let i = 0; i < aCookie.length; i++) {
                let aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                    return unescape(aCrumb[1]);
            }
            return null;
        }

        // if (this.state.bool==0) {
        let ret = {};//定义数组
        location.href.substring(location.href.lastIndexOf("?") + 1).replace(/([\w\-\u4E00-\u9FA5\%]+)=([\w\-\u4E00-\u9FA5\%]+)/ig, function (a, b, c) {
            ret[b] = unescape(c);
        });
        fetch(urls+`api/Demands/ReserveLessonRoom?LessonTime=${timers}&BookingId=${ret.bid}&BDEId=${ret.uid}`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    , 'Authorization': GetCookie('Tonken')
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.result == 1) {
                    this.refs.abc.style.display='block';
                    this.refs.shengyuks.style.display='block';
                    this.refs.tishi.innerHTML=json.msg;

                    fetch(urls+`api/Demands/ClassBookDetails?BdeId=${ret.uid}&BookingId=${ret.bid}`,
                        {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                                , 'Authorization': GetCookie('Tonken')
                            }
                        })
                        .then(res => res.json())
                        .then(json => {
                            console.log(json);
                            if(json.result==1){
                                this.setState({
                                    levels: json.data[0].LevelName,
                                    FileTittles: json.data[0].FileTittle.substring(json.data[0].FileTittle.indexOf("L")),
                                    Describes: json.data[0].Describe,
                                    StartTimes: json.data[0].StartTime.substring(json.data[0].StartTime.indexOf("-")+1),
                                    imgUrl: json.data[0].FilePath,
                                    demandid:json.data[0].DemandId,
                                    yuekeshijian:json.data[0].StartTime
                                });
                                // location.href=`${location.href}&levela=${this.state.levels}&FileTittles=${this.state.FileTittles}&Describes=${this.state.Describes}&StartTimes=${this.state.StartTimes}&imgUrl=${this.state.imgUrl}&demandids= ${this.state.demandid}&yuekeshijian=${this.state.yuekeshijian}`
                            }
                        })

                }else if(json.result == -3){
                    this.refs.abc.style.display='block';
                    this.refs.shengyuks.style.display="block";
                    // this.refs.appointmentAlertBox.style.display="none";
                    this.setState({
                        neirong:"未购买"
                    });
                }else if(json.result == -2){
                    this.refs.abc.style.display='block';
                    this.refs.shengyuks.style.display="block";
                    // this.refs.appointmentAlertBox.style.display="none";
                    this.setState({
                        neirong:"已过期"
                    });
                }else if(json.result == -4){
                    this.refs.abc.style.display='block';
                    this.refs.shengyuks.style.display="block";
                    // this.refs.appointmentAlertBox.style.display="none";
                    this.setState({
                        neirong:"剩余课时已被占用"
                    });
                }else if(json.result == -1){
                    this.refs.abc.style.display='block';
                    this.refs.shengyuks.style.display="block";
                    // this.refs.appointmentAlertBox.style.display="none";
                    this.setState({
                        neirong:"课时不足"
                    });
                }
            })
        // }

    }


    ykClick(){
        this.refs.shengyuks.style.display="none";
        this.refs.abc.parentNode.style.display="none";
        history.go(0)
    }
    /**
     * 选择下一个日期
     * @return {undefined}
     */
    handleDateSelect(value) {
        this.setState({ value });
    }

    /**
     * render函数
     * @return {Object} JSX对象
     */
    render() {
        const { min, max, theme, dateFormat, confirmText, cancelText, showFormat } = this.props;
        console.log(dateFormat);
        const value = this.state.value;
        const themeClassName =
            ['default', 'dark', 'ios', 'android', 'android-dark'].indexOf(theme) === -1 ?
            'default' : theme;

        return (
            <div ref="abc">
                <div className={`datepicker ${themeClassName}`}>
                    <div className="datepicker-header" ref="dateHeader">{convertDate(value, showFormat)}</div>
                    <div className="datepicker-content">
                        {dateFormat.map((format, index) => (
                            <DatePickerItem
                                key={index}
                                value={value}
                                min={min}
                                max={max}
                                format={format}
                                onSelect={this.handleDateSelect}
                            />
                        ))}
                    </div>
                    <div className="datepicker-navbar">
                        <a
                            className="datepicker-navbar-btn"
                            onClick={this.handleFinishBtnClick.bind(this)}>{confirmText}</a>
                        <a
                            className="datepicker-navbar-btn"
                            onClick={this.props.onCancel}>{cancelText}</a>
                    </div>
                </div>
                <div className="appointmentAlertBox" ref="shengyuks">
                    <div className="appointmentAlert">
                        <p ref="tishi">{this.state.neirong}</p>
                        <div className="appointmentAlert-btnbox">
                            <button type="button" style={{margin: '0 auto'}} className="orange-btn appointmentAlert-suc"
                                    onClick={(e) => this.ykClick(e)}>确定
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
 }

DatePicker.propTypes = {
    theme: PropTypes.string,
    value: PropTypes.object,
    min: PropTypes.object,
    max: PropTypes.object,
    dateFormat: PropTypes.array,
    showFormat: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
};

export default DatePicker;
