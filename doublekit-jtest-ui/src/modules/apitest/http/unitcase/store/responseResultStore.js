import { observable,  action } from "mobx";
import {
    findResponseResult,
    createResponseResult,
    updateResponseResult
} from '../api/responseResultApi';

export class ResponseResultStore {
    @observable responseResultInfo = [];
    @observable stepId = '';
    @observable responseResultId = '';

    @action
    findResponseResult = (id) => {
        this.stepId = id;
        this.responseResultId = id;
        const that =this;
        const param = new FormData();
        param.append('id', id)
        return new Promise(function(resolve, reject){
            findResponseResult(param).then((res) => {
                if( res.code === 0){
                    if(res.data !== null){
                        that.responseResultInfo = res.data.resultType;
                    }
                    resolve(res.data);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    createResponseResult = (values) => {
        debugger
        values.step = {
            id: this.stepId,
        }
        values.id =  this.responseResultId;
        createResponseResult(values).then((res) => {
            if( res.code === 0){
                this.findResponseResult(this.responseResultId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	updateResponseResult = (values) => {
        values.step = {
            id: this.stepId,
        }
        values.id= this.responseResultId;
		updateResponseResult(values).then((res) => {
            if( res.code === 0){
                this.findResponseResult(this.responseResultId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

}

export const RESPONSERESULT_STORE = 'responseResultStore';
