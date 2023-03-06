import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


export class ResponseResultStore {
    @observable responseResultInfo = [];
    @observable apiUnitId = '';
    @observable responseResultId = '';

    @action
    findResponseResult = async (id) => {
        this.apiUnitId = id;
        this.responseResultId = id;
        
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/responseResult/findResponseResult",param);
        if( res.code === 0){
            return res.data;
        }
    }

    @action
    createResponseResult = async (values) => {
        values.apiUnit = {id: this.apiUnitId}
        values.id =  this.responseResultId;

        await Axios.post("/responseResult/createResponseResult",values);
    }

    @action
    updateResponseResult = async (values) => {
        values.apiUnit = {id: this.apiUnitId}
        values.id= this.responseResultId;

        await Axios.post("/responseResult/updateResponseResult",values)
    }

}

export const RESPONSERESULT_STORE = 'responseResultStore';
