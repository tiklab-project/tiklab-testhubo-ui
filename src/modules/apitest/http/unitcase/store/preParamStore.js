import { observable,  action } from "mobx";
import {
    findPreScript,
    createPreScript,
    updatePreScript
} from '../api/preParamApi';

export class PreParamStore {

    @observable preScriptInfo;
    @observable apiUnitId = '';

    @action
    findPreScript = async (id) => {
        this.apiUnitId = id;
        
        const param = new FormData();
        param.append('id', id);

        const res = await findPreScript(param);
        if( res.code === 0){
            this.preScriptInfo = res.data;
            return  res.data;
        }
    }

    @action
    createPreScript = async (values) => {
        values.apiUnit = {id: this.apiUnitId};
        values.id =  this.apiUnitId;

        await createPreScript(values);
    }

    @action
    updatePreScript = async (values) => {
        values.apiUnit = {id: this.apiUnitId}
        values.id = this.apiUnitId;

        await updatePreScript(values);
    }

}

export const PREPARAM_STORE = 'preParamStore';
