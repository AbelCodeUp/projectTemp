/**
 * Created by Administrator on 2017/9/4.
 */
/**
 * @module DatePicker Component
 */

import React, { Component, PropTypes } from 'react';
import DatePickerItem from '../lib/DatePickerItem.js';
import PureRender from '../lib/pureRender.js';
import { convertDate, nextDate } from '../lib/time.js';

/**
 * Class DatePicker Component Class
 * @extends Component
 */
export default class MyAppointment extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: nextDate(this.props.value),
            dateheader:null
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
        this.setState({
            dateheader:this.refs.dateHeader.value
        })
        alert(1);
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
        fetch(urls+`api/Demands/ReserveLessonRoom?LessonTime=${this.state.dateheader}&BookingId=${ret.bid}&BDEId=${ret.uid}`,
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
                    // this.refs.yuyueshijian.innerHTML = "已预约课程：";
                    // this.setState({
                    //     bool:1
                    // })
                // }else {
                    // this.refs.yuyuebtn.innerHTML = "取消预约";
                // }
                // if(json.result==-3){

                }
            })
        // }
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
        // console.log(showFormat);
        const value = this.state.value;
        const themeClassName =
            ['default', 'dark', 'ios', 'android', 'android-dark'].indexOf(theme) === -1 ?
                'default' : theme;

        return (
            <div
                className={`datepicker ${themeClassName}`}>
                <div className="datepicker-header" ref="dateHeader">{convertDate(value, showFormat)}</div>
                <div className="datepicker-content">
                    {dateFormat.map((format, index) => (
                        <DatePickerItem
                            key={index}
                            value={value}
                            min={min}
                            max={max}
                            format={format}
                            onSelect={this.handleDateSelect} />
                    ))}
                </div>
                <div className="datepicker-navbar">
                    <a
                        className="datepicker-navbar-btn"
                        onClick={this.handleFinishBtnClick}>{confirmText}</a>
                    <a
                        className="datepicker-navbar-btn"
                        onClick={this.props.onCancel}>{cancelText}</a>
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

// export default DatePicker;
