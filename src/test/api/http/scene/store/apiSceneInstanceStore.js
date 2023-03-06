import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


export class ApiSceneInstanceStore {

    @observable apiSceneInstanceList = [];
    @observable apiSceneInstanceInfo;
    @observable apiSceneId;

    @action
    findApiSceneInstancePage = async (value) => {
        const params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc'}],
        }
        const res = await Axios.post("/apiSceneInstance/findApiSceneInstancePage",params);
        if(res.code === 0) {
            this.apiSceneInstanceList = res.data.dataList;
        }

        return res
    }


    @action
    findApiSceneInstanceList = async (id) => {
        this.apiSceneId = id;
        const params = {
            apiSceneId: id,
            orderParams:[{name:'createTime', orderType:'desc'}],
        }
        const res = await Axios.post("/apiSceneInstance/findApiSceneInstanceList",params);

        if(res.code === 0) {
            this.apiSceneInstanceList = res.data;
            return res.data
        }
    }

    @action
    findApiSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/apiSceneInstance/findApiSceneInstance",param);
        if( res.code === 0){
            this.apiSceneInstanceInfo = res.data;
            return   res.data;
        }
    }


    @action
    deleteApiSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/apiSceneInstance/deleteApiSceneInstance",param)

    }

}

export const API_SCENEINSTANCE_STORE = 'apiSceneInstanceStore';
