
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
        const params = {
            funcUnitId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }
        const res = await findFuncUnitStepList(params)
        if(res.code === 0) {
            this.funcUnitStepList=res.data;
        }
        return res.data
    }


    @action
    findFuncUnitStep =async (id) => {
        const param = new FormData();
        param.append('id', id);

        let res =  await  findFuncUnitStep(param)
        if(res.code === 0){
            this.funcUnitStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createFuncUnitStep =async (values) => await createFuncUnitStep(values)


    @action
    updateFuncUnitStep = async (values) => await updateFuncUnitStep(values)


    @action
    deleteFuncUnitStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        return await deleteFuncUnitStep(param)
    }

}

export const FUNC_UNITSTEP_STORE = 'funcUnitStepStore';
