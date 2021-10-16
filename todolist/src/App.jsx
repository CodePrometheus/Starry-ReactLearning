import { Component } from "react";
import Header from "./header/Header";
import List from "./list/List";
import Footer from "./footer/Footer";
import "./App.css";

export default class App extends Component {
  state = {
    todos: [
      { id: "001", name: "Java", done: true },
      { id: "002", name: "Go", done: true },
      { id: "003", name: "Vue", done: false },
      { id: "004", name: "React", done: false },
    ],
  };

  addTodo = (value) => {
    const { todos } = this.state;
    let res = { id: todos.length + 1, name: value, done: false };
    this.setState({ todos: [res, ...todos] });
  };

  updateTodo = (id, done) => {
    const { todos } = this.state;
    const newTodo = todos.map((v) => {
      if (v.id === id) {
        return { ...v, done: done };
      }
      return v;
    });
    this.setState({ todos: newTodo });
  };

  deleteTodo = (id) => {
    const { todos } = this.state;
    const newTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({ todos: newTodo });
  };

  deleteAll = () => {
    const { todos } = this.state;
    const newTodo = todos.filter((todo) => {
      return todo.done !== true;
    });
    this.setState({ todos: newTodo });
  };

  choseAll = (done) => {
    const { todos } = this.state;
    const newTodo = todos.map((v) => {
      return { ...v, done };
    });
    this.setState({ todos: [...newTodo] });
  };

  render() {
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List
            todos={this.state.todos}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
          />
          <Footer
            allCheck={this.state}
            choseAll={this.choseAll}
            deleteAll={this.deleteAll}
          />
        </div>
      </div>
    );
  }
}
