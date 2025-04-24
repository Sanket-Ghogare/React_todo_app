import * as React from 'react';
import { Checkbox } from '../checkbox';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';

export const TodoList = () => {
  const { todos, toggleTodo, deleteTodo } = React.useContext(TodosContext);

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const toggleCheck = (id) => {
    toggleTodo(id);
  };

  const handleKeyUp = (e, id) => {
    if (e.key === 'Enter') {
      toggleCheck(id);
    }
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      {todos.length ? (
        <div className="todo-list-content">
          {todos.map((todoItem) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.label}
              checked={todoItem.checked}
              onClick={() => toggleCheck(todoItem.id)}
              onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-todos">Looks like you&apos;re up for a challenge!</div>
      )}
    </div>
  );
};
