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
    findAllLocation,
    findActionTypeList
} from '../api/appSceneSceneStepApi';


export class AppSceneSceneStore {
    @observable appSceneStepList = [];
    @observable appSceneStepInfo = {};
    @observable testcaseId;
    @observable locationList;
    @observable fuctionList;
    @observable selectItem;

    @action
    findAppSceneStepList = async (id,param) => {
        this.testcaseId=id;
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
            this.findAppSceneStepList(this.testcaseId)
        }
    }

    @action
    updateAppSceneStep = async (values) => {
        const res = await updateAppSceneStep(values);
        if(res.code === 0){
            this.findAppSceneStepList(this.testcaseId);
        }
    }

    @action
    deleteAppSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await deleteAppSceneStep(param);
        if(res.code === 0){
            this.findAppSceneStepList(this.testcaseId);
        }
    }

    //添加框中，下拉选择框获取所有定位器
    @action
    findAllLocation = async (param) => {
        const res = await findAllLocation(param);
        if(res.code === 0) {
            this.locationList = res.data;
        }
    }

    //添加框中，下拉选择框获取所有方法
    @action
    findActionTypeList = async (param) => {
        const res = await findActionTypeList(param);
        if(res.code === 0) {
            this.fuctionList = res.data;
        }
    }

    @action
    getSelectItem = (data) => {
        this.selectItem = data
    }

}

export const APP_SCENESTEP_STORE = 'appSceneStepStore';
