import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Operation } from '../../constants';
import { Calculation } from '../../models/Calculation';
import { calculateForArgs2 } from '../../api/calculateApi';

export interface CalculatorState {
    arg1: number;
    arg2: number;
    operation: Operation;
    result: number | null;    
    error: string | null;
    canCalculate: boolean;
}

const initialState: CalculatorState = {
    arg1: 0,
    arg2: 0,
    operation: Operation.Addition,
    result: null,
    error: '',
    canCalculate: true
}

export const calculateAsync = createAsyncThunk(
    'calculator/calculate',
    async (payload: Calculation) => {      
      let actionResult: {
        result: null | number | string,
        isError: boolean
      } = {
        result: '',
        isError: false
      }
      try {
        const response = await calculateForArgs2(payload);            
        actionResult.isError = false;
        actionResult.result = response;       
      } catch (error) {
        actionResult.isError = true;
        actionResult.result = (error as Error).message;
      }

      return actionResult;
    }
);

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {     
      setParams: (state, action: PayloadAction<{ arg1: number; arg2: number; operation: Operation}>) => {
        state.canCalculate = true;
        state.result = null;
        state.arg1 = action.payload.arg1;
        state.arg2 = action.payload.arg2;
        state.operation = action.payload.operation;
        if (state.arg2 === 0 && state.operation === Operation.Division) {
          state.error = 'The arguments would create a division by zero error';
          state.canCalculate = false;
        } else {
          state.error = null;
          state.canCalculate = true;
        }        
      },  
    },

    extraReducers: (builder: any) => {
        builder
        .addCase(calculateAsync.pending, (state: CalculatorState) => {     
            state.error = null;      
            state.result = null;      
            state.canCalculate = true;  
          })
          .addCase(calculateAsync.fulfilled, (state: CalculatorState, action: any) => {            

            if (action.payload.isError) {
              state.error = action.payload.result;
              state.canCalculate = false;
            } else {
              state.result = action.payload.result;    
              state.canCalculate = true;
            }

          })
          .addCase(calculateAsync.rejected, (state: CalculatorState, action: any) => {            
            state.error = action.payload;  
            state.canCalculate = false;
            state.result = null;               
          });
    },
})

export const { setParams } = calculatorSlice.actions;