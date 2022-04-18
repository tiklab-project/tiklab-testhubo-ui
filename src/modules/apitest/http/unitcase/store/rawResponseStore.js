import { observable,  action } from "mobx";
import {
    findRawResponse,
    createRawResponse,
    updateRawResponse
} from '../api/rawResponseApi';

export class RawResponseStore {

    @observable rawResponseInfo = [];
    @observable apiUnitId = '';
    @observable rawResponseId = '';

    @action
    findRawResponse = async (id) => {
        this.apiUnitId = id;
        this.rawResponseId = id;

        const param = new FormData();
        param.append('id', id)

        const res = await findRawResponse(param);
        if( res.code === 0){
            return this.rawResponseInfo = res.data
        }
    }

    @action
    createRawResponse = (values) => {
        values.apiUnit = {id: this.apiUnitId}
        values.id =  this.rawResponseId;

        createRawResponse(values).then((res) => {
            if( res.code === 0){
                this.findRawResponse(this.apiUnitId);
            }
        })
    }

    @action
    updateRawResponse = (values) => {
        values.apiUnit = { id: this.apiUnitId}
        values.id =  this.rawResponseId;

        updateRawResponse(values).then((res) => {
            if( res.code === 0){
                this.findRawResponse(this.apiUnitId);
            }
        })
    }

}

export const RAWRESPONSE_STORE = 'rawResponseStore';
