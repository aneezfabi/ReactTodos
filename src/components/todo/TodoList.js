import React from 'react'
import {TodoItem} from './TodoItem'
import PropTypes from 'prop-types';

export const TodoList = (props) => {
    return (
        <div className="Todo_List">
            <ul>
              {props.todos.map(todo => <TodoItem handleToggle={props.handleToggle}
               key={todo.id} {...todo} handleRemove={props.handleRemove}/>)}
            </ul>{/* ...todo takes as id=todo.id n name=todo.name n pass as props */}
          </div>
    )
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired
}