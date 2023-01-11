import {observable,action} from "mobx";
import {apiUnitExecute} from '../api/apiUnitTestDispatchApi';


export class ApiUnitTestDispatchStore {
    @observable apiUnitTestResult = {};
    @observable responseResult = {};
    @observable totalRecord ;

    @action
    apiUnitExecute = async (id,url) => {

        const param = {
            apiUnitCase:{id:id},
            apiUnitTestConfig:{"prepositionUrl":url}
        }

        const res = await  apiUnitExecute(param);
        if(res.code === 0) {
            this.apiUnitTestResult = res.data;
            this.responseResult = res.data?.responseInstance;
        }
        return res;
    }


}

export const API_UNIT_DISPATCH_STORE = 'apiUnitTestDispatchStore';
