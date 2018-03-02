import React, { Component } from 'react';
import Panel from './panel';
import LessonItemUdone from './LessonItemUdone';

export default class indexDshang extends Component {
    constructor() {
        super();
       
    }
    componentDidMount() {
        fetch("http://learnapi.gogo-talk.com:8082/api/Register/GetImageUrl",
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => {
                if (json.res == 1) {
                    // this.setState({
                    //     codeUrl:json.data
                    // })
                }

            })
    }
    render() {
        return (
            <Panel>
                <div className="">
                    <h3 className="index_panel_title">
                        待上课（<span></span>）
                    </h3>
                    <ul className="index_panel_daishang_box index_panelbox">
                        <li>
                            <LessonItemUdone />
                        </li>
                    </ul>
                </div>
            </Panel>
        )
    }
}