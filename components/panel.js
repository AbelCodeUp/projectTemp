import React, { Component } from 'react';

export default class Panel extends Component{
    render () {
        let panelStyle = {
            background:'#fff',
            border:'1px solid #ccc',
            borderTop:'6px solid #c40016',
            width:'100%',
            position:'relative',
            marginBottom:'20px'
        }
        return (
            <div className="b_panel" style={panelStyle}>
                {this.props.children}
            </div>
        )
    }
}