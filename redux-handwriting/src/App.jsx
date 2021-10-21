import React from "react";
import { connect, createStore, Provider } from "./redux.jsx";
import { connectToCount } from "./connecters/connectToCount";

const reducer = (state, { type, payload }) => {
  if (type === "updateCount") {
    return {
      ...state,
      count: {
        ...state.count,
        ...payload,
      },
    };
  } else {
    return state;
  }
};

const initState = {
  count: {
    name: "starry",
    data: 10,
  },
  group: {
    name: "react",
  },
};

const store = createStore(reducer, initState);

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

const Footer = connect((state) => {
  return { group: state.group };
})(({ group }) => {
  console.log("Footer执行: " + Math.random());
  return (
    <section>
      Footer
      <div>Group: {group.name}</div>
    </section>
  );
});

const Count = connectToCount(({ count }) => {
  console.log("Count执行: " + Math.random());
  return <div>Count: {count.name}</div>;
});

const ajax = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          name: "2s to res",
        },
      });
    }, 2000);
  });
};

const fetchCount = (dispatch) => {
  ajax("/count").then((response) => {
    dispatch({
      type: 'updateCount',
      payload: response.data
    })
  });
};

const fetchCountPromise = () => {
  return ajax("/count").then((response) => response.data);
};

const CountModify = connect(
  null,
  null
)(({ state, dispatch }) => {
  console.log("CountModify执行: " + Math.random());
  const onClick = () => {
    // dispatch(fetchCount)
    dispatch({
      type: "updateCount",
      payload: fetchCountPromise(),
    });
  };
  return (
    <div>
      Count: {state.count.name}
      <button onClick={onClick}>异步获取 Count</button>
    </div>
  );
});

export const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Main />
      <Footer />
    </Provider>
  );
};
