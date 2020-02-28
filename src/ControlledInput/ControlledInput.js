import React, { Component } from 'react';

class ControlledInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		};
	}

	handleChange = e => {
		this.setState({
			value: e.target.value
		});
	};

	handleKeyUp = e => {
		if (e.key === 'Enter') {
			this.setState({
				value: ''
			});
		}
	};

	render() {
		const { value } = this.state;
		return (
			<>
				<input
					type="text"
					value={value}
					onChange={this.handleChange}
					onKeyUp={this.handleKeyUp}
				/>
				<p>{value}</p>
			</>
		);
	}
}

export { ControlledInput };
