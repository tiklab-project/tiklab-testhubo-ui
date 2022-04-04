/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {observable,action} from "mobx";
import {
    findAppUnitStepList,
    findAppUnitStep,
    createAppUnitStep,
    deleteAppUnitStep,
    updateAppUnitStep,
    findAllLocation,
    findActionTypeList
} from '../api/appUnitStepApi';

export class AppUnitStepStore {
    @observable appUnitStepList = [];
    @observable appUnitStepInfo = {};
    @observable appUnitId;
    @observable locationList;
    @observable fuctionList;
    @observable selectItem;

    @action
    findAppUnitStepList = async (id,param) => {
        this.appUnitId=id;
        const params = {
            appUnitId: id,
            ...param,
        }
        const res = await findAppUnitStepList(params)
        if(res.code === 0) {
            this.appUnitStepList=res.data;
        }
        return res.data
    }

    @action
    findAppUnitStep = (id) => {
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findAppUnitStep(param).then((res) => {
                res.code = undefined;
                if(res.code === 0){
                    that.appUnitStepInfo = res.data;
                    resolve(res.data)
                }
            })
        })
    }

    @action
    createAppUnitStep = (values) => {
        createAppUnitStep(values).then((res) => {
            if(res.code === 0){
                this.findAppUnitStepList(this.appUnitId)
            }
        })
    }

    @action
    updateAppUnitStep = (values) => {
        updateAppUnitStep(values).then((res) => {
            if(res.code === 0){
                this.findAppUnitStepList(this.appUnitId);
            }
        })
    }

    @action
    deleteAppUnitStep = (id) => {
        const param = new FormData();
        param.append('id', id)

        deleteAppUnitStep(param).then((res) => {
            this.findAppUnitStepList(this.appUnitId);
        })
    }

    //添加框中，下拉选择框获取所有定位器
    @action
    findAllLocation = () => {
        findAllLocation().then(res => {
            if(res.code === 0) {
                this.locationList = res.data;
            }
        })
    }

    //添加框中，下拉选择框获取所有方法
    @action
    findActionTypeList = (data) => {
        return findActionTypeList(data).then(res => {
            if(res.code === 0) {
                this.fuctionList = res.data;
            }
        })
    }

    @action
    getSelectItem = (data) => {
        this.selectItem = data
    }




}

export const APP_UNITSTEP_STORE = 'appUnitStepStore';
