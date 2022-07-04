import React, { useState, useRef, useCallback} from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "todolist 외우기",
      checked: true,
    },
    {
      id: 2,
      text: "샤워하기, 공부에 집중하기",
      checked: true,
    },
    {
      id: 3,
      text: "선물 주기",
      checked: false,
    }
  ])

  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    }
    setTodos(todos.concat(todo));
    nextId.current += 1;
  },
  [todos],
  );

  const onRemove = useCallback(
    id=>{
      setTodos(todos.filter(
        todo => (
          todo.id !== id
        )
      ))
    }, [todos]
  );

  const onToggle = useCallback(
    id=> 
    setTodos(todos.map(
      todo => (
        todo.id === id? 
        { ...todo, checked: !todo.checked } : todo 
      )
    )),
    [todos]
  )

  return (
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoTemplate>
  );
};

export default App;
