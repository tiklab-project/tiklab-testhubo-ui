/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {observable,action} from "mobx";
import {
    findWebStepList,
    findWebStep,
    createWebStep,
    deleteWebStep,
    updateWebStep,
    findAllLocation,
    findAllTestDictionaries
} from '../api/webStepApi';


export class WebStepStore {
    @observable webStepList = [];
    @observable webStepInfo = {};
    @observable testcaseId;
    @observable locationList;
    @observable fuctionList;
    @observable selectItem;

    @action
    findWebStepList = async (id,param) => {
        this.testcaseId=id;
        const params = {
            testCaseId: id,
            ...param,
        }
        const res = await findWebStepList(params)
        if(res.code === 0) {
            this.webStepList=res.data;
        }
        return res.data
    }

    @action
    findWebStep = (id) => {
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findWebStep(param).then((res) => {
                if(res.code === 0){
                    that.webStepInfo = res.data;
                    resolve(res.data)
                }
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    @action
    createWebStep = (values) => {
        createWebStep(values).then((res) => {
            if(res.code === 0){
                this.findWebStepList(this.testcaseId)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    updateWebStep = (values) => {
        updateWebStep(values).then((res) => {
            if(res.code === 0){
                this.findWebStepList(this.testcaseId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    deleteWebStep = (id) => {
        const param = new FormData();
        param.append('id', id)

        deleteWebStep(param).then((res) => {
            this.findWebStepList(this.testcaseId);
        }).catch(error => {
            console.log(error)
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
    findAllTestDictionaries = () => {
        return findAllTestDictionaries().then(res => {
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

export const WEBSTEP_STORE = 'webStepStore';
