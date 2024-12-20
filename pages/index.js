import React, { use, useEffect, useState } from "react";
import {} from "react-icons/md";

import axios from "axios";

import { format, set } from "date-fns";
const index = () => {
  const [editText, setEditText] = useState();
  const [todos, setTodos] = useState([]);
  const [todosCopy, setTodosCopy] = useState(todos);
  const [todoInput, setTodoInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // state management
  // useEffect(() => {}, [count]);
  const editTodo = (index) => {
    setTodoInput(todos[index].title);
    setEditIndex(index);
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/todos");
      console.log(response);

      setTodos(response.data);
      setTodosCopy(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addTodo = async () => {
    try {
      if (editIndex == -1) {
        // add new todo

        const response = await axios.get("http://127.0.0.1:8000/todos", {
          title: todoInput,
          completed: false,
        });
        setTodos(response.data);
        setTodosCopy(response.data);
        setTodoInput("");
      } else {
        // update existing todo
        const todoToUpdate = { ...todos[editIndex], title: todoInput };
        const response = await axios.put(
          `http://127.0.0.1:8000/todos/${todoToUpdate.id}`,
          {
            todoToUpdate,
          }
        );
        console.log(response);
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = response.data;
        setTodos(updatedTodos);
        setTodoInput("");
        setEditIndex(-1);
        setCount(count + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const toggleCompleted = async (index) => {
    try {
      const todoToUpdate = {
        ...todos[index],
        completed: !todos[index].completed,
      };
      const response = await axios.delete(
        `http://127.0.0.1:8000/todos/${todoToUpdate.id}`
      );
      const updatedTodos = [...todos];
      updatedTodos[index] = response.data;
      setTodos(updatedTodos);
      setCount(count + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const searchTodos = () => {
    const results = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(results);
  };

  const fromatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime())
        ? "Invalid date"
        : format(date, "yyyy-MM-dd HH:mm:ss");
    } catch (error) {}
  };
  return (
    <div className="main-body">
      <div className="todo-app">
        <div className="input-section">
          <input
            type="text"
            id="todoInput"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="Add a todo"
          />

          <button onClick={() => addTodo()} className="add">
            {editIndex == -1 ? "Add" : "Update"}
          </button>

          <input
            type="text"
            id="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search a todo"
          />

          <button onClick={() => {}}>Search</button>
        </div>
        {/* body */}

        <div className="todos">
          <ul className="todo-list"></ul>{" "}
          {todos.length === 0 && (
            <div>
              <img className="face" src="/theblockchaincoders.jpg" />
              <h1 className="not-found">
                No Todos Found <br /> Add Some Todos
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
