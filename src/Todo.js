import React from 'react';
import ListItems from './ListItems.js';

class Todo extends React.Component {
	persistedData;
	constructor(props) {
		super(props);
		this.state = {
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
			this.inputRef.current.value = '';
		}
		if (
			e.key === 'Enter' &&
			this.state.toDoList.indexOf(this.inputRef.current.value.trim()) !==
				-1
		) {
			alert(this.inputRef.current.value + ' already needs doing !');
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
					placeholder="enter thing that needs doing"
					onKeyUp={this.handleKeyUp}
					onClick={this.inputValueEmpty}
				/>
				<h1>things that need doing</h1>
				{this.state.toDoList.map((item, index) => {
					return (
						<ListItems
							checkedState={JSON.parse(
								localStorage.getItem(
									'checkedOrUnchecked' + item
								)
							)}
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
