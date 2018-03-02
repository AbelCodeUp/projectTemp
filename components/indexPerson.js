import React, { Component } from 'react';
import Panel from './panel';
export default class indexPerson extends Component{
    constructor() {
        super();
        this.state = {
            pimg:'default.png',
            username:'Runsun',
            sex: 1,
            age:'25',
            hh:'18',
            chidao:'4',
            zong:'35',
            que:'0',
            sheng:'20'
        };
    };
    componentDidMount() {
        fetch("http://learnapi.gogo-talk.com:8082/api/Register/GetImageUrl",
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => {
                if(json.res == 1){
                    // this.setState({
                    //     codeUrl:json.data
                    // })
                }
                    
            })
    }
    render () {
        return (
            <Panel>
                <ul className="index_panel_person_box">
                    <li>
                        <div className="i_b_img">
                            <img src={this.state.pimg} alt=""/>
                        </div>
                        <div className="i_b_p_text">
                            <span>{this.state.username}</span>
                            <span>{ this.state.sex == 1 ? '男' : '女'}</span>
                            <span>{this.state.age}岁</span>
                        </div>
                    </li>
                    <li>
                        小红花 {this.state.hh}
                    </li>
                    <li>
                        积分 { this.state.zong }
                    </li>
                </ul>
            </Panel>   
        )
    }
}