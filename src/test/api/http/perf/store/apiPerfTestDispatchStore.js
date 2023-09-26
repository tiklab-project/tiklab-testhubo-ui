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

        const res  = await Axios.post("/apiPerfTestDispatch/result",param);
        if(res.code === 0 ){
            return res.data;
        }
    }

    @action
    apiPerfTestStatus = async ()=> await Axios.post("/apiPerfTestDispatch/status");


}

let apiPerfTestDispatchStore = new ApiPerfTestDispatchStore();
export default apiPerfTestDispatchStore;
