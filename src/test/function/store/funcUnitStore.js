import { observable,  action } from "mobx";
import {
    findFuncUnitPage,
    createFuncUnit,
    findFuncUnit,
    updateFuncUnit,
    deleteFuncUnit,
    findFuncUnitCaseListByTestCase
} from '../api/funcUnitApi'

export class FuncUnitStore {

    @observable funcUnitList = [];
    @observable funcUnitInfo;

    @action
    findFuncUnitList = async (value) => {

        const res = await findFuncUnitCaseListByTestCase(value);

        if(res.code === 0) {
            this.funcUnitList = res.data;
            return res.data
        }
    }

    @action
    findFuncUnit = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findFuncUnit(param);
        if( res.code === 0){
            this.funcUnitInfo = res.data;
            return  res.data;
        }
    }


    @action
    createFuncUnit = async (values) => await createFuncUnit(values)

    @action
    updateFuncUnit = async (values) => await updateFuncUnit(values)

    @action
    deleteFuncUnit = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteFuncUnit(param)
    }

}
export const FUNC_UNIT_STORE = 'funcUnitStore';
