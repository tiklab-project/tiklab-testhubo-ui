import { observable,  action } from "mobx";
import {
    findRequestHeaderList,
    createRequestHeader,
    findRequestHeader,
    updateRequestHeader,
    deleteRequestHeader
} from '../api/requestHeaderApi';

export  class RequestHeaderStore {
    @observable headerList = [];
    @observable requestHeaderInfo = [];
    @observable headerSourceList = [];
    @observable apiUnitId;
    @observable dataLength;

    @action
    setList = (values) => {
        this.headerList = [...values]
    }

    @action
    findRequestHeaderList = async (id) => {
        this.apiUnitId = id;
        const params = {
            apiUnitId: id,
            orderParams:[{ name:'headerName', orderType:'asc'}],
        }

        const newRow =[ { id: 'InitNewRowId'}];

        const res = await findRequestHeaderList(params);

        if( res.code===0 ){
            this.dataLength = res.data.length
            this.headerSourceList = res.data;

            if( res.data.length === 0){
                this.headerList=newRow;
            }else {
                this.headerList = [...res.data,...newRow];
            }

            return res.data
        }
    }

    @action
    findRequestHeader = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findRequestHeader(param)
        if( res.code === 0){
            this.requestHeaderInfo = res.data;
            return res.data;
        }
    }

    @action
    createRequestHeader = async (values) => {
        values.apiUnit = {id:this.apiUnitId}
        const res = await createRequestHeader(values)
        if( res.code === 0){
            return this.findRequestHeaderList(this.apiUnitId);
        }
    }

    @action
    updateRequestHeader = async (values) => {
        const res = await updateRequestHeader(values)
        if( res.code === 0){
            return this.findRequestHeaderList(this.apiUnitId);
        }
    }

    @action
    deleteRequestHeader = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await deleteRequestHeader(param)
        if(res.code === 0){
            this.findRequestHeaderList(this.apiUnitId);
        }
    }



}

export const REQUESTHEADER_STORE = 'requestHeaderStore';
