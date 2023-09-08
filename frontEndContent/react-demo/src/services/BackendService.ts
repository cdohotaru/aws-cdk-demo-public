import * as constants from '../constants';

class BackendService {

    public async post(path: string, payload?: any) {
        const url = `${constants.baseServerUrl}/${path}`;
        return this.postInternal(url, payload);
    }

    private async postInternal(url: string, payload: any) {
        const response = await fetch(url, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',                 
            }),
            body: JSON.stringify(payload),
        });
        const json = await response.json();
        return json;
    }
}

let backendService = new BackendService();
export default backendService;
