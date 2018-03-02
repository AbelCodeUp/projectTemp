import React, { Component } from 'react';
import Panel from './panel';
let indexBanner = require('../images/index_banner_1.png');
const IndexBanner = () => {
    return (
        <Panel>
            <div style={{textAlign:'center'}}>
                <img src={indexBanner} alt=""/>
            </div>
        </Panel>
    )
}
export default IndexBanner;