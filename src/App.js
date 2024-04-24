import logo from './logo.svg';
import './App.css';

import { createStore } from "redux";
import { Provider, connect, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import toolkitReducer, { increment, decrement } from './CounterSlice';


const initialState = {
  counter: 2
}

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD": return {
      ...state,
      counter: state.counter + action.payload,
    }
      break;

    case "SUB": return {
      ...state,
      counter: state.counter - action.payload
    }
    default: return state;
  }

}

const secondInitialState = {
  cnt: 0
}
const secondReducer = (state = secondInitialState, action) => {
  switch (action.type) {
    case "increase": return {
      ...state, cnt: state.cnt + action.payload
    }
      break;
    case "decrease": return {
      ...state, cnt: state.cnt - action.payload
    }
      break;
    default: return state;
  }
}

const SecondComponent = props => {

  const secondStateCounter = useSelector(state => state.counter3.cnt)
  const dispatch = useDispatch();

  const handleIncreasing = ()=> {
    dispatch({
      type: "increase",
      payload: 1
    })
  }

  const handleDecreasing = ()=> {
    dispatch({
      type: "decrease",
      payload: -1
    });
  }

  return (
    <div>
      <br />
      <br />
      {secondStateCounter}
      <button onClick={handleIncreasing}>Increase</button>
      <button onClick={handleDecreasing}>Decrease</button>
    </div>
  )
}


// const store = createStore(myReducer); // use configureStore({}) instead of createStore();
// configureStore({}) supports multiple reducers
// four important things come from "react-redux" -> ( Provider, connect, useSelector, useDispatch)
// two important things come from "@reduxjs/toolkit" -> (createSlice, configureStore)
// We export two important things from our slices (actions, reducer); like:
// export const {increment, decrement} = counterSlice.actions;
// export default counterSlice.reducer;
// createSlice has three important properties: (name: "", initialState: {}, reducer: {})
// in reducer withing createSlice we define our actions -> (increment, decrement) = actions
// that's it


const store = configureStore({
  reducer: {
    counter1: myReducer,
    counter2: toolkitReducer,
    counter3: secondReducer
  }
})

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MyCounterWithData />
        <NewCounter />
        <SecondComponent />
      </Provider>
    </div>
  );
}



const mapStateToProps = (state) => {
  console.log("s: ", state);
  return {
    ...state,
    counter: state.counter1.counter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: () => dispatch({
      type: "ADD",
      payload: 1
    }),
    sub: () => dispatch({
      type: "SUB",
      payload: 1
    })
  }
}


const NewCounter = () => {
  const mycount = useSelector(state => {
    console.log("cnt: ", state);
    return state.counter2.counter;
  })
  const dispatch = useDispatch();
  return (
    <div>
      {mycount}
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  )
}

const MyCounter = (props) => {


  const handleAddClick = () => {
    props.add();
  }

  const handleSubClick = () => {
    props.sub();
  }
  return (
    <div>
      {props.counter}

      <button onClick={handleAddClick}>Add</button>
      <button onClick={handleSubClick}>Sub</button>
    </div>
  )
}

const MyCounterWithData = connect(mapStateToProps, mapDispatchToProps)(MyCounter);

export default App;
