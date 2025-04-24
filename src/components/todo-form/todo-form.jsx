import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './todo-form.scss';

export const TodoForm = () => {
  const {
    addTodo, searchTerm, setSearchTerm, filter, setFilter,
  } = React.useContext(TodosContext);
  const [task, setTask] = React.useState('');

  const handleAddTodo = () => {
    if (task.trim()) {
      addTodo(task);
      setTask('');
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form-container">
      <div className="search-filter">
        <input
          className="search-input"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filter-buttons">
          <button
            type="button"
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            type="button"
            className={filter === 'incomplete' ? 'active' : ''}
            onClick={() => setFilter('incomplete')}
          >
            Incomplete
          </button>
        </div>
      </div>
      <div className="todo-form">
        <input
          placeholder="Enter new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <button type="button" onClick={handleAddTodo}>
          Add task
        </button>
      </div>
    </div>
  );
};