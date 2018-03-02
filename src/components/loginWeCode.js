require('../styles/LoginWeCode.css');

import React, { Component } from 'react';
import { Link } from 'react-router';
import loginCode from './loginCodeForm';
import WeCode from './weCode';


let b_img = require('../images/login_r_img.png')

const loginWeCode = () => {
    return (
        <div className="login_c_box">
            <div className="login_c_c">
                <div className="login_l_img fl">
                    <img src={b_img} alt="" />
                </div>
                <div className="fr">
                    {
                        this.props.children
                    }
                </div>
            </div>
        </div>
    )
}

export default loginWeCode;