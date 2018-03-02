import  React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-mobile-datepicker';
export default class App extends React.Component{
//class App extends React.Component {
	state = {
		time: new Date(),
		isOpen: false,
	}

	handleClick = () => {
		this.setState({ isOpen: true });
	}

	handleCancel = () => {
		this.setState({ isOpen: false });
	}

	handleSelect = (time) => {
        this.setState({ time, isOpen: false });
        console.log(time)
	}

	render() {
		return (
			<div className="App">
				<a
					className="select-btn"
					onClick={this.handleClick}>
					select time
				</a>

				<DatePicker
					value={new Date('2017/9/14 08:00:00')}
					isOpen={this.state.isOpen}
					onSelect={this.handleSelect}
					onCancel={this.handleCancel}
                    max={new Date('2017/11/1 22:00:00')} 
                    min={new Date('2017/9/14 08:00:00')}
                    dateFormat={['M','D','h','m']}
                    />
			</div>
		);
	}
}


//ReactDOM.render(<App />, document.getElementById('react-box'));