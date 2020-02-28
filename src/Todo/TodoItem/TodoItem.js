import React from 'react'

class TodoItem extends React.Component {

  render(){
    const {todo, id, updateTodo, removeTodo} = this.props
    return (
      <div
        className="todo"
      >
        <div className="group">
          <input 
            type="checkbox"
            onChange={(e) => {
              updateTodo(id, e.target.checked)
            }}
          />
          {
            todo.complete
            ? <p><strike>{todo.task}</strike></p>
            : <p>{todo.task}</p>
          }
        </div>
        <button className="removeBtn" onClick={() => {
          removeTodo(id)
        }}>x</button>
      </div>
    )
  }
}

export {TodoItem}
