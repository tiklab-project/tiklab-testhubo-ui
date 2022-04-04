import { observable,  action } from "mobx";
import {
    findWebUnitPage,
    createWebUnit,
    findWebUnit,
    updateWebUnit,
    deleteWebUnit
} from '../api/webUnitApi'

export class WebUnitStore {

    @observable webUnitList = [];
    @observable webUnitInfo;
    @observable categoryId;

    @action
    findWebUnitPage = async (id) => {
        this.categoryId = id;
        const params = {
            categoryId: id,
            orderParams:[{name:'name', orderType:'asc'}],
        }
        const res = await findWebUnitPage(params);

        if(res.code === 0) {
            this.webUnitList = res.data.dataList;
            return res.data
        }
    }

    @action
    findWebUnit = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findWebUnit(param);
        if( res.code === 0){
            return  this.webUnitInfo = res.data;
        }
    }


    @action
    createWebUnit = async (values) => {
        values.http = {id: this.categoryId}

        const res = await createWebUnit(values)
        if( res.code === 0){
            return this.findWebUnitPage(this.categoryId);
        }
    }

    @action
    updateWebUnit = async (values) => {
        const res = await updateWebUnit(values)
        if( res.code === 0){
            return this.findWebUnitPage(this.categoryId);
        }
    }

    @action
    deleteWebUnit = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteWebUnit(param)
        if( res.code === 0){
            this.findWebUnitPage(this.categoryId);
        }
    }

}

export const WEB_UNIT_STORE = 'webUnitStore';
