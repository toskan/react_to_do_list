import React from 'react';
import ListItems from './ListItems.js';

class Todo extends React.Component {
	persistedData;
	constructor(props) {
		super(props);
		this.state = {
			value: 'Enter Thing that Needs Doing',
			toDoList: []
		};
	}
	inputRef = React.createRef();
	handleKeyUp = e => {
		if (
			e.key === 'Enter' &&
			this.state.toDoList.indexOf(this.inputRef.current.value.trim()) ===
				-1
		) {
			let tempArray = [
				...this.state.toDoList,
				this.inputRef.current.value.trim()
			];
			this.setState({
				toDoList: tempArray
			});
			this.inputRef.current.value = this.state.value;
			localStorage.setItem('toDoData', JSON.stringify(tempArray));
		}
		if (
			this.state.toDoList.indexOf(this.inputRef.current.value.trim()) !==
			-1
		) {
			alert('That thing already needs doing !');
			this.inputRef.current.value = this.state.value;
		}
	};
	inputValueEmpty = e => {
		if (this.inputRef.current.value === 'Enter Thing that Needs Doing') {
			this.inputRef.current.value = '';
		}
	};
	componentDidMount() {
		this.persistedData = JSON.parse(localStorage.getItem('toDoData'));
		if (!Array.isArray(this.persistedData)) {
			this.persistedData = [];
			localStorage.clear();
		}
		if (localStorage.getItem('toDoData')) {
			this.setState({
				toDoList: this.persistedData
			});
		}
	}
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
						<ListItems
							toDoItem={item}
							toDoList={this.state.toDoList}
							key={`${item}_${index}`}
							toDoId={index}
							deleteToDo={() => {
								this.setState(
									this.state.toDoList.splice(index, 1)
								);
								const localStorageToDoList = JSON.parse(
									localStorage.getItem('toDoData')
								);
								localStorageToDoList.splice(index, 1);
								localStorage.setItem(
									'toDoData',
									JSON.stringify(localStorageToDoList)
								);
							}}
						/>
					);
				})}
			</>
		);
	}
}

export default Todo;
