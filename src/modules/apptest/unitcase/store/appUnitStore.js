import { observable,  action } from "mobx";
import {
    findAppUnitPage,
    createAppUnit,
    findAppUnit,
    updateAppUnit,
    deleteAppUnit
} from '../api/appUnitApi'

export class AppUnitStore {

    @observable appUnitList = [];
    @observable appUnitInfo;
    @observable categoryId;

    @action
    findAppUnitPage = async (id) => {
        this.categoryId = id;
        const params = {
            categoryId: id,
            orderParams:[{name:'name', orderType:'asc'}],
        }
        const res = await findAppUnitPage(params);

        if(res.code === 0) {
            this.appUnitList = res.data.dataList;
            return res.data
        }
    }

    @action
    findAppUnit = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findAppUnit(param);
        if( res.code === 0){
            return  this.appUnitInfo = res.data;
        }
    }


    @action
    createAppUnit = async (values) => {
        values.http = {id: this.categoryId}

        const res = await createAppUnit(values)
        if( res.code === 0){
            return this.findAppUnitPage(this.categoryId);
        }
    }

    @action
    updateAppUnit = async (values) => {
        const res = await updateAppUnit(values)
        if( res.code === 0){
            return this.findAppUnitPage(this.categoryId);
        }
    }

    @action
    deleteAppUnit = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteAppUnit(param)
        if( res.code === 0){
            this.findAppUnitPage(this.categoryId);
        }
    }

}

export const APP_UNIT_STORE = 'appUnitStore';
