/**
 * @description：功能测试步骤store
 * @date: 2021-10-08 13:32
 */
import {observable,action} from "mobx";
import {
    findFunctionalStepList,
    findFunctionalStep,
    createFunctionalStep,
    deleteFunctionalStep,
    updateFunctionalStep,
} from '../api/functionalStepApi';


export class FunctionalTestStepStore {
    @observable functionalStepList = [];
    @observable functionalStepInfo = {};
    @observable testCaseId;


    @action
    findFunctionalStepList = async (id) => {
        this.testCaseId=id;
        const params = {testCaseId: id}
        const res = await findFunctionalStepList(params)
        if(res.code === 0) {
            this.functionalStepList=res.data
            return res.data
        }
    }

    @action
    findFunctionalStep = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findFunctionalStep(param);
        if(res.code === 0){
            this.functionalStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createFunctionalStep = async (values) => {
        delete values.id;
        values.functional={id:this.testCaseId};
        const res = await createFunctionalStep(values);
        if(res.code === 0){
            this.findFunctionalStepList(this.testCaseId);
            return (res.data)
        }
    }

    @action
    updateFunctionalStep = async (values) => {
        const res = await updateFunctionalStep(values);
        if(res.code === 0){
            return this.findFunctionalStepList(this.testCaseId);

        }
    }

    @action
    deleteFunctionalStep = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await deleteFunctionalStep(param);
        if(res.code === 0){
            this.findFunctionalStepList(this.testCaseId);
        }
    }
}

export const FUNCTIONALTESTSTEP_STORE = 'functionalTestStepStore';
