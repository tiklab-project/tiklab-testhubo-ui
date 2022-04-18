/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {observable,action} from "mobx";
import {
    findAppSceneStepList,
    findAppSceneStep,
    createAppSceneStep,
    deleteAppSceneStep,
    updateAppSceneStep,
} from '../api/appSceneStepApi';


export class AppSceneStepStore {
    @observable appSceneStepList = [];
    @observable appSceneStepInfo = {};
    @observable categoryId;
    @observable selectItem;

    @action
    findAppSceneStepList = async (id,param) => {
        this.categoryId=id;
        const params = {
            testCaseId: id,
            ...param,
        }
        const res = await findAppSceneStepList(params)
        if(res.code === 0) {
            this.appSceneStepList=res.data;
            return res.data;
        }

    }

    @action
    findAppSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findAppSceneStep(param);
        if(res.code === 0){
            this.appSceneStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createAppSceneStep = async (values) => {
        const res = await createAppSceneStep(values);
        if(res.code === 0){
            this.findAppSceneStepList(this.categoryId)
        }
    }

    @action
    updateAppSceneStep = async (values) => {
        const res = await updateAppSceneStep(values);
        if(res.code === 0){
            this.findAppSceneStepList(this.categoryId);
        }
    }

    @action
    deleteAppSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await deleteAppSceneStep(param);
        if(res.code === 0){
            this.findAppSceneStepList(this.categoryId);
        }
    }

  
}

export const APP_SCENESTEP_STORE = 'appSceneStepStore';
