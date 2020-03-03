import React from 'react';

class ListItems extends React.Component {
	checkedBoxStateInStorage;
	constructor(props) {
		super(props);
		this.state = {
			isChecked: false
		};
	}
	labelRef = React.createRef();
	checkBoxChange = () => {
		let checkedState = !this.state.isChecked;
		this.setState({
			isChecked: checkedState
		});
		console.log(checkedState);
		this.labelRef.current.classList.toggle('strike-through');
		localStorage.setItem(
			'checkedOrUnchecked',
			JSON.stringify(checkedState)
		);
		//think doing this in componentwillunmount might be the better route, but not sure how. Thought of somehow parsing through all the divRefs at the end with a for loop and then to apply the first if statement. Problem here was once it was struckthrough, it was eliminated from the ToDo list, so I had to add the second conditional to add it back when unticked.
		// if (this.state.isChecked === false) {
		// 	console.log(this.state.isChecked + ' isCheckedState');
		// 	let arrAllToDo = JSON.parse(localStorage.getItem('toDoData'));
		// 	arrToDoDone = arrAllToDo.filter(e => e !== toDoItem);
		// 	console.log(arrToDoDone);
		// 	localStorage.setItem('toDoData', JSON.stringify(arrToDoDone));
		// } else {
		// 	let toDoArrAll = JSON.parse(localStorage.getItem('toDoData'));
		// 	toDoArrAll.push(this.divRef.current.children[1].innerText);
		// 	localStorage.setItem('toDoData', JSON.stringify(toDoArrAll));
		// }
	};
	componentDidMount() {
		this.checkedBoxStateInStorage = JSON.parse(
			localStorage.getItem('checkedOrUnchecked')
		);
		if (localStorage.getItem('checkedOrUnchecked')) {
			this.setState({
				isChecked: this.checkedBoxStateInStorage
			});
		}
	}
	render() {
		const { toDoItem, deleteToDo } = this.props;
		return (
			<div className="to-do-items">
				<input
					type="checkbox"
					defaultChecked={this.state.isChecked}
					onChange={this.checkBoxChange}
				/>
				<label ref={this.labelRef} className="to-do-item">
					{toDoItem}
				</label>
				<button className="deleteToDoButton" onClick={deleteToDo}>
					X
				</button>
			</div>
		);
	}
}

export default ListItems;
