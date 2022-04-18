import { observable,  action } from "mobx";
import {
    findAppScenePage,
    createAppScene,
    findAppScene,
    updateAppScene,
    deleteAppScene
} from '../api/appSceneApi'

export class AppSceneStore {

    @observable appSceneList = [];
    @observable appSceneInfo;
    @observable categoryId;

    @action
    findAppScenePage = async (id) => {
        this.categoryId = id;
        const params = {
            categoryId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const res = await findAppScenePage(params);

        if(res.code === 0) {
            this.appSceneList = res.data.dataList;
            return res.data
        }
    }

    @action
    findAppScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findAppScene(param);
        if( res.code === 0){
            return  this.appSceneInfo = res.data;
        }
    }


    @action
    createAppScene = async (values) => {
        values.http = {id: this.categoryId}

        const res = await createAppScene(values)
        if( res.code === 0){
            return this.findAppScenePage(this.categoryId);
        }
    }

    @action
    updateAppScene = async (values) => {
        const res = await updateAppScene(values)
        if( res.code === 0){
            return this.findAppScenePage(this.categoryId);
        }
    }

    @action
    deleteAppScene = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteAppScene(param)
        if( res.code === 0){
            this.findAppScenePage(this.categoryId);
        }
    }

}

export const APP_SCENE_STORE = 'appSceneStore';
