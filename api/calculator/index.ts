import { APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2,
} from 'aws-lambda';
import { Arguments } from './Arguments';

export enum Operation {
    Addition = 'Addition',
    Subtraction = 'Subtraction',
    Multiplication = 'Multiplication',
    Division = 'Division'
}

const parseBody = (body: string): Arguments | null => {
    if (!body) {
        return null;
    }

    const args = new Arguments();
    const json = JSON.parse(body);

    args.firstArgument = Number(json.arg1);
    args.secondArgument = Number(json.arg2);
    args.operation = json.operation;

    return args;
};

const getCorsHeaders = () => ({    
    'Content-Type': 'application/json',  
    // 👇 allow CORS for all origins
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Headers':
          'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
    'Access-Control-Allow-Credentials': 'true', // Required for cookies, authorization headers with HTTPS
    'Access-Control-Allow-Methods': 'OPTIONS,GET,PUT,POST,DELETE',
    
});

export const calculate = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
    try {        

        if (!event || !event.body) {
            return {
                statusCode: 403,
                body: 'No event received or event invalid',
            };
        }

        const args = parseBody(event.body);

        if (!args) {
            return {
                statusCode: 403,
                body: 'Payload is invalid',
            };
        }

        let result: number;

        switch (args.operation) {
            case Operation.Addition:
                result = args.firstArgument + args.secondArgument;
                break;
            case Operation.Subtraction:
                result = args.firstArgument - args.secondArgument;
                break;
            case Operation.Multiplication:
                result = args.firstArgument * args.secondArgument;
                break;
            case Operation.Division:
                result = args.firstArgument / args.secondArgument;
                break;
            default:
                throw new Error(`Unknown operation: ${args.operation}`);                
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: getCorsHeaders(),
        };
        return response;
    } catch (err) {        
        return {
            statusCode: 500,
            body: (err as Error).message,
            headers: getCorsHeaders(),
        };
    }
};
