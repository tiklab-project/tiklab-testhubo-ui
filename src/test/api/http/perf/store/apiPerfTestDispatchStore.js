import {observable,action} from "mobx";
import {Axios} from "thoughtware-core-ui";


export class ApiPerfTestDispatchStore {
    @observable apiPerfTestResult = {};
    @observable responseResult = {};
    @observable totalRecord ;

    @action
    apiPerfExecute = async (apiPerfId,url) => {

        const param = {
            apiPerfId:apiPerfId,
            apiEnv:url
        }

        const res = await Axios.post("/apiPerfTestDispatch/execute",param);
        if(res.code === 0) {
            this.apiPerfTestResult = res.data;
        }
        return res
    }

    @action
    exeResult = async (apiPerfId,url)=>{
        const param = {
            apiPerfId:apiPerfId,
            apiEnv:url
        }

        return  await Axios.post("/apiPerfTestDispatch/result",param);
    }

    @action
    apiPerfTestStatus = async ()=> await Axios.post("/apiPerfTestDispatch/status");


}

let apiPerfTestDispatchStore = new ApiPerfTestDispatchStore();
export default apiPerfTestDispatchStore;
