
import { observable,  action } from "mobx";
import {
    findAfterScript,
    createAfterScript,
    updateAfterScript
} from '../api/afterParamApi';

export class AfterParamStore {

    @observable afterScriptInfo;
    @observable stepId = '';

    @action
    findAfterScript = async (id) => {
        this.apiUnitId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findAfterScript(param);
        if( res.code === 0 ){
            this.afterScriptInfo = res.data;
            return res.data;
        }
    }

    @action
    createAfterScript = async (values) => {
        values.apiUnit = {id: this.apiUnitId};
        values.id =  this.apiUnitId;

        await createAfterScript(values);
    }

    @action
    updateAfterScript = async (values) => {
        values.apiUnit = {id: this.apiUnitId};
        values.id= this.apiUnitId;

        await updateAfterScript(values);
    }
}

export const AFTERPARAM_STORE = 'afterParamStore';
