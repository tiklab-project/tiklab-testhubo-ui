import { observable,  action } from "mobx";
import {
    findRawResponse,
    createRawResponse,
    updateRawResponse
} from '../api/rawResponseApi';

export class RawResponseStore {

    @observable rawResponseInfo = [];
    @observable stepId = '';
    @observable rawResponseId = '';

    @action
    findRawResponse = (id) => {
        this.stepId = id;
        this.rawResponseId = id;
        const that =this;
        const param = new FormData();
        param.append('id', id)
        return new Promise(function(resolve, reject){
            findRawResponse(param).then((res) => {
                if( res.code === 0){
                    that.rawResponseInfo = res.data
                    resolve(res);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }
    @action
    createRawResponse = (values) => {
        values.step = {
            id: this.stepId,
        }
        values.id =  this.rawResponseId;
        createRawResponse(values).then((res) => {
            if( res.code === 0){
                this.findRawResponse(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	updateRawResponse = (values) => {
        values.step = {
            id: this.stepId,
        }
        values.id =  this.rawResponseId;
		updateRawResponse(values).then((res) => {
            if( res.code === 0){
                this.findRawResponse(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

}

export const RAWRESPONSE_STORE = 'rawResponseStore';
