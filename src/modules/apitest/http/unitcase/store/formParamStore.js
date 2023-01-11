import { observable,  action } from "mobx";
import {
    findFormParamList,
    createFormParam,
    findFormParam,
    updateFormParam,
    deleteFormParam
} from '../api/formParamApi'

export class FormParamStore {

    @observable formParamList = [];
    @observable formParamInfo ;
    @observable formParamDataSource = [];
    @observable apiUnitId = '';
    @observable dataLength ;

    @action
    setList = (values) => {
        this.formParamList = [...values]
    }

    //处理list
    @action
    processFormList = (data)=>{
        if(!data){
            return;
        }

        const newRow =[ { id: 'InitNewRowId'}];

        this.formParamDataSource = data;
        this.formParamList=[...data,...newRow];
    }


    @action
    findFormParamList = async (id) => {
        this.apiUnitId = id;
        const params = {
            apiUnitId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }

        const res = await findFormParamList(params);
        if(res.code === 0) {
            this.dataLength = res.data.length;
            this.processFormList(res.data);
            return res.data;
        }
    }

    @action
    findFormParam = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findFormParam(param)
        if( res.code === 0){
            this.formParamInfo = res.data;
            return  res.data;
        }
    }


    @action
    createFormParam = async (values) => {
        values.apiUnit = {id: this.apiUnitId}

        const res = await createFormParam(values);
        if( res.code === 0){
            return  this.findFormParamList(this.apiUnitId);
        }
    }

    @action
    updateFormParam = async (values) => {
        const res = await updateFormParam(values)
        if( res.code === 0){
            return this.findFormParamList(this.apiUnitId);
        }
    }

    @action
    deleteFormParam = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteFormParam(param)
        if( res.code === 0){
            this.findFormParamList(this.apiUnitId);
        }
    }

}

export const FORMPARAM_STORE = 'formParamStore';
