/**
 * @description：
 * @date: 2021-08-13 10:17
 */
import {observable,action} from "mobx";
import {
    deleteTestInstance,
    findApiInstanceDetail,
    findInstanceByReposterId,
    findApiInstanceCollentById,
    findInstancesByTestCaseId,
    findApiInstanceById,
    findWebInstanceById,
    findResultByInstanceId,
    findApiResultByInstanceId
} from '../api/testInstanceApi';

export class TestInstanceStore {
    @observable testReportList;
    @observable testInstanceInfo;
    @observable passFailedList;
    @observable totalRecord;
    @observable Rparams;
    @observable testCaseId

    @action
    findApiInstanceDetail = (id) => {
        const that =this;
        const param = {
            stepId:id
        }
        return new Promise(function(resolve, reject){
            findApiInstanceDetail(param).then((res) => {
                if(res.code === 0){
                    that.testInstanceInfo = res.data;
                    resolve(res.data)
                }
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    @action
    findInstancesReposter = async (id) => {
        this.testCaseId = id;
        this.Rparams= { gather:1}
        const params = {
            testCaseId: id,
            gather:1,
        }
        const res = await findInstancesByTestCaseId(params)
        if(res.code === 0){
            this.testReportList = res.data;
            return res.data
        }
    }


    @action
    findApiInstanceById = async (id) => {
        const param = new FormData();
        param.append("instanceId",id);

        const res = await findApiInstanceById(param);
        if(res.code === 0){
            this.passFailedList = res.data;
        }
        return res.data
    }

    @action
    deleteTestInstance = (id) => {
        const param = new FormData();
        param.append('id', id)

        deleteTestInstance(param).then((res) => {
            this.findInstancesReposter(this.testCaseId, this.Rparams);
        }).catch(error => {
            console.log(error)
        })
    }


    @action
    findReposter = (id,param) => {
        this.repositoryId = id;
        this.Rparams= {...param, gather:1}
        const params = {
            repositoryId: id,
            ...param,
            gather:1,
        }
        const that =this;
        return new Promise(function(resolve, reject){
            findInstanceByReposterId(params).then((res) => {
                if(res.code === 0){
                    that.testReportList = res.data.dataList;
                    that.totalRecord = res.data.totalRecord
                    resolve(res.data)
                }
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    @action
    deleteTestReport = (id) => {
        const param = new FormData();
        param.append('id', id)

        deleteTestInstance(param).then((res) => {
            this.findReposter(this.repositoryId, this.Rparams);
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    findWebInstanceById=async (id) =>{
        const param = {"instanceId":id}
        const res = await findWebInstanceById(param);
        if(res.code===0&&res.data){
            return res.data
        }
    }

    @action
    findResultByInstanceId= async (id) =>{
        const param = new FormData();
        param.append("instanceId",id)
        const res = await findResultByInstanceId(param);
        if(res.code===0&&res.data){
            return res.data
        }
    }

    @action
    findApiResultByInstanceId= async (id) =>{
        const param = new FormData();
        param.append("instanceId",id)
        const res = await findApiResultByInstanceId(param);
        if(res.code===0&&res.data){
            return res.data
        }
    }

}

export const TESTINSTANCE_STORE = 'testInstanceStore';
