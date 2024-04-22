import logo from './logo.svg';
import './App.css';

import { createStore } from "redux";
import { Provider, connect } from 'react-redux';

const initialState = {
  counter: 1
}

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD": return {
      counter: state.counter+action.payload,
      ...state
    }
    break;

    case "SUB": return {
      counter: state.counter-action.payload,
      ...state
    }
    default: return state;
  }

}

const store = createStore(myReducer);

function App() {
  return (
    <div className="App">
     <Provider store={store}>
      <MyCounterWithData />
     </Provider>
    </div>
  );
}



const mapStateToProps = (state)=> {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    add: ()=> dispatch({
      type: "ADD",
      payload: 1
    }),
    sub: ()=> dispatch({
      type: "SUB",
      payload: 1
    })
  }
}


const MyCounter = (props)=> {

  return <div>{props.counter}</div>
}

const MyCounterWithData = connect(mapStateToProps, mapDispatchToProps)(MyCounter);

export default App;
