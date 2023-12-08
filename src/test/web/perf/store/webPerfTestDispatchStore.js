import {observable,action} from "mobx";
import {Axios} from "thoughtware-core-ui";

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

let webPerfTestDispatchStore = new WebPerfTestDispatchStore();
export default webPerfTestDispatchStore;
