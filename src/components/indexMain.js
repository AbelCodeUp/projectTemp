import React, { Component } from 'react';
import IndexPerson from './indexPerson';
import IndexBanner from './indexBanner';
import IndexDshang from './indexDshang';
import IndexSuccess from './indexSuccess';


export default class IndexMain extends Component {
    constructor() {
        super();
        this.state = {
            isBuy:1
        };
    }
    componentDidMount() {
        fetch("http://learnapi.gogo-talk.com:8082/api/Register/GetImageUrl",
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => {
                if(json.res == 1){
                    this.setState({
                            isBuy:2
                        })
                    
                }
                    
            })
    }
    render() {
        return (
            <div>
                <IndexPerson />
                {
                    this.state.isBuy == 1 ?
                    <IndexBanner />
                    :
                    <div>
                        <IndexDshang />
                        <IndexSuccess />
                    </div>
                    
                }
                
            </div>
        )
    }
}