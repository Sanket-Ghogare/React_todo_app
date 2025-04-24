import * as React from 'react';
import { TodoForm } from './components/todo-form';
import { TodoList } from './components/todo-list';
import { TodoResults } from './components/todo-results';
import { TodosContext } from './todo-context';
import './index.scss';

const todosTemplate = [
  {
    id: 0,
    label: 'Fix the app to display the list of all tasks',
    checked: false,
  },
  {
    id: 1,
    label: 'Fix the layout so that checkboxes are displayed in a vertical column',
    checked: false,
  },
  {
    id: 2,
    label: 'Fix the functionality to add a new task',
    checked: false,
  },
  {
    id: 3,
    label: 'Fix the functionality to mark a task as completed',
    checked: false,
  },
  {
    id: 4,
    label: 'Fix the functionality to delete a task',
    checked: false,
  },
  {
    id: 5,
    label: 'Fix the task counter to count completed tasks correctly',
    checked: false,
  },
  {
    id: 6,
    label: 'Add a filter to toggle between completed and incomplete tasks',
    checked: false,
  },
  {
    id: 7,
    label: 'Add a search feature to find tasks by text',
    checked: false,
  },
  {
    id: 8,
    label: 'Bonus: Implement pagination or lazy loading if tasks exceed 10',
    checked: false,
  },
  {
    id: 9,
    label: 'Bonus: Write test cases for important functionality',
    checked: false,
  },
  {
    id: 10,
    label: 'Bonus: Add additional UI views (e.g., task detail, stats)',
    checked: false,
  },
];

export const App = () => {
  const getSavedTodos = () => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : todosTemplate;
  };

  const [todos, setTodos] = React.useState(getSavedTodos());
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('searchTerm') || '',
  );
  const [filter, setFilter] = React.useState(
    localStorage.getItem('filter') || 'all',
  );
  const [currentPage, setCurrentPage] = React.useState(
    parseInt(localStorage.getItem('currentPage'), 10) || 1,
  );
  const tasksPerPage = 10;
  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  React.useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  React.useEffect(() => {
    localStorage.setItem('filter', filter);
  }, [filter]);

  React.useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  // add new task
  const addTodo = (label) => {
    if (label.trim() !== '') {
      const newTodo = {
        id: todos.length > 0
          ? Math.max(...todos.map((todo) => todo.id)) + 1
          : 0,
        label,
        checked: false,
      };
      setTodos([...todos, newTodo]);
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => (
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos
    .filter((todo) => (
      todo.label.toLowerCase().includes(searchTerm.toLowerCase())
    ))
    .filter((todo) => {
      if (filter === 'completed') { return todo.checked; }
      if (filter === 'incomplete') { return !todo.checked; }
      return true;
    });

  const totalPages = Math.ceil(filteredTodos.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTodos.slice(indexOfFirstTask, indexOfLastTask);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const Pagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i += 1) {
      pageNumbers.push(i);
    }
    if (filteredTodos.length <= tasksPerPage) {
      return null;
    }
    return (
      <div className="pagination">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <div className="page-numbers">
          {pageNumbers.map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => handlePageChange(number)}
              className={`page-number ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="root">
      <h1>React Todo App</h1>
      <TodosContext.Provider
        value={{
          todos: currentTasks,
          addTodo,
          toggleTodo,
          deleteTodo,
          searchTerm,
          setSearchTerm,
          filter,
          setFilter,
          allTodos: todos,
          pagination: {
            currentPage,
            totalPages,
            handlePageChange,
          },
        }}
      >
        <TodoForm />
        <TodoList />
        <TodoResults />
        <Pagination />
      </TodosContext.Provider>
    </div>
  );
};