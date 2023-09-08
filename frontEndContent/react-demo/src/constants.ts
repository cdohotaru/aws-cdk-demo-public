export const baseServerUrl = process.env.REACT_APP_API_URL;

export enum Operation {
    Addition = 'Addition',
    Subtraction = 'Subtraction',
    Multiplication = 'Multiplication',
    Division = 'Division'
}

export const operations = [
    Operation.Addition,
    Operation.Subtraction,
    Operation.Multiplication,
    Operation.Division
];