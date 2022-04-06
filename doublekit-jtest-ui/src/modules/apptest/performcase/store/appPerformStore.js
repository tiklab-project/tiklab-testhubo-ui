import { observable,  action } from "mobx";
import {
    findAppPerformPage,
    createAppPerform,
    findAppPerform,
    updateAppPerform,
    deleteAppPerform
} from '../api/appPerformApi'

export class AppPerformStore {

    @observable appPerformList = [];
    @observable appPerformInfo;
    @observable categoryId;

    @action
    findAppPerformPage = async (id) => {

        this.categoryId = id;
        const params = {
            categoryId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const res = await findAppPerformPage(params);

        if(res.code === 0) {
            this.appPerformList = res.data.dataList;
            return res.data
        }
    }

    @action
    findAppPerform = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findAppPerform(param);
        if( res.code === 0){
            return  this.appPerformInfo = res.data;
        }
    }


    @action
    createAppPerform = async (values) => {
        values.http = {id: this.categoryId}

        const res = await createAppPerform(values)
        if( res.code === 0){
            return this.findAppPerformPage(this.categoryId);
        }
    }

    @action
    updateAppPerform = async (values) => {
        const res = await updateAppPerform(values)
        if( res.code === 0){
            return this.findAppPerformPage(this.categoryId);
        }
    }

    @action
    deleteAppPerform = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteAppPerform(param)
        if( res.code === 0){
            this.findAppPerformPage(this.categoryId);
        }
    }

}

export const APP_PERFORM_STORE = 'appPerformStore';
