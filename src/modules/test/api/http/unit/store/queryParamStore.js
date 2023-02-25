import { observable,  action } from "mobx";
import {
    findQueryParamList,
    createQueryParam,
    findQueryParam,
    updateQueryParam,
    deleteQueryParam
} from '../api/queryParamApi';

export class QueryParamStore {

    @observable queryParamList = [];
    @observable queryParamInfo = [];
    @observable queryParamDataSource = [];
    @observable apiUnitId = '';
    @observable dataLength = '';

    @action
    setList = (values) => {
        this.queryParamList = [...values]
    }


    @action
    processList = (data)=>{
        if(!data){
            return;
        }

        const newRow =[ { id: 'InitNewRowId'}];

        this.queryParamDataSource = data;
        this.queryParamList=[...data,...newRow];
    }

    @action
    findQueryParamList = async (id) => {
        this.apiUnitId = id;
        const params = {
            apiUnitId: id,
            orderParams:[{ name:'paramName',  orderType:'asc' }],
        }

        const res = await  findQueryParamList(params)

        if( res.code === 0) {
            this.dataLength = res.data.length
            this.processList(res.data);
            return res.data;
        }
    }

    @action
    findQueryParam = async (id) => {
        const that =this;
        const param = new FormData();
        param.append('id', id)

        const res = await findQueryParam(param);
        if( res.code === 0){
            that.queryParamInfo = res.data;
            return res.data
        }
    }


    @action
    createQueryParam = async (values) => {
        values.apiUnit = {id:this.apiUnitId}

        const res = await createQueryParam(values)
        if( res.code === 0){
            return this.findQueryParamList(this.apiUnitId);
        }
    }

    @action
    updateQueryParam = async (values) => {
        const res = await updateQueryParam(values)
        if( res.code === 0){
            return this.findQueryParamList(this.apiUnitId);
        }
    }

    @action
    deleteQueryParam = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await deleteQueryParam(param);
        if( res.code === 0){
            this.findQueryParamList(this.apiUnitId);
        }
    }



}

export const QUERYPARAM_STORE = 'queryParamStore';
