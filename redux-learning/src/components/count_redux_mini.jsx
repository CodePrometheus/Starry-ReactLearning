import store from "../redux/store";
import { Component } from "react";

export default class CountMini extends Component {
  increment = () => {
    const { value } = this.selectNumber;
    store.dispatch({ type: "inc", data: Number(value) });
  };

  decrement = () => {
    const { value } = this.selectNumber;
    store.dispatch({ type: "dec", data: Number(value) });
  };

  incrementIfOdd = () => {
    const { value } = this.selectNumber;
    const count = store.getState();
    if (count % 2 !== 0) {
      store.dispatch({ type: "inc", data: value * 1 });
    }
  };
  //异步加
  incrementAsync = () => {
    const { value } = this.selectNumber;
    setTimeout(() => {
      store.dispatch({ type: "inc", data: value * 1 });
    }, 500);
  };

  render() {
    return (
      <div>
        <h1>当前求和为：{store.getState()}</h1>
        <select ref={(c) => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>
        &nbsp;
        <button onClick={this.decrement}>-</button>
        &nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>
        &nbsp;
        <button onClick={this.incrementAsync}>异步加</button>
        &nbsp;
      </div>
    );
  }
}
