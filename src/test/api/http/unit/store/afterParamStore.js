
import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class AfterParamStore {

    @observable afterScriptInfo;
    @observable stepId = '';

    @action
    findAfterScript = async (id) => {
        this.apiUnitId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/afterScript/findAfterScript",param);
        if( res.code === 0 ){
            this.afterScriptInfo = res.data;
            return res.data;
        }
    }

    @action
    createAfterScript = async (values) => {
        values.apiUnit = {id: this.apiUnitId};
        values.id =  this.apiUnitId;

        await Axios.post("/afterScript/createAfterScript",values);
    }

    @action
    updateAfterScript = async (values) => {
        values.apiUnit = {id: this.apiUnitId};
        values.id= this.apiUnitId;

        await Axios.post("/afterScript/updateAfterScript",values);
    }
}

export const AFTERPARAM_STORE = 'afterParamStore';
