import { observable,  action } from "mobx";
import {
    findFuncUnitPage,
    createFuncUnit,
    findFuncUnit,
    updateFuncUnit,
    deleteFuncUnit
} from '../api/funcUnitApi'

export class FuncUnitStore {

    @observable funcUnitList = [];
    @observable funcUnitInfo;
    @observable categoryId;

    @action
    findFuncUnitPage = async (id) => {
        this.categoryId = id;
        const params = {
            categoryId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const res = await findFuncUnitPage(params);

        if(res.code === 0) {
            this.funcUnitList = res.data.dataList;
            return res.data
        }
    }

    @action
    findFuncUnit = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findFuncUnit(param);
        if( res.code === 0){
            return  this.funcUnitInfo = res.data;
        }
    }


    @action
    createFuncUnit = async (values) => {
        values.http = {id: this.categoryId}

        const res = await createFuncUnit(values)
        if( res.code === 0){
            return this.findFuncUnitPage(this.categoryId);
        }
    }

    @action
    updateFuncUnit = async (values) => {
        const res = await updateFuncUnit(values)
        if( res.code === 0){
            return this.findFuncUnitPage(this.categoryId);
        }
    }

    @action
    deleteFuncUnit = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteFuncUnit(param)
        if( res.code === 0){
            this.findFuncUnitPage(this.categoryId);
        }
    }

}

export const FUNC_UNIT_STORE = 'funcUnitStore';
