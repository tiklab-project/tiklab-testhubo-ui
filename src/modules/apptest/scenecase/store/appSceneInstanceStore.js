import { observable,  action } from "mobx";
import {
    findAppSceneInstancePage,
    createAppSceneInstance,
    findAppSceneInstance,
    updateAppSceneInstance,
    deleteAppSceneInstance,
    findAppSceneInstanceList
} from '../api/appSceneInstanceApi'

export class AppSceneInstanceStore {

    @observable appSceneInstanceList = [];
    @observable params

    @action
    findAppSceneInstancePage = async (value) => {
        let params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await findAppSceneInstancePage(params );
        if(res.code === 0) {
            this.appSceneInstanceList = res.data.dataList;
        }
        
        return res
    }

    @action
    findAppSceneInstanceList = async (id) =>{
        let param = {
            "testcaseId":id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findAppSceneInstanceList(param);
        if(res.code===0){
            this.appSceneInstanceList = res.data;
            return res.data;
        }
    }

    @action
    findAppSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findAppSceneInstance(param)
        if(res.code === 0){
            return res.data;
        }
    }

    @action
    deleteAppSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteAppSceneInstance(param)
    }


}


export const APP_SCENEINSTANCE_STORE = 'appSceneInstanceStore';