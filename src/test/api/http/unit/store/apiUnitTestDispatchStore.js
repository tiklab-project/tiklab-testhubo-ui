import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";


export class ApiUnitTestDispatchStore {
    @observable apiUnitTestResult = {};
    @observable responseResult = {};
    @observable totalRecord ;

    @action
    apiUnitExecute = async (id,url) => {

        const param = {
            apiUnitCase:{id:id},
            apiEnv:url
        }

        const res = await Axios.post("/apiUnitTestDispatch/execute",param);
        if(res.code === 0) {
            this.apiUnitTestResult = res.data;
            this.responseResult = res.data?.responseInstance;
        }
        return res;
    }


}

export const API_UNIT_DISPATCH_STORE = 'apiUnitTestDispatchStore';