import { Component } from "react";

export default class CountBefore extends Component {
  state = { count: 0 };

  inc = () => {
    const { value } = this.selectNumber;
    const { count } = this.state;
    this.setState({ count: count + Number(value) });
  };

  dec = () => {
    const { value } = this.selectNumber;
    const { count } = this.state;
    this.setState({ count: count - Number(value) });
  };

  incOdd = () => {
    const { value } = this.selectNumber;
    const { count } = this.state;
    if (count % 2 !== 0) {
      this.setState({ count: count + Number(value) });
    }
  };

  incAsync = () => {
    const { value } = this.selectNumber;
    const { count } = this.state;
    setTimeout(() => {
      this.setState({ count: count + Number(value) });
    }, 500);
  };

  render() {
    return (
      <div>
        <h1>求和: {this.state.count}</h1>
        <select ref={(c) => (this.selectNumber = c)}>
          <option>1</option>
          <option>2</option>
        </select>
        <button onClick={this.inc}>+</button>
        <button onClick={this.dec}>-</button>
        <button onClick={this.incOdd}>奇数加</button>
        <button onClick={this.incAsync}>异步加</button>
      </div>
    );
  }
}
