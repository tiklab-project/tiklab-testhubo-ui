import { observable,  action } from "mobx";
import {
    findApiPerfSceneConfigPage,
    createApiPerfSceneConfig,
    findApiPerfSceneConfig,
    updateApiPerfSceneConfig,
    deleteApiPerfSceneConfig,
    bindApiScene
} from '../api/apiPerformSceneApi'

export class ApiPerformSceneStore {

    @observable apiPerformSceneList = [];
    @observable apiPerformSceneInfo;
    @observable apiPerfId;

    @action
    findApiPerformScenePage = async (id) => {
        this.apiPerfId = id;
        const params = {apiPerfId: id }

        const res = await findApiPerfSceneConfigPage(params);
        if(res.code === 0) {
            this.apiPerformSceneList = res.data.dataList;
            return res.data
        }
    }

    @action
    bindApiScene = async (selectItem)=>{
        let bindList = [];

        for (let i=0;i<selectItem.length;i++){
            bindList.push({
                apiPerf: {id: this.apiPerfId},
                apiScene: {id:selectItem[i]}
            });
        }

        const res = await bindApiScene(bindList);
        if(res.code === 0) {
            this.findApiPerformScenePage(this.apiSceneId);
        }
    }

    @action
    findApiPerformScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiPerfSceneConfig(param);
        if( res.code === 0){
            this.apiPerformSceneInfo = res.data;
            return res.data;
        }
    }


    @action
    createApiPerformScene = async (values) => {
        const res = await createApiPerfSceneConfig(values)
        if( res.code === 0){
            this.findApiPerformScenePage(this.apiPerfId);
        }
    }

    @action
    updateApiPerformScene = async (values) => {
        const res = await updateApiPerfSceneConfig(values)
        if( res.code === 0){
            this.findApiPerformScenePage(this.apiPerfId);
        }
    }

    @action
    deleteApiPerformScene = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteApiPerfSceneConfig(param)
        if( res.code === 0){
            this.findApiPerformScenePage(this.apiPerfId);
        }
    }

}

export const API_PERFORMSCENE_STORE = 'apiPerformSceneStore';
