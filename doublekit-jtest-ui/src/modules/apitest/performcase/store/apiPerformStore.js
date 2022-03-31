import { observable,  action } from "mobx";
import {
    findApiPerformPage,
    createApiPerform,
    findApiPerform,
    updateApiPerform,
    deleteApiPerform
} from '../api/apiPerformApi'

export class ApiPerformStore {

    @observable apiPerformList = [];
    @observable apiPerformInfo;
    @observable apiCategoryId;

    @action
    findApiPerformPage = async (id) => {
        this.apiCategoryId = id;
        const params = {
            categoryId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const res = await findApiPerformPage(params);

        if(res.code === 0) {
            this.apiPerformList = res.data.dataList;
            return res.data
        }
    }

    @action
    findApiPerform = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiPerform(param);
        if( res.code === 0){
            this.apiPerformInfo = res.data;
            return res.data;
        }
    }


    @action
    createApiPerform = async (values) => {
        values.http = {id: this.apiCategoryId}

        const res = await createApiPerform(values)
        if( res.code === 0){
            return this.findApiPerformPage(this.apiCategoryId);
        }
    }

    @action
    updateApiPerform = async (values) => {
        const res = await updateApiPerform(values)
        if( res.code === 0){
            return this.findApiPerformPage(this.apiCategoryId);
        }
    }

    @action
    deleteApiPerform = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteApiPerform(param)
        if( res.code === 0){
            this.findApiPerformPage(this.apiCategoryId);
        }
    }

}

export const API_PERFORM_STORE = 'apiPerformStore';
