import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";

export class WebPerfTestDispatchStore {
    @observable webPerfTestResult;
    @observable responseResult;
    @observable agentId;

    @action
    webPerfExecute = async (id) => {

        const param = {
            webPerfCase:{id:id}
        }

        const res = await Axios.post("/webPerfTestDispatch/execute",param);
        if(res.code === 0) {
            this.webPerfTestResult = res.data;
            return res.data
        }
    }

    @action
    exeResult = async (id)=>{
        const param = {
            webPerfCase:{id:id},
        }

        const res  =  await Axios.post("/webPerfTestDispatch/exeResult",param);
        if(res.code === 0 ){
            return res.data;
        }
    }

    @action
    getAgent = (id) =>{
        this.agentId = id;
    }


}

export const WEB_PERF_DISPATCH_STORE = 'webPerfTestDispatchStore';
