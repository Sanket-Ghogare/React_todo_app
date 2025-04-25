import { createContext } from 'react';

export const TodosContext = createContext({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
  filter: 'all',
  setFilter: () => {},
  allTodos: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    handlePageChange: () => {},
  },
  editingTodoId: null,
  setEditingTodoId: () => {},
  editInput: '',
  setEditInput: () => {},
  startEditing: () => {},
  saveEdit: () => {},
});
