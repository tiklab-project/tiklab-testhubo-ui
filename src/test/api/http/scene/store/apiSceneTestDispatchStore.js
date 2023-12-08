import {observable,action} from "mobx";
import {Axios} from "thoughtware-core-ui";


export class ApiSceneTestDispatchStore {
    @observable apiSceneTestResult = {};
    @observable responseResult = {};
    @observable totalRecord ;

    @action
    apiSceneExecute = async (param) => {
        const res = await Axios.post("/apiSceneTestDispatch/execute",param);
        if(res.code === 0) {
            this.apiSceneTestResult = res.data;
            return res.data
        }
    }


}

let apiSceneTestDispatchStore = new ApiSceneTestDispatchStore();
export default apiSceneTestDispatchStore;
