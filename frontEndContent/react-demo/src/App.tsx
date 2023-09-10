import TextField from '@mui/material/TextField';

import './App.css';
import { NumberFormatCustom } from './generic/NumberFormatCustom';
import React from 'react';
import { Button, MenuItem, Select } from '@mui/material';
import { useSelector } from 'react-redux';

import * as constants from './constants';
import { useAppDispatch } from './store/hooks';
import { calculateAsync, setParams } from './features/calculator/calculatorSlice';

function App() {
  const dispatch = useAppDispatch();
  
  const [arg1, setArg1] = React.useState(0);
  const [arg2, setArg2] = React.useState(0);
  const [operation, setOperation] = React.useState(constants.Operation.Addition);

  const { result, error, canCalculate } = useSelector((state: any) => state.calculator);

  const handleArg1Change = (event: any) => {      
      let value = Number(event.target.value);
      setArg1(value);
      dispatch(setParams({
        arg1: value,
        arg2,
        operation
      }));
  }

  const handleArg2Change = (event: any) => {      
    let value = Number(event.target.value);
      setArg2(value);
      dispatch(setParams(
        {
          arg1,
          arg2: value,
          operation
        }
      ));
  }

  const handleOperationChange = (event: any) => {    

    let selectedOp = event.target.value as constants.Operation;
      setOperation(selectedOp);
      dispatch(setParams({
          arg1,
          arg2,
          operation: selectedOp        
      }));    
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
  
    if (error) {
      return <p>There was an error trying to calculate: {error}</p>
    }

    if (result !== null) {
      return <p>The result of the operation is: {result}</p>
    }

    return null;
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
              disabled={canCalculate === false}
              className="numerical-input"                
              onClick={handleCalculateClick}          
          >
           Calculate
          </Button>          
        </div>
        <div>
            {renderResult()}
          </div>
        <a
          className="App-link"
          href="https://medium.com/@cdohotaru/an-aws-cdk-demo-with-api-gateway-lambda-react-and-a-pipeline-to-rule-them-all-afef4795982b"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about this demo from the accompanying article 
        </a>      
    </div>
  );
}

export default App;

