import TextField from '@mui/material/TextField';

import './App.css';
import { NumberFormatCustom } from './generic/NumberFormatCustom';
import React from 'react';
import { Button, MenuItem, Select } from '@mui/material';
import { useSelector } from 'react-redux';

import * as constants from './constants';
import { useAppDispatch } from './store/hooks';
import { calculateAsync } from './features/calculator/calculatorSlice';

function App() {
  const dispatch = useAppDispatch();

  const [arg1, setArg1] = React.useState(0);
  const [arg2, setArg2] = React.useState(0);
  const [operation, setOperation] = React.useState(constants.Operation.Addition);

  const { calculator } = useSelector((state: any) => state);

  const handleArg1Change = (event: any) => {
      setArg1(event.target.value);
  }

  const handleArg2Change = (event: any) => {
      setArg2(event.target.value);
  }

  const handleOperationChange = (event: any) => {
    setOperation(event.target.value);
  }

  const handleCalculateClick = () => {
    let payload = {
      arg1,
      arg2,
      operation
    }

    dispatch(calculateAsync(payload));
  }

  const renderOperations = () => {
    return constants.operations.map((opp: constants.Operation) => <MenuItem key={`${opp}`} value={opp}>{`${opp}`}</MenuItem>);
  }

  const renderResult = () => {

    if (!calculator) {
      return null;
    }
  
    if (calculator.error) {
      return <p>There was an error trying to calculate: {calculator.error}</p>
    }

    if (calculator.result) {
      return <p>The result of the operation is: {calculator.result}</p>
    }
  }

  return (
    <div className="root-container">
       
        <p>
          Enter numeric values in the inputs below and select one of the available operations to get the result
        </p>
        <div className='inputs'>
          <TextField
                className="numerical-input"
                label="First argument"
                onChange={handleArg1Change}
                name="arg1"
                InputProps={{
                    inputComponent: NumberFormatCustom as any,
                    value: arg1,
                }}
                variant="standard"
              />
          <TextField
                className="numerical-input"
                label="Second argument"
                onChange={handleArg2Change}
                name="arg1"
                InputProps={{
                    inputComponent: NumberFormatCustom as any,
                    value: arg2,
                }}
                variant="standard"
              />
          <Select
              className="numerical-input"                        
              value={operation}
              onChange={handleOperationChange}
              >
              {renderOperations()}
          </Select>
          <Button
              className="numerical-input"                
              onClick={handleCalculateClick}          
          >
           Calculate
          </Button>
          <div>
            {renderResult()}
          </div>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about this demo
        </a>      
    </div>
  );
}

export default App;

