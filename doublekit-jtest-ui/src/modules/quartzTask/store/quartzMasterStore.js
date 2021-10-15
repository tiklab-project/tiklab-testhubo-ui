/**
 * @description：
 * @date: 2021-08-18 16:53
 */
import {observable,action} from "mobx";
import {
    findQuartzMasterPage,
    findQuartzMaster,
    createQuartzMaster,
    deleteQuartzMaster,
    updateQuartzMaster
}from '../api/quartzMasterApi';


export class QuartzMasterStore {
    @observable quartzMasterList = [];
    @observable quartzMasterInfo = {};
    @observable totalRecord ;
    @observable saveParam;
    @observable repositoryId;

    @action
    findQuartzMasterPage = (repositoryId,param) => {
        this.saveParam = param
        this.repositoryId = repositoryId
        const params = {
            ...param,
            repositoryId:repositoryId,
            orderParams: [{
                name:'name',
                orderType:'asc'
            }],
        }

        const that = this;
        return new Promise(function(resolve, reject){
            findQuartzMasterPage(params).then(res => {
                if(res.code === 0) {
                    that.quartzMasterList = res.data.dataList;
                    that.totalRecord = res.data.totalRecord;
                    resolve(res);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    findQuartzMaster = (id) => {
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findQuartzMaster(param).then((res) => {
                if(res.code === 0){
                    that.quartzMasterInfo = res.data;
                    resolve(res.data)
                }
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    @action
    createQuartzMaster = (values) => {
        return createQuartzMaster(values).then((res) => {
            if(res.code === 0){
                this.findQuartzMasterPage(this.repositoryId,this.saveParam)
            }
            return res
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    updateQuartzMaster = (values) => {
        updateQuartzMaster(values).then((res) => {
            if(res.code === 0){
                this.findQuartzMasterPage(this.repositoryId,this.saveParam);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    deleteQuartzMaster = (id) => {
        const param = new FormData();
        param.append('id', id)

        deleteQuartzMaster(param).then((res) => {
            this.findQuartzMasterPage(this.repositoryId,this.saveParam);
        }).catch(error => {
            console.log(error)
        })
    }

}

export const QUARTZTASK_STORE = 'quartzMasterStore';
