import { observable,  action } from "mobx";
import {
    findFuncScenePage,
    createFuncScene,
    findFuncScene,
    updateFuncScene,
    deleteFuncScene
} from '../api/funcSceneApi'

export class FuncSceneStore {

    @observable funcSceneList = [];
    @observable funcSceneInfo;
    @observable categoryId;

    @action
    findFuncScenePage = async (id) => {
        this.categoryId = id;
        const params = {
            categoryId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const res = await findFuncScenePage(params);

        if(res.code === 0) {
            this.funcSceneList = res.data.dataList;
            return res.data
        }
    }

    @action
    findFuncScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findFuncScene(param);
        if( res.code === 0){
            return  this.funcSceneInfo = res.data;
        }
    }


    @action
    createFuncScene = async (values) => {
        values.http = {id: this.categoryId}

        const res = await createFuncScene(values)
        if( res.code === 0){
            return this.findFuncScenePage(this.categoryId);
        }
    }

    @action
    updateFuncScene = async (values) => {
        const res = await updateFuncScene(values)
        if( res.code === 0){
            return this.findFuncScenePage(this.categoryId);
        }
    }

    @action
    deleteFuncScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteFuncScene(param)
        if( res.code === 0){
            this.findFuncScenePage(this.categoryId);
        }
    }

}

export const FUNC_SCENE_STORE = 'funcSceneStore';
