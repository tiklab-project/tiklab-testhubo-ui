import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";


export class ApiPerfTestDispatchStore {
    @observable apiPerfTestResult = {};
    @observable responseResult = {};
    @observable totalRecord ;

    @action
    apiPerfExecute = async (id,url) => {

        const param = {
            apiPerfCase:{id:id},
            apiEnv:url
        }

        const res = await Axios.post("/apiPerfTestDispatch/execute",param);
        if(res.code === 0) {
            this.apiPerfTestResult = res.data;
        }
        return res
    }

    @action
    exeResult = async (id,url)=>{
        const param = {
            apiPerfCase:{id:id},
            apiEnv:url
        }

        const res  = await Axios.post("/apiPerfTestDispatch/exeResult",param);
        if(res.code === 0 ){
            return res.data;
        }
    }


}

export const API_PERF_DISPATCH_STORE = 'apiPerfTestDispatchStore';
