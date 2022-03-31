import { observable,  action } from "mobx";
import {
    findApiSceneInstanceList,
    createApiSceneInstance,
    findApiSceneInstance,
    updateApiSceneInstance,
    deleteApiSceneInstance
} from '../api/apiSceneInstanceApi'

export class ApiSceneInstanceStore {

    @observable apiSceneInstanceList = [];
    @observable apiSceneInstanceInfo;
    @observable apiUnitcaseId;

    @action
    findApiSceneInstanceList = async (id) => {
        this.apiUnitcaseId = id;
        const params = {
            categoryId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
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
            return  this.apiSceneInstanceInfo = res.data;
        }
    }


    @action
    createApiSceneInstance = async (values) => {
        values.http = {id: this.apiUnitcaseId}

        const res = await createApiSceneInstance(values)
        if( res.code === 0){
            return this.findApiSceneInstancePage(this.apiUnitcaseId);
        }
    }

    @action
    updateApiSceneInstance = async (values) => {
        const res = await updateApiSceneInstance(values)
        if( res.code === 0){
            return this.findApiSceneInstancePage(this.apiUnitcaseId);
        }
    }

    @action
    deleteApiSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteApiSceneInstance(param)
        if( res.code === 0){
            this.findApiSceneInstancePage(this.apiUnitcaseId);
        }
    }

}

export const API_SCENEINSTANCE_STORE = 'apiSceneInstanceStore';
