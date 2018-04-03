import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo'
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers'
import {pipe, partial} from './lib/utils'
import {loadTodos, createTodo, saveTodo, destroyTodo} from './lib/todoService'
import PropTypes from 'prop-types';

class App extends Component {
   state = {/* ppty initializer syntax config in CRA. State is an instance ppty of class*/
     todos: [],
    currentTodo:''
  }
  static contextTypes = {
    route: PropTypes.string
  }
  /* constructor(){
    super() */
    /* this.state = {
      todos: [
        {id:1,name:'Learn JSX',isComplete:true},
        {id:2,name:'Build an Awesome App',isComplete:false},
        {id:3,name:'Ship It!',isComplete:false} *//* comment objs if api used */
      /* ], */
      /* currentTodo:''
    } */
    /* if we initialize these methods as ppties then we dont need to add these xtra bindings */
    /* this.handleInputChange = this.handleInputChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this) *//* to get this.setstate n this.state within those methods */
    /* this.handleEmptySubmit = this.handleEmptySubmit.bind(this) */
  /* } */
  /* handleSubmit(evt){ instead use it like below by initializing it as a ppty */
  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
  }
  handleToggle = (id) => {
    const getToggleTodo = pipe(findById, toggleTodo)
    const updated = getToggleTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({todos: updatedTodos})
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo Updated'))
  } //pipe fn to enable fn composition
  /* handleToggle = (id) => {
    const todo = findById(id, this.state.todos)
    const toggled = toggleTodo(todo)
    const updatedTodos = updateTodo(this.state.todos, toggled)
    this.setState({todos: updatedTodos})
  } */

  handleRemove = (id, evt) => {
   evt.preventDefault()//to prevent onclick of link changing the address bar
   const updatedTodos = removeTodo(this.state.todos, id)
   this.setState({todos: updatedTodos})
   destroyTodo(id)
    .then(() => this.showTempMessage('Todo Removed'))
  }
  handleSubmit = (evt) => {
    evt.preventDefault()/* prevent form from trying to submit thru get which would refresh the page */
    const newId = generateId()
    const newTodo = {name: this.state.currentTodo, isComplete:false, id:newId}
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo:''/* , 
      errorMessage: '' */
    })
    createTodo(newTodo)
      .then(() => this.showTempMessage('todo added'))
  }
  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => this.setState({message: ''}),2500)
  } 

  handleEmptySubmit = (evt) => {
    evt.preventDefault()
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value,
      errorMessage: ''
    })
  }
  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Todos</h1>
        </header>
        <div className="Todo_App">
        {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
        {this.state.message && <span className='success'>{this.state.message}</span>}
            <TodoForm handleInputChange={this.handleInputChange}
              currentTodo={this.state.currentTodo}
              handleSubmit={submitHandler}/>
            <TodoList handleToggle={this.handleToggle}
            handleRemove={this.handleRemove} todos={displayTodos}/> {/* todos={this.state.todos} earlier */}
            <Footer />
        </div>
      </div>
    );
  }
}

export default App;
