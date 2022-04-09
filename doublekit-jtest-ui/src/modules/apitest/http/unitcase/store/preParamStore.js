import { observable,  action } from "mobx";
import {
    findPreScript,
    createPreScript,
    updatePreScript
} from '../api/preParamApi';

export class PreParamStore {

    @observable preScriptInfo = [];
    @observable stepId = '';
    @observable preScriptId = '';

    @action
    findPreScript = (id) => {
        this.stepId = id;
        this.preScriptId = id;
        const that =this;

        const param = new FormData();
        param.append('id', id)
        return new Promise(function(resolve, reject){
            findPreScript(param).then((res) => {
                if( res.code === 0){
                    that.preScriptInfo = res.data
                    resolve(res)
                }
            }).catch(error => {
                reject(error)
            })
        })

    }

    @action
    createPreScript = (values) => {
        values.step = {
            id: this.stepId,
        }
        values.id =  this.preScriptId;
        createPreScript(values).then((res) => {
            if( res.code === 0){
                this.findPreScript(this.preScriptId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	updatePreScript = (values) => {
        values.step = {
            id: this.stepId,
        }
        values.id= this.preScriptId;
		updatePreScript(values).then((res) => {
            if( res.code === 0){
                this.findPreScript(this.preScriptId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

}

export const PREPARAM_STORE = 'preParamStore';
