
import React, { Component } from 'react';

let b_img = require('../images/login_r_img.png')

export default class loginRimage extends Component {
    render() {
        return (
            <div className="login_l_img">
                <img src={b_img} alt=""/>
            </div>
        )
    }
}