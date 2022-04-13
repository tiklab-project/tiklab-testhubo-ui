import { observable,  action } from "mobx";
import {
    findResponseHeaderList,
    createResponseHeader,
    findResponseHeader,
    updateResponseHeader,
    deleteResponseHeader
} from '../api/responseHeaderApi';

export class ResponseHeaderStore {
    @observable responseHeaderList = [];
    @observable responseHeaderInfo;
    @observable responseHeaderDataSource = [];
    @observable apiUnitId = '';
    @observable dataLength = '';

    @action
    setList = (values) => {
        this.responseHeaderList = [...values]
    }
    @action
    findResponseHeaderList = async (id) => {
        this.apiUnitId = id;
        const params = {
            apiUnitId: id,
            orderParams:[{ name:'headerName',  orderType:'asc'  }],
        }

        const newRow =[ { id: 'ResponseHeaderInitRow'}]

        const res = await findResponseHeaderList(params);
        if( res.code === 0){
            this.dataLength = res.data.length
            this.responseHeaderDataSource = res.data;

            if( res.data.length === 0){
                this.responseHeaderList=newRow;
            }else {
                this.responseHeaderList = [...res.data,...newRow];
            }
            return res.data;
        }
    }

    @action
    findResponseHeader = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await  findResponseHeader(param)
        if( res.code === 0){
            this.responseHeaderInfo = res.data;
            return res.data;
        }
    }


    @action
    createResponseHeader = async (values) => {
        values.apiUnit = { id:this.apiUnitId }

        const res = await createResponseHeader(values)
        if( res.code === 0){
            return  this.findResponseHeaderList(this.apiUnitId);
        }
    }

    @action
    updateResponseHeader = async (values) => {
        const res = await updateResponseHeader(values)
        if( res.code === 0){
            return this.findResponseHeaderList(this.apiUnitId);
        }
    }

    @action
    deleteResponseHeader = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteResponseHeader(param)
        if( res.code === 0){
            this.findResponseHeaderList(this.apiUnitId);
        }
    }


}

export const RESPONSEHEADER_STORE = 'responseHeaderStore';
