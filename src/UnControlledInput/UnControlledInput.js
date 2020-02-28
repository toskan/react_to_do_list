import React, { Component } from 'react';

class UnControlledInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		};
	}

	inputRef = React.createRef();

	handleKeyUp = e => {
		if (e.key === 'Enter') {
			// this.setState({
			//   value: e.target.value.trim()
			// })

			// e.target.value = ''

			this.setState({
				value: this.inputRef.current.value
			});

			this.inputRef.current.value = '';
		}
	};

	render() {
		const { value } = this.state;
		return (
			<>
				<input
					ref={this.inputRef}
					type="text"
					onKeyUp={this.handleKeyUp}
				/>
				<p>{value}</p>
			</>
		);
	}
}

export { UnControlledInput };
