import {observable,action} from "mobx";
import {webPerfExecute,exeResult} from '../api/webPerfTestDispatchApi';


export class WebPerfTestDispatchStore {
    @observable webPerfTestResult;
    @observable responseResult;

    @action
    webPerfExecute = async (id) => {

        const param = {
            webPerfCase:{id:id}
        }

        const res = await  webPerfExecute(param);
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

        const res  =  await exeResult(param);
        if(res.code === 0 ){
            return res.data;
        }
    }


}

export const WEB_PERF_DISPATCH_STORE = 'webPerfTestDispatchStore';
