/**
 * reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
 */
const initState = 0; // 初始化状态
export default function reducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case "inc":
      return preState + data;
    case "dec":
      return preState - data;
    default:
      return preState;
  }
}
