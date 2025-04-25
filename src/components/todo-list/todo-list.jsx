import * as React from 'react';
import { Checkbox } from '../checkbox';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';

export const TodoList = () => {
  const {
    todos,
    toggleTodo,
    deleteTodo,
    editingTodoId,
    editInput,
    setEditInput,
    startEditing,
    saveEdit,
  } = React.useContext(TodosContext);

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
          {todos.map((todo) => {
            const isEditing = editingTodoId === todo.id;

            return (
              <div key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => toggleTodo(todo.id)}
                />

                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                    />
                    <button type="button" onClick={() => saveEdit(todo.id)}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{todo.label}</span>
                    <button
                      type="button"
                      onClick={() => startEditing(todo.id, todo.label)}
                    >
                      Edit
                    </button>
                  </>
                )}

                <button type="button" onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-todos">Looks like you&apos;re up for a challenge!</div>
      )}
    </div>
  );
};
