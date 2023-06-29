import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";


export class AppPerfTestDispatchStore {
    @observable appPerfTestResult;
    @observable responseResult;

    @action
    appPerfExecute = async (id) => {

        let param = { appPerfId:id}

        let res = await Axios.post("/appPerfTestDispatch/execute",param);
        if(res.code === 0) {
            this.appPerfTestResult = res.data;
            return res.data
        }
    }

    @action
    exeResult = async (id)=>{
        let param ={ appPerfId:id}

        let res  =  await Axios.post("/appPerfTestDispatch/exeResult",param);
        if(res.code === 0 ){
            return res.data;
        }
    }


}

let appPerfTestDispatchStore = new AppPerfTestDispatchStore();
export default appPerfTestDispatchStore;
