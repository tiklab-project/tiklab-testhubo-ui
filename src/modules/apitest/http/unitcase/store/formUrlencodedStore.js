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
    @observable apiUnitcaseId;
    @observable dataLength;

    @action
    setList = (values) => {
        this.formUrlencodedList = [...values]
    }

    @action
    findFormUrlencodedList = async (id) => {
        this.apiUnitId = id;
        const params = {
            apiUnitId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const newRow =[ { id: 'FormUrlencodedInitRow'}];
        const res = await findFormUrlencodedList(params);
        if(res.code === 0) {
            this.dataLength = res.data.length
            this.formUrlencodedDataSource = res.data;
            if( res.data.length === 0 ){
                this.formUrlencodedList= newRow;
            }else {
                this.formUrlencodedList = [...res.data,...newRow];
            }
            return  res.data;
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
