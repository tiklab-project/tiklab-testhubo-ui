import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


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

        const res = await Axios.post("/requestHeader/findRequestHeaderList",params);

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
        const res = await Axios.post("/requestHeader/findRequestHeader",param)
        if( res.code === 0){
            this.requestHeaderInfo = res.data;
            return res.data;
        }
    }

    @action
    createRequestHeader = async (values) => {
        values.apiUnit = {id:this.apiUnitId}
        const res = await Axios.post("/requestHeader/createRequestHeader",values)
        if( res.code === 0){
            return this.findRequestHeaderList(this.apiUnitId);
        }
    }

    @action
    updateRequestHeader = async (values) => {
        const res = await Axios.post("/requestHeader/updateRequestHeader",values)
        if( res.code === 0){
            return this.findRequestHeaderList(this.apiUnitId);
        }
    }

    @action
    deleteRequestHeader = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await Axios.post("/requestHeader/deleteRequestHeader",values)
        if(res.code === 0){
            this.findRequestHeaderList(this.apiUnitId);
        }
    }



}

export const REQUESTHEADER_STORE = 'requestHeaderStore';
