import { observable,  action } from "mobx";
import {
    findApiSceneStepPage,
    bindApiUnit,
    findApiSceneStep,
    updateApiSceneStep,
    deleteApiSceneStep
} from '../api/apiSceneStepApi'

export class ApiSceneStepStore {

    @observable apiSceneStepList = [];
    @observable apiSceneStepInfo;
    @observable apiSceneId;

    @action
    findApiSceneStepPage = async (id) => {
        this.apiSceneId = id;
        const params = { apiSceneId: id }

        const res = await findApiSceneStepPage(params);

        if(res.code === 0) {
            this.apiSceneStepList = res.data.dataList;
            return res.data
        }
    }

    @action
    findApiSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiSceneStep(param);
        if( res.code === 0){
            this.apiSceneStepInfo = res.data;
            return res.data;
        }
    }


    @action
    bindApiUnit = async (selectItem) => {
        let bindList = [];
        for (let i=0;i<selectItem.length;i++){
            bindList.push({
                apiScene: {id: this.apiSceneId},
                apiUnit: {id:selectItem[i]}
            });
        }

        const res = await bindApiUnit(bindList)
        if( res.code === 0){
            this.findApiSceneStepPage(this.apiSceneId);
        }
    }

    @action
    updateApiSceneStep = async (values) => {
        const res = await updateApiSceneStep(values)
        if( res.code === 0){
            this.findApiSceneStepPage(this.apiSceneId);
        }
    }

    @action
    deleteApiSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteApiSceneStep(param)
        if( res.code === 0){
            this.findApiSceneStepPage(this.apiSceneId);
        }
    }

}

export const APISCENESTEP_STORE = 'apiSceneStepStore';
