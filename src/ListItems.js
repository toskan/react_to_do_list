import React from 'react';
import { MdDelete } from 'react-icons/md';

class ListItems extends React.Component {
	checkedBoxStateInStorage;
	labelRef = React.createRef();

	constructor(props) {
		super(props);
		this.state = {
			isChecked: props.checkedState
		};
		console.log(this.labelRef);
	}

	checkBoxChange = event => {
		const { toDoItem } = this.props;
		let checkedState = !this.state.isChecked;

		this.labelRef.current.classList.toggle('strike-through');
		this.setState({
			isChecked: checkedState
		});
		localStorage.setItem(
			'checkedOrUnchecked' + toDoItem,
			JSON.stringify(checkedState)
		);
	};

	componentDidMount() {
		const { checkedState } = this.props;
		if (checkedState) {
			this.labelRef.current.classList.toggle('strike-through', true);
		}
	}

	render() {
		const { toDoItem, deleteToDo } = this.props;
		return (
			<div className="to-do-items">
				<div className="to-do-items-2">
					<input
						type="checkbox"
						defaultChecked={this.state.isChecked}
						onChange={this.checkBoxChange}
					/>
					<label ref={this.labelRef} className="to-do-item">
						{toDoItem}
					</label>
					<button
						className="delete-todo-button"
						onClick={deleteToDo}
						title="Delete Forever"
					>
						<MdDelete />
					</button>
				</div>
			</div>
		);
	}
}

export default ListItems;
