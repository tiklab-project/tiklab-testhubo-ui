import { observable,  action } from "mobx";
import {
    findFormUrlencodedList,
    createFormUrlencoded,
    findFormUrlencoded,
    updateFormUrlencoded,
    deleteFormUrlencoded
} from '../api/formUrlencodedApi'

export class FormUrlencodedStore {

    @observable formUrlencodedList = [];
    @observable formUrlencodedInfo;
    @observable formUrlencodedDataSource = [];
    @observable apiUnitId;
    @observable dataLength;

    @action
    setList = (values) => {
        this.formUrlencodedList = [...values]
    }


    //处理list
    @action
    processFormUrlencodedList = (data)=>{
        if(!data){
            return;
        }

        const newRow =[ { id: 'InitNewRowId'}];

        this.formUrlencodedDataSource = data;
        this.formUrlencodedList=[...data,...newRow];
    }


    @action
    findFormUrlencodedList = async (id) => {
        this.apiUnitId = id;
        const params = {
            apiUnitId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }

        const res = await findFormUrlencodedList(params);
        if(res.code === 0) {
            this.dataLength = res.data.length
            this.processFormUrlencodedList(res.data)
            return res.data;
        }
    }

    @action
    findFormUrlencoded = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findFormUrlencoded(param);
        if( res.code === 0){
            this.formUrlencodedInfo = res.data;
            return res.data;
        }
    }


    @action
    createFormUrlencoded = async (values) => {
        values.apiUnit = {id: this.apiUnitId}

        const res = await createFormUrlencoded(values)
        if( res.code === 0){
            return this.findFormUrlencodedList(this.apiUnitId);
        }
    }

    @action
    updateFormUrlencoded = async (values) => {
        const res = await updateFormUrlencoded(values)
        if( res.code === 0){
            return this.findFormUrlencodedList(this.apiUnitId);
        }
    }

    @action
    deleteFormUrlencoded = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteFormUrlencoded(param)
        if( res.code === 0){
            this.findFormUrlencodedList(this.apiUnitId);
        }
    }

}

export const FORM_URLENCODED_STORE = 'formUrlencodedStore';
