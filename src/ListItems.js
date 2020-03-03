import React from 'react';

class ListItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: false
		};
	}
	labelRef = React.createRef();
	divRef = React.createRef();
	checkBoxChange = () => {
		const { toDoId } = this.props;
		console.log(toDoId + ' toDoId');
		let arrToDoDone;
		console.log(this.divRef);
		console.log(this.state.isChecked + ' isCheckedState');
		let checkedState = !this.state.isChecked;
		this.setState({
			isChecked: checkedState
		});
		this.labelRef.current.classList.toggle('strike-through');
		console.log(this.divRef.current.children[1].className);
		console.log(this.divRef.current.children[1].innerText);
		//think doing this in componentwillunmount might be the better route, but not sure how. Thought of somehow parsing through all the divRefs at the end with a for loop and then to apply the first if statement. Problem here was once it was struckthrough, it was eliminated from the ToDo list, so I had to add the second conditional to add it back when unticked.
		if (
			this.divRef.current.children[1].className ===
			'to-do-item strike-through'
		) {
			let arrAllToDo = JSON.parse(localStorage.getItem('toDoData'));
			arrToDoDone = arrAllToDo.filter(
				e => e !== this.divRef.current.children[1].innerText
			);
			console.log(arrToDoDone);
			localStorage.setItem('toDoData', JSON.stringify(arrToDoDone));
		}
		if (
			this.divRef.current.children[1].className !==
			'to-do-item strike-through'
		) {
			let toDoArrAll = JSON.parse(localStorage.getItem('toDoData'));
			toDoArrAll.push(this.divRef.current.children[1].innerText);
			localStorage.setItem('toDoData', JSON.stringify(toDoArrAll));
		}
	};
	render() {
		const { toDoList, toDoId } = this.props;
		console.log(toDoId);
		return (
			<div className="to-do-items" ref={this.divRef}>
				<input
					type="checkbox"
					defaultChecked={this.state.isChecked}
					onChange={this.checkBoxChange}
				/>
				<label ref={this.labelRef} className="to-do-item">
					{toDoList}
				</label>
				<button>X</button>
			</div>
		);
	}
}

export default ListItems;
