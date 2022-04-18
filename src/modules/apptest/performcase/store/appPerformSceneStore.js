/**
 * @description：功能测试步骤store
 * @date: 2021-10-08 13:32
 */
import {observable,action} from "mobx";
import {
    findAppPerformSceneList,
    findAppPerformScenePage,
    findAppPerformScene,
    createAppPerformScene,
    deleteAppPerformScene,
    updateAppPerformScene,
} from '../api/appPerformSceneApi';


export class AppPerformSceneStore {
    @observable appPerformSceneList = [];
    @observable appPerformSceneInfo = {};
    @observable appPerformId;


    @action
    findAppPerformScenePage = async (id) => {
        this.appPerformId=id;
        const params = {appPerformId: id}

        const res = await findAppPerformScenePage(params)
        if(res.code === 0) {

            this.appPerformSceneList=res.data.dataList
            return res.data.dataList
        }
    }

    @action
    findAppPerformScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findAppPerformScene(param);
        if(res.code === 0){
            this.appPerformSceneInfo = res.data;
            return res.data;
        }
    }

    @action
    createAppPerformScene = async (values) => {
        delete values.id;
        values.apptional={id:this.appPerformId};

        const res = await createAppPerformScene(values);
        if(res.code === 0){
            this.findAppPerformScenePage(this.appPerformId);
            return (res.data)
        }
    }

    @action
    updateAppPerformScene = async (values) => {
        const res = await updateAppPerformScene(values);

        if(res.code === 0){
            return this.findAppPerformScenePage(this.appPerformId);

        }
    }

    @action
    deleteAppPerformScene = async (id) => {
        const param = new FormData();
        param.append('id', id)

        const res = await deleteAppPerformScene(param);
        if(res.code === 0){
            this.findAppPerformScenePage(this.appPerformId);
        }
    }
}

export const APP_PERFORMSCENE_STORE = 'appPerformSceneStore';
