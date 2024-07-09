import {observable,action} from "mobx";
import {Axios} from "thoughtware-core-ui";


export class ApiPerfTestDispatchStore {
    @observable apiPerfTestResult = {};
    @observable responseResult = {};
    @observable totalRecord ;

    @action
    apiPerfExecute = async (param) => {
        const res = await Axios.post("/apiPerfTestDispatch/execute",param);
        if(res.code === 0) {
            this.apiPerfTestResult = res.data;
        }
        return res
    }

    @action
    exeResult = async (apiPerfId)=>{
        let param = new FormData()
        param.append("apiPerfId",apiPerfId)
        return  await Axios.post("/apiPerfTestDispatch/result",param);
    }

    @action
    apiPerfStopTest= async (apiPerfId)=> {
        let param = new FormData()
        param.append("apiPerfId",apiPerfId)
        await Axios.post("/apiPerfTestDispatch/stop",param)
    };


}

let apiPerfTestDispatchStore = new ApiPerfTestDispatchStore();
export default apiPerfTestDispatchStore;
