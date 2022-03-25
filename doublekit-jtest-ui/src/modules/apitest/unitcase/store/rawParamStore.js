import { observable,  action } from "mobx";
import {
    findRawParam,
    createRawParam,
    updateRawParam
} from '../api/rawParamApi';

export class RawParamStore {

    @observable rawParamInfo = [];
    @observable stepId = '';
    @observable rawParamId = '';

    @action
    findRawParam = (id) => {
        this.stepId = id;
        this.rawParamId = id;
        const that =this;
        const param = new FormData();
        param.append('id', id)
        return new Promise(function(resolve, reject){
            findRawParam(param).then((res) => {
                if( res.code ===0){
                    that.rawParamInfo = res.data
                    resolve(res.data)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    createRawParam = (values) => {
        values.step = {
            id: this.stepId,
        }
        values.id =  this.rawParamId;
        createRawParam(values).then((res) => {
            if( res.code === 0){
                this.findRawParam(this.rawParamId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	updateRawParam = (values) => {
        values.step = {
            id: this.stepId,
        }
        values.id= this.rawParamId;
		updateRawParam(values).then((res) => {
            if( res.code === 0){
                this.findRawParam(this.rawParamId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

}

export const RAWPARAM_STORE = 'rawParamStore';
