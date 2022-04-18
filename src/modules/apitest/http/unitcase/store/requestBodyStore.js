import { observable,  action } from "mobx";
import {
    findRequestBody,
    createRequestBody,
    updateRequestBody
} from '../api/requestBodyApi';

export class RequestBodyStore {
    @observable bodyType ;
    @observable apiUnitId = '';
    @observable requestBodyId = '';

    @action
    findRequestBody = async (id) => {
        this.apiUnitId = id;
        this.requestBodyId= id;

        const param = new FormData();
        param.append('id', id);

        const res  = await findRequestBody(param);
        if( res.code === 0){
            this.bodyType = res.data?.bodyType;
            return res.data?.bodyType;
        }
    }

    @action
    createRequestBody = async (values) => {
        values.apiUnit = {id: this.apiUnitId}
        values.id = this.requestBodyId;

        await createRequestBody(values);
    }

    @action
    updateRequestBody = async (values) => {
        values.apiUnit = {id: this.apiUnitId,}
        values.id= this.requestBodyId;

        await updateRequestBody(values);
    }

}

export const REQUESTBODY_STORE = 'requestBodyStore';
