import React, { useContext, useEffect, useState } from "react";

export const appContext = React.createContext(null);

export const store = {
  state: {
    count: {
      name: "count",
      data: 10,
    },
    group: {
      name: "React",
    },
  },
  setState(newState) {
    store.state = newState;
    store.listeners.map((fn) => fn(store.state));
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn);
    return () => {
      const idx = store.listeners.indexOf(fn);
      store.listeners.splice(idx, 1);
    };
  },
};

const changed = (oldState, newState) => {
  let changed = false;
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      changed = true;
    }
  }
  return changed;
};

// 将组件与全局状态连接   接收一个组件返回新的组件(高阶组件)
export const connect = (selector, mapDispatchToProps) => (Component) => {
  return (props) => {
    const { state, setState } = useContext(appContext);
    const [, update] = useState({});
    const data = selector ? selector(state) : { state };

    const dispatch = (action) => {
      setState(reducer(state, action));
    };
    const dispatchers = mapDispatchToProps
      ? mapDispatchToProps(dispatch)
      : { dispatch };

    // 数据不一样才 update, selector 更新则取消之前的订阅
    useEffect(
      () =>
        store.subscribe(() => {
          const newData = selector
            ? selector(store.state)
            : { state: store.state };
          // 数据改变了才更新
          if (changed(data, newData)) {
            update({});
          }
        }),
      [selector]
    );
    return <Component {...props} {...data} {...dispatchers} />;
  };
};

// 对创建state过程的规范
const reducer = (state, { type, payload }) => {
  if (type === "updateCount") {
    return {
      ...state,
      count: {
        ...state.count,
        ...payload,
      },
    };
  }
};
