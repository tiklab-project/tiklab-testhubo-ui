/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {observable,action} from "mobx";
import {
    findAppStepList,
    findAppStep,
    createAppStep,
    deleteAppStep,
    updateAppStep,
    findAllLocation,
    findTestDictionariesList
} from '../api/appStepApi';


export class AppStepStore {
    @observable appStepList = [];
    @observable appStepInfo = {};
    @observable testcaseId;
    @observable locationList;
    @observable fuctionList;
    @observable selectItem;

    @action
    findAppStepList = async (id,param) => {
        this.testcaseId=id;
        const params = {
            testCaseId: id,
            ...param,
        }
        const res = await findAppStepList(params)
        if(res.code === 0) {
            this.appStepList=res.data;
            return res.data;
        }

    }

    @action
    findAppStep = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findAppStep(param);
        if(res.code === 0){
            this.appStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createAppStep = async (values) => {
        const res = await createAppStep(values);
        if(res.code === 0){
            this.findAppStepList(this.testcaseId)
        }
    }

    @action
    updateAppStep = async (values) => {
        const res = await updateAppStep(values);
        if(res.code === 0){
            this.findAppStepList(this.testcaseId);
        }
    }

    @action
    deleteAppStep = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await deleteAppStep(param);
        if(res.code === 0){
            this.findAppStepList(this.testcaseId);
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
    findTestDictionariesList = async (param) => {
        const res = await findTestDictionariesList(param);
        if(res.code === 0) {
            this.fuctionList = res.data;
        }
    }

    @action
    getSelectItem = (data) => {
        this.selectItem = data
    }

}

export const APPSTEP_STORE = 'appStepStore';
