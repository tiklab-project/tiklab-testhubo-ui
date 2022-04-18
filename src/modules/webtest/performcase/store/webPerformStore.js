import { observable,  action } from "mobx";
import {
    findWebPerformPage,
    createWebPerform,
    findWebPerform,
    updateWebPerform,
    deleteWebPerform
} from '../api/webPerformApi'

export class WebPerformStore {

    @observable webPerformList = [];
    @observable webPerformInfo;
    @observable categoryId;

    @action
    findWebPerformPage = async (id) => {
        this.categoryId = id;
        const params = {
            categoryId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const res = await findWebPerformPage(params);

        if(res.code === 0) {
            this.webPerformList = res.data.dataList;
            return res.data
        }
    }

    @action
    findWebPerform = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findWebPerform(param);
        if( res.code === 0){
            return  this.webPerformInfo = res.data;
        }
    }


    @action
    createWebPerform = async (values) => {
        values.http = {id: this.categoryId}

        const res = await createWebPerform(values)
        if( res.code === 0){
            return this.findWebPerformPage(this.categoryId);
        }
    }

    @action
    updateWebPerform = async (values) => {
        const res = await updateWebPerform(values)
        if( res.code === 0){
            return this.findWebPerformPage(this.categoryId);
        }
    }

    @action
    deleteWebPerform = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteWebPerform(param)
        if( res.code === 0){
            this.findWebPerformPage(this.categoryId);
        }
    }

}

export const WEB_PERFORM_STORE = 'webPerformStore';
