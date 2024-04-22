import logo from './logo.svg';
import './App.css';

import { createStore } from "redux";
import { Provider, connect } from 'react-redux';

const initialState = {
  counter: 2
}

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD": return {
      ...state,
      counter: state.counter+action.payload,
    }
    break;

    case "SUB": return {
      ...state,
      counter: state.counter-action.payload
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

  
  const handleAddClick = ()=> {
   props.add(); 
  }

  const handleSubClick = ()=> {
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
