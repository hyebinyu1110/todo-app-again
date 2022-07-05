import React, { useReducer, useRef, useCallback } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos(){
  const array = [];
  for(let i =1; i<2500; i++){
    const todo={
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    }

    array.push(todo);
  }
  return array;
}
  
function todoReducer(todos, action){
  switch(action.type){
    case 'INSERT':
      return todos.concat(action.todo);

    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);

    case 'TOGGLE':
      return todos.map(
        todo => todo.id === action.id? 
        {...todo, checked:!todo.checked}: todo,
      )

  }

}



const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const nextId = useRef(2501);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch('INSERT', todo);
      nextId.current += 1;
    }, [])

  const onRemove = useCallback(
    id => {
      dispatch('REMOVE', id);
    }
    , []
  );

  const onToggle = useCallback(
    id => {
      dispatch('TOGGLE', id);
    }
    , []
  )

  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoTemplate>
    </div>
  );
};

export default App;
