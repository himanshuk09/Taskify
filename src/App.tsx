import React, { useState } from 'react';
import InputField from './components/InputField';
import './App.css';
import Todo from './components/model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from "react-beautiful-dnd"
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
      setTodo("");
    }
  };
  // const onDragEnd = (result: DropResult) => {
  //   const { source, destination } = result;
  //   if (!destination) return;
  //   if (destination.droppableId === source.droppableId && destination.index === source.index) return;
  //   let add,active=todos,
  //   complete=completedTodos;

  //   if(source.droppableId==="todoslist"){
  //     add=active[source.index];
  //     active.splice(source.index,1);
  //   }else{
  //     add=complete[source.index];
  //     active.splice(source.index,1);
  //   }

  //   if(destination.droppableId==="todoslist"){
  //     active.splice(destination.index,0,add)
  //   }else{
  //     complete.splice(destination.index,0,add)
  //   }

  //   setCompletedTodos(complete);
  //   setTodos(active)
  // }
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading'>Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>

  );
}

export default App;
