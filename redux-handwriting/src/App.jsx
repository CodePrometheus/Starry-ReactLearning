import React from "react";
import { appContext, connect, store } from "./redux.jsx";
import { connectToCount } from "./connecters/connectToCount";

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

const CountModify = connectToCount(({ updateCount, count }) => {
  console.log("CountModify执行: " + Math.random());
  const onChange = (e) => {
    updateCount({
      name: e.target.value,
    });
  };
  return (
    <div>
      <input value={count.name} onChange={onChange} />
    </div>
  );
});

export const App = () => {
  return (
    <appContext.Provider value={store}>
      <Header />
      <Main />
      <Footer />
    </appContext.Provider>
  );
};
