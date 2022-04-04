/**
 * @description：功能测试步骤store
 * @date: 2021-10-08 13:32
 */
import {observable,action} from "mobx";
import {
    findWebSceneStepList,
    findWebSceneStepPage,
    findWebSceneStep,
    createWebSceneStep,
    deleteWebSceneStep,
    updateWebSceneStep,
} from '../api/webSceneStepApi';


export class WebSceneStepStore {
    @observable webSceneStepList = [];
    @observable webSceneStepInfo = {};
    @observable webSceneId;


    @action
    findWebSceneStepPage = async (id) => {
        this.webSceneId=id;
        const params = {webSceneId: id}

        const res = await findWebSceneStepPage(params)
        if(res.code === 0) {

            this.webSceneStepList=res.data.dataList
            return res.data.dataList
        }
    }

    @action
    findWebSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findWebSceneStep(param);
        if(res.code === 0){
            this.webSceneStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createWebSceneStep = async (values) => {
        delete values.id;
        values.webtional={id:this.webSceneId};

        const res = await createWebSceneStep(values);
        if(res.code === 0){
            this.findWebSceneStepList(this.webSceneId);
            return (res.data)
        }
    }

    @action
    updateWebSceneStep = async (values) => {
        const res = await updateWebSceneStep(values);

        if(res.code === 0){
            return this.findWebSceneStepList(this.webSceneId);

        }
    }

    @action
    deleteWebSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        const res = await deleteWebSceneStep(param);
        if(res.code === 0){
            this.findWebSceneStepList(this.webSceneId);
        }
    }
}

export const WEB_SCENESTEP_STORE = 'webSceneStepStore';
