import React,{Component} from 'react';
export default class PopUp extends Component{
  constructor(){
    super();
  }
  render(){
    return (
      <div className="bg">
        <div className="popUp_wrapper">
          <div className="popUp exchange_success">
            <h5>{this.props.data}</h5>
          </div>
        </div>
      </div>
    )
  }
}
