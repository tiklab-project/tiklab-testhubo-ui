/**
 * @description：功能测试步骤store
 * @date: 2021-10-08 13:32
 */
import {observable,action} from "mobx";
import {
    findFuncSceneStepList,
    findFuncSceneStepPage,
    findFuncSceneStep,
    createFuncSceneStep,
    deleteFuncSceneStep,
    updateFuncSceneStep,
} from '../api/funcSceneStepApi';


export class FuncSceneStepStore {
    @observable funcSceneStepList = [];
    @observable funcSceneStepInfo = {};
    @observable funcSceneId;


    @action
    findFuncSceneStepPage = async (id) => {
        this.funcSceneId=id;
        const params = {funcSceneId: id}

        const res = await findFuncSceneStepPage(params)
        if(res.code === 0) {

            this.funcSceneStepList=res.data.dataList
            return res.data.dataList
        }
    }

    @action
    findFuncSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findFuncSceneStep(param);
        if(res.code === 0){
            this.funcSceneStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createFuncSceneStep = async (values) => {
        delete values.id;
        values.functional={id:this.funcSceneId};

        const res = await createFuncSceneStep(values);
        if(res.code === 0){
            this.findFuncSceneStepList(this.funcSceneId);
            return (res.data)
        }
    }

    @action
    updateFuncSceneStep = async (values) => {
        const res = await updateFuncSceneStep(values);

        if(res.code === 0){
            return this.findFuncSceneStepList(this.funcSceneId);

        }
    }

    @action
    deleteFuncSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        const res = await deleteFuncSceneStep(param);
        if(res.code === 0){
            this.findFuncSceneStepList(this.funcSceneId);
        }
    }
}

export const FUNC_SCENESTEP_STORE = 'funcSceneStepStore';
