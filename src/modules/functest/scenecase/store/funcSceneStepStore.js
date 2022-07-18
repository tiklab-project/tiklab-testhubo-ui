
import {observable,action} from "mobx";
import {
    findFuncSceneStepList,
    findFuncSceneStepPage,
    findFuncSceneStep,
    createFuncSceneStep,
    deleteFuncSceneStep,
    updateFuncSceneStep,
    bindFuncUnit
} from '../api/funcSceneStepApi';


export class FuncSceneStepStore {
    @observable funcSceneStepList = [];
    @observable funcSceneStepInfo = {};
    @observable funcSceneId;


    @action
    bindFuncUnit = async (selectItem) => {
        let bindList = [];
        for (let i=0;i<selectItem.length;i++){
            bindList.push({
                funcScene: {id: this.funcSceneId},
                funcUnit: {id:selectItem[i]}
            });
        }

        await bindFuncUnit(bindList)

    }

    @action
    findFuncSceneStepPage = async (id) => {
        this.funcSceneId=id;
        const params = {
            funcSceneId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await findFuncSceneStepPage(params)
        if(res.code === 0) {

            this.funcSceneStepList=res.data.dataList
            return res.data.dataList;
        }
    }

    @action
    findFuncSceneStepList = async (id) => {
        this.funcSceneId=id;
        const params = {
            funcSceneId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await findFuncSceneStepList(params)
        if(res.code === 0) {

            this.funcSceneStepList=res.data
            return res.data
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
    createFuncSceneStep = async (values) => await createFuncSceneStep(values)


    @action
    updateFuncSceneStep = async (values) =>  await updateFuncSceneStep(values)

    @action
    deleteFuncSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await deleteFuncSceneStep(param);

    }
}

export const FUNC_SCENESTEP_STORE = 'funcSceneStepStore';
