import { observable,  action } from "mobx";
import {
    findRequestBody,
    createRequestBody,
    updateRequestBody
} from '../api/requestBodyApi';

export class RequestBodyStore {
    @observable requestBodyInfo = [];
    @observable stepId = '';
    @observable requestBodyId = '';

    @action
    findRequestBody = (id) => {
        this.stepId = id;
        this.requestBodyId = id;
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findRequestBody(param).then((res) => {
                if( res.code === 0){
                    if(res.data !== null){
                        that.requestBodyInfo = res.data.bodyType;
                    }
                    resolve(res.data);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    createRequestBody = (values) => {
        values.step = {
            id: this.stepId,
        }
        values.id =  this.requestBodyId;
        createRequestBody(values).then((res) => {
            if( res.code === 0){
                this.findRequestBody(this.requestBodyId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	updateRequestBody = (values) => {
        values.step = {
            id: this.stepId,
        }
        values.id= this.requestBodyId;
		updateRequestBody(values).then((res) => {
            if( res.code === 0){
                this.findRequestBody(this.requestBodyId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

}

export const REQUESTBODY_STORE = 'requestBodyStore';
