import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodos";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteToDos, setIncompleteToDos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteToDos, todoText];
    setIncompleteToDos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteToDos];
    newTodos.splice(index, 1);
    setIncompleteToDos(newTodos);
  };
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteToDos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteToDos[index]];
    setIncompleteToDos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteToDos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteToDos(newIncompleteTodos);
  };
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteToDos.length >= 7}
      />
      {incompleteToDos.length >= 7 && (
        <p style={{ color: "red" }}>
          登録できるtodoは７個までだよ！　頑張って！
        </p>
      )}

      <IncompleteTodos
        todos={incompleteToDos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
