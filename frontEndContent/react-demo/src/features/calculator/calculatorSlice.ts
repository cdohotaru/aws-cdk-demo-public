import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Operation } from '../../constants';
import { Calculation } from '../../models/Calculation';
import { calculateForArgs2 } from '../../api/calculateApi';

export interface CalculatorState {
    arg1: number;
    arg2: number;
    operation: Operation;
    result: number | null;    
    error: string | null;
}

const initialState: CalculatorState = {
    arg1: 0,
    arg2: 0,
    operation: Operation.Addition,
    result: null,
    error: '',
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
    },

    extraReducers: (builder: any) => {
        builder
        .addCase(calculateAsync.pending, (state: CalculatorState) => {     
            state.error = null;              
          })
          .addCase(calculateAsync.fulfilled, (state: CalculatorState, action: any) => {            

            console.log("action is: ", action)

            if (action.payload.isError) {
              state.error = action.payload.result;
            } else {
              state.result = action.payload.result;    
            }

          })
          .addCase(calculateAsync.rejected, (state: CalculatorState, action: any) => {            
            state.error = action.payload;         
          });
    },
})