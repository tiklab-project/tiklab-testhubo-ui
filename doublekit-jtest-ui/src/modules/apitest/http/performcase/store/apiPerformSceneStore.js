import { observable,  action } from "mobx";
import {
    findApiPerformScenePage,
    createApiPerformScene,
    findApiPerformScene,
    updateApiPerformScene,
    deleteApiPerformScene
} from '../api/apiPerformSceneApi'

export class ApiPerformSceneStore {

    @observable apiPerformSceneList = [];
    @observable apiPerformSceneInfo;
    @observable apiCategoryId;

    @action
    findApiPerformScenePage = async (id) => {
        this.apiCategoryId = id;
        const params = {
            categoryId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const res = await findApiPerformScenePage(params);

        if(res.code === 0) {
            this.apiPerformSceneList = res.data.dataList;
            return res.data
        }
    }

    @action
    findApiPerformScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiPerformScene(param);
        if( res.code === 0){
            this.apiPerformSceneInfo = res.data;
            return res.data;
        }
    }


    @action
    createApiPerformScene = async (values) => {
        values.http = {id: this.apiCategoryId}

        const res = await createApiPerformScene(values)
        if( res.code === 0){
            return this.findApiPerformScenePage(this.apiCategoryId);
        }
    }

    @action
    updateApiPerformScene = async (values) => {
        const res = await updateApiPerformScene(values)
        if( res.code === 0){
            return this.findApiPerformScenePage(this.apiCategoryId);
        }
    }

    @action
    deleteApiPerformScene = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteApiPerformScene(param)
        if( res.code === 0){
            this.findApiPerformScenePage(this.apiCategoryId);
        }
    }

}

export const API_PERFORMSCENE_STORE = 'apiPerformSceneStore';
