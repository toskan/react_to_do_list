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
	//I tried to setState toDoList: [
	// 	...this.state.toDoList,
	// 	this.inputRef.current.value.trim()
	// ]; directly (was off by one). Why do I have to save the state value in a variable first and then setState to that?
	//way to get around is by using a callback function (closure)
	//this.setState((prevState)=>) {return ({toDoList:{...prevState.toDoList, ...}})}
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
			console.log(tempArray);
			this.inputRef.current.value = this.state.value;
			localStorage.setItem('toDoData', JSON.stringify(tempArray));
		}
		if (
			this.state.toDoList.indexOf(this.inputRef.current.value.trim()) !==
			-1
		) {
			alert("That's a thing already needs doing !");
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
		console.log(this.persistedData);
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
							toDoList={item}
							key={`${item}_${index}`}
							toDoId={index}
						/>
					);
				})}
			</>
		);
	}
}

export default Todo;
