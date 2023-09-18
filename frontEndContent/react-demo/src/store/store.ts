import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { calculatorSlice } from '../features/calculator/calculatorSlice';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';

export const store = configureStore({
  reducer: {
    calculator: calculatorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([createLogger(), reduxImmutableStateInvariant()])
}, 
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;