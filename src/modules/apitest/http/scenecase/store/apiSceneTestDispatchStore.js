import {observable,action} from "mobx";
import {apiSceneExecute} from '../api/apiSceneTestDispatchApi';


export class ApiSceneTestDispatchStore {
    @observable apiSceneTestResult = {};
    @observable responseResult = {};
    @observable totalRecord ;

    @action
    apiSceneExecute = async (id,url) => {

        const param = {
            apiSceneCase:{id:id},
            apiSceneTestConfig:{"prepositionUrl":url}
        }

        const res = await  apiSceneExecute(param);
        if(res.code === 0) {
            this.apiSceneTestResult = res.data;
            return res.data
        }
    }


}

export const API_SCENE_DISPATCH_STORE = 'apiSceneTestDispatchStore';
