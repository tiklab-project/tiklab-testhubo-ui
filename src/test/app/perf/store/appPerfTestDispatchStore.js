import {observable,action} from "mobx";
import {appPerfExecute,exeResult} from '../api/appPerfTestDispatchApi';


export class AppPerfTestDispatchStore {
    @observable appPerfTestResult;
    @observable responseResult;

    @action
    appPerfExecute = async (id) => {

        let param = { appPerfId:id}

        let res = await  appPerfExecute(param);
        if(res.code === 0) {
            this.appPerfTestResult = res.data;
            return res.data
        }
    }

    @action
    exeResult = async (id)=>{
        let param ={ appPerfId:id}

        let res  =  await exeResult(param);
        if(res.code === 0 ){
            return res.data;
        }
    }


}

export const APP_PERF_DISPATCH_STORE = 'appPerfTestDispatchStore';
