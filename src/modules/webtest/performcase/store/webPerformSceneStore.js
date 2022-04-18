/**
 * @description：功能测试步骤store
 * @date: 2021-10-08 13:32
 */
import {observable,action} from "mobx";
import {
    findWebPerformSceneList,
    findWebPerformScenePage,
    findWebPerformScene,
    createWebPerformScene,
    deleteWebPerformScene,
    updateWebPerformScene,
} from '../api/webPerformSceneApi';


export class WebPerformSceneStore {
    @observable webPerformSceneList = [];
    @observable webPerformSceneInfo = {};
    @observable webPerformId;


    @action
    findWebPerformScenePage = async (id) => {
        this.webPerformId=id;
        const params = {webPerformId: id}

        const res = await findWebPerformScenePage(params)
        if(res.code === 0) {

            this.webPerformSceneList=res.data.dataList
            return res.data.dataList
        }
    }

    @action
    findWebPerformScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findWebPerformScene(param);
        if(res.code === 0){
            this.webPerformSceneInfo = res.data;
            return res.data;
        }
    }

    @action
    createWebPerformScene = async (values) => {
        delete values.id;
        values.webtional={id:this.webPerformId};

        const res = await createWebPerformScene(values);
        if(res.code === 0){
            this.findWebPerformScenePage(this.webPerformId);
            return (res.data)
        }
    }

    @action
    updateWebPerformScene = async (values) => {
        const res = await updateWebPerformScene(values);

        if(res.code === 0){
            return this.findWebPerformScenePage(this.webPerformId);

        }
    }

    @action
    deleteWebPerformScene = async (id) => {
        const param = new FormData();
        param.append('id', id)

        const res = await deleteWebPerformScene(param);
        if(res.code === 0){
            this.findWebPerformScenePage(this.webPerformId);
        }
    }
}

export const WEB_PERFORMSCENE_STORE = 'webPerformSceneStore';
