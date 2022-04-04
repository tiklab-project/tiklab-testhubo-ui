/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {observable,action} from "mobx";
import {
    findWebUnitStepList,
    findWebUnitStep,
    createWebUnitStep,
    deleteWebUnitStep,
    updateWebUnitStep,
    findAllLocation,
    findActionTypeList
} from '../api/webUnitStepApi';

export class WebUnitStepStore {
    @observable webUnitStepList = [];
    @observable webUnitStepInfo = {};
    @observable webUnitId;
    @observable locationList;
    @observable fuctionList;
    @observable selectItem;

    @action
    findWebUnitStepList = async (id,param) => {
        this.webUnitId=id;
        const params = {
            webUnitId: id,
            ...param,
        }
        const res = await findWebUnitStepList(params)
        if(res.code === 0) {
            this.webUnitStepList=res.data;
        }
        return res.data
    }

    @action
    findWebUnitStep = (id) => {
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findWebUnitStep(param).then((res) => {
                res.code = undefined;
                if(res.code === 0){
                    that.webUnitStepInfo = res.data;
                    resolve(res.data)
                }
            })
        })
    }

    @action
    createWebUnitStep = (values) => {
        createWebUnitStep(values).then((res) => {
            if(res.code === 0){
                this.findWebUnitStepList(this.webUnitId)
            }
        })
    }

    @action
    updateWebUnitStep = (values) => {
        updateWebUnitStep(values).then((res) => {
            if(res.code === 0){
                this.findWebUnitStepList(this.webUnitId);
            }
        })
    }

    @action
    deleteWebUnitStep = (id) => {
        const param = new FormData();
        param.append('id', id)

        deleteWebUnitStep(param).then((res) => {
            this.findWebUnitStepList(this.webUnitId);
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

export const WEB_UNITSTEP_STORE = 'webUnitStepStore';
