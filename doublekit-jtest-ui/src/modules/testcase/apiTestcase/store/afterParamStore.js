
import { observable,  action } from "mobx";
import {
    findAfterScript,
    createAfterScript,
    updateAfterScript
} from '../api/afterParamApi';

export class AfterParamStore {

    @observable afterScriptInfo = [];
    @observable stepId = '';
    @observable afterScriptId = '';

    @action
    findAfterScript = (id) => {
        this.stepId = id;
        this.afterScriptId = id;
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findAfterScript(param).then((res) => {
                if( res.code === 0 ){
                    that.afterScriptInfo = res.data
                    resolve(res);
                }
            }).catch(error => {
                reject(error)
            })
        })

    }

    @action
    createAfterScript = (values) => {
        values.step = {
            id: this.stepId,
        }
        values.id =  this.afterScriptId;
        createAfterScript(values).then((res) => {
            if( res.code === 0 ){
                this.findAfterScript(this.afterScriptId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	updateAfterScript = (values) => {
        values.step = {
            id: this.stepId,
        }
        values.id= this.afterScriptId;
		updateAfterScript(values).then((res) => {
            if( res.code === 0){
                this.findAfterScript(this.afterScriptId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

}

export const AFTERPARAM_STORE = 'afterParamStore';
