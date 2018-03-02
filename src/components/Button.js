import React, { Component } from 'react';
export default class Button extends Component{
    render () {
        let comStyle = {
            background:'#ff6600',
            color:'#fff',
            borderRadius:'20px',
            textAlign:'center',
            lineHeight:'40px',
            outline:'none',
            display:'inline-block',
            border: '1px solid transparent',
            whiteSpace: 'nowrap',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            MsUserSelect: 'none',
            userSelect: 'none',
            cursor:'pointer',
            margin:'0 0 0 10px'
        }
        let big_style = {
            height:'40px',
            padding:'0 40px',
            ...comStyle
        }
        let small_style = {
            height:'40px',
            padding:'0 20px',
            ...comStyle
        }
        let prop = this.props.type;
        let btnStyle = prop == 'big' ? big_style : small_style;
        return (
            <button type="button" style={btnStyle}>{this.props.text}</button>
        )
    }
}