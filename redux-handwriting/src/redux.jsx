import React, { useEffect, useState } from "react";

export const appContext = React.createContext(null);
let state = undefined;
let reducer = undefined;
let listeners = [];

export const Provider = ({ store, children }) => {
  return <appContext.Provider value={store}>{children}</appContext.Provider>;
};

export const createStore = (_reducer, initState) => {
  state = initState;
  reducer = _reducer;
  return store;
};

const setState = (newState) => {
  state = newState;
  listeners.map((fn) => fn(state));
};

const store = {
  getState() {
    return state;
  },
  dispatch: (action) => {
    setState(reducer(state, action));
  },
  subscribe(fn) {
    listeners.push(fn);
    return () => {
      const idx = listeners.indexOf(fn);
      listeners.splice(idx, 1);
    };
  },
};

let dispatch = store.dispatch;

const prevDispatch = dispatch;

dispatch = (action) => {
  if (typeof action === "function") {
    // action是一个函数时，此时是一个异步的action
    action(dispatch);
  } else {
    prevDispatch(action);
  }
};

const next = dispatch;

dispatch = (action) => {
  if (action.payload instanceof Promise) {
    action.payload.then((data) => {
      dispatch({
        ...action,
        payload: data,
      });
    });
  } else {
    next(action);
  }
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

// 将组件与全局状态store连接   接收一个组件返回新的组件(高阶组件)
// 读就是 state，写就是 dispatch
export const connect = (selector, mapDispatchToProps) => (Component) => {
  return (props) => {
    const [, update] = useState({});
    const data = selector ? selector(state) : { state };

    const dispatchers = mapDispatchToProps
      ? mapDispatchToProps(dispatch)
      : { dispatch };

    // 数据不一样才 update, selector 更新则取消之前的订阅
    useEffect(
      () =>
        store.subscribe(() => {
          const newData = selector ? selector(state) : { state };
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
