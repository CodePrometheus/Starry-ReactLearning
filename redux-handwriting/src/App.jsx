import React, { useContext, useEffect, useState } from "react";

const appContext = React.createContext(null);

const Header = () => {
  console.log("Header执行: " + Math.random());
  return (
    <section>
      Header
      <Count />
    </section>
  );
};

const Main = () => {
  console.log("Main执行: " + Math.random());
  return (
    <section>
      Main
      <CountModify />
    </section>
  );
};

const Footer = () => {
  console.log("Footer执行: " + Math.random());
  return <section>Footer</section>;
};

const store = {
  state: {
    count: {
      name: "count",
      data: "10",
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

export const App = () => {
  // 只要给 setAppState 传新值，App 必将重新执行
  // const [appState, setAppState] = useState({
  //   count: {
  //     name: "count",
  //     data: "10",
  //   },
  // });
  // const contextValue = { appState, setAppState };
  return (
    <appContext.Provider value={store}>
      <Header />
      <Main />
      <Footer />
    </appContext.Provider>
  );
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

// 将组件与全局状态连接   接收一个组件返回新的组件(高阶组件)
const connect = (Component) => {
  return (props) => {
    const { state, setState } = useContext(appContext);
    const [, update] = useState({});
    // 订阅
    useEffect(() => {
      store.subscribe(() => {
        update({});
      });
    }, []);
    const dispatch = (action) => {
      setState(reducer(state, action));
      // update({});
    };
    return <Component {...props} dispatch={dispatch} state={state} />;
  };
};

const Count = connect(({ dispatch, state }) => {
  console.log("Count执行: " + Math.random());
  return <div>Count: {state.count.name}</div>;
});

const CountModify = connect(({ dispatch, state }) => {
  console.log("CountModify执行: " + Math.random());
  const onChange = (e) => {
    dispatch({
      type: "updateCount",
      payload: {
        name: e.target.value,
      },
    });
  };
  return (
    <div>
      <input value={state.count.name} onChange={onChange} />
    </div>
  );
});
