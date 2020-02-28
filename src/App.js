import React from 'react';
import {TodoContainer} from './Todo'
import { ControlledInput } from './ControlledInput';
import { UnControlledInput } from './UnControlledInput';
import './App.css';

function App() {
  return (
    <div className="App">
     {/* <ControlledInput /> */}
     {/* <UnControlledInput /> */}
     <TodoContainer />
    </div>
  );
}

export default App;
