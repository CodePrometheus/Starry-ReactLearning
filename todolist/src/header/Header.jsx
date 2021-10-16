import { Component } from "react";
import PropType from "prop-types";
import "./header.css"

export default class Header extends Component {
  static propTypes = {
    addTodo: PropType.func.isRequired,
  };

  handleKeyUp = (event) => {
    const { target } = event;
    if (event.key !== "Enter") return;
    if (target.value.trim() === "") {
      alert("不能为空");
      return;
    }
    this.props.addTodo(target.value);
    target.value = "";
  };

  render() {
    return (
      <div className="todo-header">
        <input type="text" onKeyUp={this.handleKeyUp} placeholder="输入" />
      </div>
    );
  }
}
