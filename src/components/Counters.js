import React, { Component } from 'react';
// 倒计时 for react
export default class Counters extends React.Component {
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
        this.initValue = this.props.value || 59;
        this.initM = this.props.m || 0;
        this.state = { count: this.initValue, mCount: this.initM };
        this.interval = 0;
        this.step = this.props.step || 1;
    }

    stop() {
        clearInterval(this.interval);
    }

    start() {
        this.stop();
        this.interval = setInterval(() => {
            var count = this.state.count - this.step;
            var countM = this.state.mCount;
            if (this.props.onStep) {
                this.props.onStep(count);
            }
            if (count == -1) {
                countM = this.state.mCount - this.step;
                count = 59
                if (countM == -1){
                    this.props.onComplete && this.props.onComplete();
                    this.stop();
                }

            } //else {
            //     this.setState({ count:count,mCount: countM});
            // }
            this.setState({ count:count,mCount: countM});

        }, 1000);
    }

    restart() {
        this.stop();
        this.setState({ count: this.initValue , mCount: this.initM});
        this.start();
    }
    componentDidMount() {
        this.start();
    }
    componentWillUnmount() {
        this.stop();
    }

    render() {
        return (<span>{this.state.count}</span>)
    }
}