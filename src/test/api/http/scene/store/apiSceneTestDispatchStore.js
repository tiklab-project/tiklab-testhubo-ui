import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";


export class ApiSceneTestDispatchStore {
    @observable apiSceneTestResult = {};
    @observable responseResult = {};
    @observable totalRecord ;

    @action
    apiSceneExecute = async (id,url) => {

        const param = {
            apiSceneCase:{id:id},
            apiEnv:url
        }

        const res = await Axios.post("/apiSceneTestDispatch/execute",param);
        if(res.code === 0) {
            this.apiSceneTestResult = res.data;
            return res.data
        }
    }


}

export const API_SCENE_DISPATCH_STORE = 'apiSceneTestDispatchStore';
