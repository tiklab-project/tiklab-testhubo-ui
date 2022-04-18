/**
 * @description：
 * @date: 2021-08-20 16:01
 */
import {observable,action} from "mobx";
import {
    findQuartzTestcaseList,
    findQuartzTestcase,
    createQuartzTestcase,
    deleteQuartzTestcase,
    updateQuartzTestcase, findRepositoryTestcaseList
} from '../api/quartzTestcaseApi';


export class QuartzTestcaseStore {
    @observable quartzTestcaseList = [];
    @observable quartzTestcaseInfo = {};
    @observable totalRecord ;
    @observable saveParam;
    @observable quartzMasterId;
    @observable repositoryTestcaseList;

    @action
    findQuartzTestcaseList = (quartzMasterId) => {
        this.quartzMasterId = quartzMasterId
        const params = {quartzMasterId:quartzMasterId}

        const that = this;
        return new Promise(function(resolve, reject){
            findQuartzTestcaseList(params).then(res => {
                if(res.code === 0) {
                    that.quartzTestcaseList = res.data;
                    resolve(res);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    findRepositoryTestcaseList = async (param) => {
       const res = await findRepositoryTestcaseList(param)
        if(res.code === 0) {
            this.repositoryTestcaseList = res.data;
        }
        return res.data
    }

    @action
    findQuartzTestcase = (id) => {
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findQuartzTestcase(param).then((res) => {
                if(res.code === 0){
                    that.quartzTestcaseInfo = res.data;
                    resolve(res.data)
                }
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    @action
    createQuartzTestcase = (values) => {
        createQuartzTestcase(values).then((res) => {
            if(res.code === 0){
                this.findQuartzTestcaseList(this.quartzMasterId,)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    updateQuartzTestcase = (values) => {
        updateQuartzTestcase(values).then((res) => {
            if(res.code === 0){
                this.findQuartzTestcaseList(this.quartzMasterId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    deleteQuartzTestcase = (id) => {
        const param = new FormData();
        param.append('id', id)

        deleteQuartzTestcase(param).then((res) => {
            this.findQuartzTestcaseList(this.quartzMasterId);
        }).catch(error => {
            console.log(error)
        })
    }

}

export const QUARTZTESTCASE_STORE = 'quartzTestcaseStore';
