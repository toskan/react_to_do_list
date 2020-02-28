import React from 'react';

class ListItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: false
		};
	}
	labelRef = React.createRef();
	checkBoxChange = () => {
		this.setState({
			isChecked: !this.state.isChecked
		});
		this.labelRef.current.classList.toggle('strike-through');
	};
	render() {
		const { toDoList } = this.props;
		return (
			<div className="to-do-items">
				<input
					type="checkbox"
					defaultChecked={this.state.isChecked}
					onChange={this.checkBoxChange}
				/>
				<label ref={this.labelRef} className="to-do-item">
					{toDoList}
				</label>
			</div>
		);
	}
}

export default ListItems;
