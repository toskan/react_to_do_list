import React from 'react';
import ListItems from './ListItems.js';

class Todo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 'Enter Thing that Needs Doing',
			toDoList: []
		};
	}

	inputRef = React.createRef();

	handleKeyUp = e => {
		if (e.key === 'Enter') {
			this.setState({
				value: this.inputRef.current.value.trim(),
				toDoList: [
					...this.state.toDoList,
					this.inputRef.current.value.trim()
				]
			});
			this.inputRef.current.value = 'Enter Thing that Needs Doing';
		}
	};

	inputValueEmpty = e => {
		if (this.inputRef.current.value === 'Enter Thing that Needs Doing') {
			this.inputRef.current.value = '';
		}
	};

	render() {
		return (
			<>
				<input
					className="to-do-input"
					ref={this.inputRef}
					type="text"
					defaultValue={this.state.value}
					onKeyUp={this.handleKeyUp}
					onClick={this.inputValueEmpty}
				/>
				<h1>Things that need Doing:</h1>
				{this.state.toDoList.map((item, index) => {
					return (
						<ListItems toDoList={item} key={`${item}_${index}`} />
					);
				})}
			</>
		);
	}
}

export default Todo;
