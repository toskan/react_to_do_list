import React, { Component } from 'react'
import {TodoList} from './TodoList'

class TodoContainer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       todos: []
    }
  }

  setTodos = (newTodos) => {
    this.setState({
      todos: newTodos
    })
  }

  updateTodo = (index, isComplete) => {
    const newTodos = this.state.todos.map((todo, idx) => {
      if(idx === index) {
        return ({
          ...todo,
          complete: isComplete
        })
      } else {
        return todo
      }
    })

    this.setState({
      todos: newTodos
    })
  }

  removeTodo = (index) => {
    const newTodos = [...this.state.todos]
    newTodos.splice(index, 1)

    this.setState({
      todos: newTodos
    })
  }
  
  render() {
    const {todos} = this.state
    return (
      <TodoList
        todos={todos}
        setTodos={this.setTodos}
        updateTodo={this.updateTodo}
        removeTodo={this.removeTodo}
      />
    )
  }
}

export {TodoContainer}
