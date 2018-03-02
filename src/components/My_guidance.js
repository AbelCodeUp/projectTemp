/**
 * Created by W520-1 on 2017/8/22.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import Canvas from './CanvasHuan';
import { hashHistory } from 'react-router';
import $ from 'jquery';

export default class My_class_hours extends Component {
      Open(){
          $('.lhb-video').slideDown('600');
          setTimeout(function(){
            $('video')[0].click();
            $('video')[0].play();
          },0)
      }
      Close(){
          $('.lhb-video').hide();
          $('video')[0].pause();
      }
      render(){
        return(
          <div>
              <a href={"http://wx.gogo-talk.com/wx/article_2.html"}>
                <div style={{padding:'3% 3.7%',overflow:'hidden',borderBottom:'1px solid #ccc',background:'#fff'}} >
                  <img src="../images/lhb-reading.png" style={{width:'2.5rem',height:'2rem',float:'left'}}/>
                  <div style={{float:'left',marginLeft:'0.4rem',fontSize:'18px',color:'#0D0101'}}>新学员入学须知</div>
                </div>
              </a>
            <div style={{padding:'3% 3.7%',overflow:'hidden',borderBottom:'1px solid #ccc',background:'#fff'}} onClick={this.Open.bind(this)}>
              <img src="../images/lhb-tiyan.png" style={{width:'2.5rem',height:'2rem',float:'left'}}/>
              <div style={{float:'left',marginLeft:'0.4rem'}}>
                <div style={{fontSize:'18px',color:'#0D0101'}}>体验课约课流程</div>
                <div style={{marginTop:'0.7rem',fontSize:'14px',color:'#2B8EEF'}} ><img src="../images/lhb-play.png" alt="" style={{width:'0.6rem',marginRight:'0.2rem'}}/>立即播放</div>
              </div>
            </div>
            <div className="lhb-video" style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,1)',display:'none'}} >
              <video controls src="http://o2mzy.gogo-talk.com/H5/mp4/lhb-lc.mp4" style={{width:'100%',height:'100%'}} >

              </video>
              <span style={{position:'absolute',top:'0.2rem',right:'0.6rem',fontSize:'40px',color:'#fff',fontWeight:'600'}} onClick={this.Close.bind(this)}>×</span>
            </div>
          </div>
          )
      }
      
}
