import React from 'react'
import {TodoItem} from '../TodoItem'

class TodoList extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       inputValue: ''
    }
  }
  

  handleNewTodo = (e) => {
    const { todos, setTodos } = this.props
    if(e.key === 'Enter') {
      const val = e.target.value
      const todo = {
        task: val,
        complete: false
      }
      const newTodos = [...todos, todo]
      setTodos(newTodos)
      this.setState((prevValue => ({
        inputValue: ''
      })))
    }
  
  }
  handleInput = (e) => {
    if(e.key !== 'Enter') {
      const val = e.target.value
      this.setState((prevValue => ({
        inputValue: val
      })))
    }
  }

  render(){ 
    const {todos, updateTodo, removeTodo} = this.props
    const {inputValue} = this.state
    return (
      <>
      <h1>Todo List</h1>
      <input
        value={inputValue}
        onChange={this.handleInput}
        onKeyUp={this.handleNewTodo}
        type="text"
        placeholder="e.g. Go to grocery store"
      />
        {
          todos.length > 0
          ? todos.map((todo, index) => (
            <TodoItem 
              key={`${todo.task}${index}`}
              todo={todo}
              id={index}
              updateTodo={updateTodo}
              removeTodo={removeTodo}
            />
          ))
          : <div id="empty-list">List empty</div>
        }
      </>
    )
  }
}

export {TodoList}
