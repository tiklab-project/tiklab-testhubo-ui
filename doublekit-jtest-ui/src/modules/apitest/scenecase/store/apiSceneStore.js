import { observable,  action } from "mobx";
import {
    findApiScenePage,
    createApiScene,
    findApiScene,
    updateApiScene,
    deleteApiScene
} from '../api/apiSceneApi'

export class ApiSceneStore {

    @observable apiSceneList = [];
    @observable apiSceneInfo;
    @observable apiUnitcaseId;

    @action
    findApiScenePage = async (id) => {
        this.apiUnitcaseId = id;
        const params = {
            categoryId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const res = await findApiScenePage(params);

        if(res.code === 0) {
            this.apiSceneList = res.data.dataList;
            return res.data
        }
    }

    @action
    findApiScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiScene(param);
        if( res.code === 0){
            return  this.apiSceneInfo = res.data;
        }
    }


    @action
    createApiScene = async (values) => {
        values.http = {id: this.apiUnitcaseId}

        const res = await createApiScene(values)
        if( res.code === 0){
            return this.findApiScenePage(this.apiUnitcaseId);
        }
    }

    @action
    updateApiScene = async (values) => {
        const res = await updateApiScene(values)
        if( res.code === 0){
            return this.findApiScenePage(this.apiUnitcaseId);
        }
    }

    @action
    deleteApiScene = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteApiScene(param)
        if( res.code === 0){
            this.findApiScenePage(this.apiUnitcaseId);
        }
    }

}

export const APISCENE_STORE = 'apiSceneStore';
