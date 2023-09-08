
import * as types from './actionTypes';

import { Calculation } from "../models/Calculation";

import * as calculateApi from '../api/calculateApi';

export const calculateForArgs = (payload: Calculation) => (dispatch: any) => {

    const onError = (result: any) => {
        dispatch({
            type: types.CALCULATE_FOR_ARGUMENTS_ERROR,
            data: result.data,
        });
    }

    const onSuccess = (result: any) => {
        const messageToShow = 'Calculation finished successfully';
                dispatch({
                    type: types.SHOW_SNACKBAR,
                    data: messageToShow,
                });
                dispatch({
                    type: types.CALCULATE_FOR_ARGUMENTS_SUCCESS,
                    data: result.data,
                });

    }

    calculateApi.calculateForArgs(payload, onSuccess, onError)
    .catch((error: any) => {    
        dispatch({ type: types.CALCULATE_FOR_ARGUMENTS_ERROR, data: error });        
    });
};