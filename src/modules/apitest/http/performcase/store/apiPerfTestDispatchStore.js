import {observable,action} from "mobx";
import {apiPerfExecute} from '../api/apiPerfTestDispatchApi';


export class ApiPerfTestDispatchStore {
    @observable apiPerfTestResult = {};
    @observable responseResult = {};
    @observable totalRecord ;

    @action
    apiPerfExecute = async (id,url) => {

        const param = {
            apiPerfCase:{id:id},
            apiPerfTestConfig:{"prepositionUrl":url}
        }

        const res = await  apiPerfExecute(param);
        if(res.code === 0) {
            this.apiPerfTestResult = res.data;
            return res.data
        }
    }


}

export const API_PERF_DISPATCH_STORE = 'apiPerfTestDispatchStore';
