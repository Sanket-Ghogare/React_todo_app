import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './todo-results.scss';

export const TodoResults = () => {
  const { allTodos } = React.useContext(TodosContext);
  const calculateChecked = () => allTodos.filter((todo) => todo.checked).length;
  return (
    <div className="todo-results">
      Done:
      {calculateChecked()}
    </div>
  );
};