import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";


export class ApiSceneTestDispatchStore {
    @observable apiSceneTestResult = {};
    @observable responseResult = {};
    @observable totalRecord ;

    @action
    apiSceneExecute = async (param) => {
        const res = await Axios.post("/apiSceneTestDispatch/execute",param);
        if(res.code === 0) {
            this.apiSceneTestResult = res.data;
        }
        return res
    }


}

let apiSceneTestDispatchStore = new ApiSceneTestDispatchStore();
export default apiSceneTestDispatchStore;
