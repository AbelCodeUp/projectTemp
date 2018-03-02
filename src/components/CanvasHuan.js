import React, { Component } from 'react';

import $ from 'jquery';
// 倒计时 for react
export default class CanvasHuan extends React.Component {
    // 定义属性
    static propTypes = {
        onStep: React.PropTypes.func,
        onComplete: React.PropTypes.func,
        value: React.PropTypes.number,
        step: React.PropTypes.number
    }


    //这里面的操作可以移动到componentWillMount()里面去
    constructor(...pa) {
        super(...pa);
        this.drawCricle = this.drawCricle.bind(this);

    }

    drawCricle(cObj, sum, du) {
        //画进度外环
        cObj.beginPath();
        cObj.fillStyle = '#fe6402';
        cObj.moveTo(35, 35);
        cObj.arc(35, 35, 35, -90 * Math.PI / 180, (Math.ceil(du * (360 / sum)) - 90) * Math.PI / 180);
        cObj.strokeStyle = "#ccc";
        cObj.stroke();
        cObj.closePath();
        cObj.fill();

        //内环
        cObj.beginPath();
        cObj.moveTo(35, 35);
        cObj.fillStyle = '#fff';
        cObj.arc(35, 35, 25, 0, 360 * Math.PI / 180);
        cObj.strokeStyle = "#ccc";
        cObj.stroke();
        cObj.closePath();
        cObj.fill();
    }

    start(obj, sum, process) {
        var num = 0;
        let that = this
        var t = setInterval(function () {
            if (num == process) {
                that.drawCricle(obj, sum, num);
                clearInterval(t);
                return false;
            }
            num++;
            if (num == process) {
                clearInterval(t);
            }
            that.drawCricle(obj, sum, num);
        }, 6)
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
            url: urls + "api/Lesson/GetClassHour",
            headers: { Authorization: localStorage.getItem('Tonken')},
            dataType: "json",
            success: function (json) {
                if (json.result == 1) {
                    const newUser = json.data;
                    var c = document.getElementById('process');
                    var cObj = c.getContext('2d');

                    cObj.beginPath();
                    cObj.moveTo(35, 35);
                    cObj.fillStyle = '#ccc';
                    cObj.arc(35, 35, 35, 0, 360 * Math.PI / 180);
                    cObj.closePath();
                    cObj.fill();

                    /*this.start(cObj,100,30);*/
                    this.start(cObj, parseInt(newUser.usedClasshour) + parseInt(newUser.StudentTimeCount), newUser.StudentTimeCount);

                }
            }.bind(this)
        });


    }
    render() {
        return (<canvas id="process" width="70" height="70" ></canvas>)
    }
}
