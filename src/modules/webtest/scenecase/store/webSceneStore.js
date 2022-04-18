import { observable,  action } from "mobx";
import {
    findWebScenePage,
    createWebScene,
    findWebScene,
    updateWebScene,
    deleteWebScene
} from '../api/webSceneApi'

export class WebSceneStore {

    @observable webSceneList = [];
    @observable webSceneInfo;
    @observable categoryId;

    @action
    findWebScenePage = async (id) => {
        this.categoryId = id;
        const params = {
            categoryId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const res = await findWebScenePage(params);

        if(res.code === 0) {
            this.webSceneList = res.data.dataList;
            return res.data
        }
    }

    @action
    findWebScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findWebScene(param);
        if( res.code === 0){
            return  this.webSceneInfo = res.data;
        }
    }


    @action
    createWebScene = async (values) => {
        values.http = {id: this.categoryId}

        const res = await createWebScene(values)
        if( res.code === 0){
            return this.findWebScenePage(this.categoryId);
        }
    }

    @action
    updateWebScene = async (values) => {
        const res = await updateWebScene(values)
        if( res.code === 0){
            return this.findWebScenePage(this.categoryId);
        }
    }

    @action
    deleteWebScene = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteWebScene(param)
        if( res.code === 0){
            this.findWebScenePage(this.categoryId);
        }
    }

}

export const WEB_SCENE_STORE = 'webSceneStore';
