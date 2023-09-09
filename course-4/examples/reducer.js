// Initial state
const initialState = {
    count: 0
  };
  
  // Reducer function
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      case 'DECREMENT':
        return { ...state, count: state.count - 1 };
      default:
        return state;
    }
  };
  
  // Example dispatching actions
  const action1 = { type: 'INCREMENT' };
  const action2 = { type: 'DECREMENT' };
  
  let state = counterReducer(undefined, {}); // Initializing with initial state
  console.log(state); // { count: 0 }
  
  state = counterReducer(state, action1);
  console.log(state); // { count: 1 }
  
  state = counterReducer(state, action2);
  console.log(state); // { count: 0 }
  