import { Component } from "react";
import "./item.css"

export default class Item extends Component {
  handleMouse = (flag) => {
    return () => {
      this.setState({ mouse: flag });
    };
  };

  change = (id) => {
    return (event) => {
      this.props.updateTodo(id, event.target.checked);
    };
  };

  handleDelete = (id) => {
    return () => {
      if (window.confirm("确认删除吗？")) {
        this.props.deleteTodo(id);
      }
    };
  };

  state = { mouse: false };

  render() {
    const { id, name, done } = this.props;
    const { mouse } = this.state;

    return (
      <li
        style={{ backgroundColor: mouse ? "#ddd" : "white" }}
        onMouseLeave={this.handleMouse(false)}
        onMouseEnter={this.handleMouse(true)}
      >
        <label>
          <input type="checkbox" checked={done} onChange={this.change(id)} />
          <span>{name}</span>
        </label>
        <button
          onClick={this.handleDelete(id)}
          className="btn btn-danger"
          style={{ display: mouse ? "block" : "none" }}
        >
          删除
        </button>
      </li>
    );
  }
}
