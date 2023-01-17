import { observable,  action } from "mobx";
import {
    findApiSceneInstanceList,
    findApiSceneInstance,
    deleteApiSceneInstance,
    findApiSceneInstancePage
} from '../api/apiSceneInstanceApi'

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
        const res = await findApiSceneInstancePage(params);
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
        const res = await findApiSceneInstanceList(params);

        if(res.code === 0) {
            this.apiSceneInstanceList = res.data;
            return res.data
        }
    }

    @action
    findApiSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiSceneInstance(param);
        if( res.code === 0){
            this.apiSceneInstanceInfo = res.data;
            return   res.data;
        }
    }


    @action
    deleteApiSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteApiSceneInstance(param)

    }

}

export const API_SCENEINSTANCE_STORE = 'apiSceneInstanceStore';
