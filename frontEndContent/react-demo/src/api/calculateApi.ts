import { Calculation } from "../models/Calculation";
import BackendService from "../services/BackendService";

export function isSuccessStatusCode(statusCode: number): boolean {
    return statusCode >= 200 && statusCode < 300;
}

export async function calculateForArgs(payload: Calculation, resolve: Function, reject: Function): Promise<void> {
    const path = 'calculate';

    const result = await BackendService.post(path, payload);

    if (result.statusCode && !isSuccessStatusCode(result.statusCode)) {        
        let error = new Error(result.message)
        return reject(error);
    }
    
    return resolve(result);
}

export async function calculateForArgs2(payload: Calculation): Promise<any> {
    const path = 'calculate';

    const result = await BackendService.post(path, payload);
    return result;
}