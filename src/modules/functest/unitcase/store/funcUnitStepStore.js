/**
 * @description：功能测试步骤store
 * @date: 2021-10-08 13:32
 */
import {observable,action} from "mobx";
import {
    findFuncUnitStepList,
    findFuncUnitStep,
    createFuncUnitStep,
    deleteFuncUnitStep,
    updateFuncUnitStep,
} from '../api/funcUnitStepApi';


export class FuncUnitStepStore {
    @observable funcUnitStepList = [];
    @observable funcUnitStepInfo = {};
    @observable funcUnitId;


    @action
    findFuncUnitStepList = async (id) => {
        this.funcUnitId=id;
        const params = {funcUnitId: id}

        const res = await findFuncUnitStepList(params)
        if(res.code === 0) {

            this.funcUnitStepList=res.data
            return res.data
        }
    }

    @action
    findFuncUnitStep = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findFuncUnitStep(param);
        if(res.code === 0){
            this.funcUnitStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createFuncUnitStep = async (values) => {
        delete values.id;
        values.functional={id:this.funcUnitId};

        const res = await createFuncUnitStep(values);
        if(res.code === 0){
            this.findFuncUnitStepList(this.funcUnitId);
            return (res.data)
        }
    }

    @action
    updateFuncUnitStep = async (values) => {
        const res = await updateFuncUnitStep(values);

        if(res.code === 0){
            return this.findFuncUnitStepList(this.funcUnitId);

        }
    }

    @action
    deleteFuncUnitStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        const res = await deleteFuncUnitStep(param);
        if(res.code === 0){
            this.findFuncUnitStepList(this.funcUnitId);
        }
    }
}

export const FUNC_UNITSTEP_STORE = 'funcUnitStepStore';
