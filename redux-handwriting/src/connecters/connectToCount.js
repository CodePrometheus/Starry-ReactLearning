import { connect } from "../redux";

// 封装读
const CountSelector = (state) => {
  return {
    count: state.count,
  };
};

// 封装写
const CountDispatch = (dispatch) => {
  return {
    updateCount: (attrs) =>
      dispatch({
        type: "updateCount",
        payload: attrs,
      }),
  };
};

export const connectToCount = connect(CountSelector, CountDispatch);
