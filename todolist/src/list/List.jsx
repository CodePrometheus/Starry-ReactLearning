import { Component } from "react";
import PropType from "prop-types";
import "./list.css";
import Item from "../item/Item";

export default class List extends Component {
  static propTypes = {
    todos: PropType.array.isRequired,
    updateTodo: PropType.func.isRequired,
    deleteTodo: PropType.func.isRequired,
  };

  render() {
    const { todos, updateTodo, deleteTodo } = this.props;
    return (
      <ul className="todo-main">
        {todos.map((todo) => {
          return (
            <Item
              key={todo.id}
              {...todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>
    );
  }
}
