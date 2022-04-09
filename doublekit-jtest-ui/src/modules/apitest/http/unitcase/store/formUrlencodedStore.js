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
    @observable formUrlencodedInfo = [];
    @observable formUrlencodedDataSource = [];
    @observable apiUnitcaseId;
    @observable dataLength;

    @action
    setList = (values) => {
        this.formUrlencodedList = [...values]
    }

    @action
    findFormUrlencodedList = async (id) => {
        this.apiUnitcaseId = id;
        const params = {
            httpId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const newRow =[ { id: 'FormUrlencodedInitRow'}];
        const res = await findFormUrlencodedList(params);

        if(res.code === 0) {
            this.dataLength = res.data.length
            if( res.data.length === 0 ){
                this.formUrlencodedList= newRow;
            }else {
                this.formUrlencodedList = [...this.formUrlencodedDataSource,...newRow];
            }
            return this.formUrlencodedDataSource = res.data;
        }
    }

    @action
    findFormUrlencoded = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findFormUrlencoded(param);
        if( res.code === 0){
            return  this.formUrlencodedInfo = res.data;
        }
    }


    @action
    createFormUrlencoded = async (values) => {
        values.http = {id: this.apiUnitcaseId}

        const res = await createFormUrlencoded(values)
        if( res.code === 0){
            return this.findFormUrlencodedList(this.apiUnitcaseId);
        }
    }

    @action
    updateFormUrlencoded = async (values) => {
        const res = await updateFormUrlencoded(values)
        if( res.code === 0){
            return this.findFormUrlencodedList(this.apiUnitcaseId);
        }
    }

    @action
    deleteFormUrlencoded = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteFormUrlencoded(param)
        if( res.code === 0){
            this.findFormUrlencodedList(this.apiUnitcaseId);
        }
    }

}

export const FORM_URLENCODED_STORE = 'formUrlencodedStore';
