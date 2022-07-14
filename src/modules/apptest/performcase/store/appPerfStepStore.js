/**
 * @description：功能测试步骤store
 * @date: 2021-10-08 13:32
 */
import {observable,action} from "mobx";
import {
    findAppPerfStepList,
    findAppPerfStepPage,
    findAppPerfStep,
    createAppPerfStep,
    deleteAppPerfStep,
    updateAppPerfStep,
    bindAppScene
} from '../api/appPerfStepApi';


export class AppPerfStepStore {
    @observable appPerfStepList = [];
    @observable appPerfStepInfo = {};
    @observable appPerfId;

    @action
    bindAppScene = async (selectItem) => {
        let bindList = [];
        for (let i=0;i<selectItem.length;i++){
            bindList.push({
                appPerf: {id: this.appPerfId},
                appScene: {id:selectItem[i]}
            });
        }

        await bindAppScene(bindList)

    }

    @action
    findAppPerfStepPage = async (id) => {
        this.appPerfId = id;
        const params = {
            appPerformId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await findAppPerfStepPage(params)
        if(res.code === 0) {

            this.appPerfStepList=res.data.dataList
            return res.data.dataList
        }
    }

    @action
    findAppPerfStepList = async (id) => {
        this.appPerfId = id;
        const params = {
            appPerformId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await findAppPerfStepList(params)
        if(res.code === 0) {

            this.appPerfStepList=res.data;
            return res.data;
        }
    }


    @action
    findAppPerfStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findAppPerfStep(param);
        if(res.code === 0){
            this.appPerfStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createAppPerfStep = async (values) => await createAppPerfStep(values)


    @action
    updateAppPerfStep = async (values) => await updateAppPerfStep(values)

    @action
    deleteAppPerfStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await deleteAppPerfStep(param);

    }
}

export const APP_PERF_STEP_STORE = 'appPerfStepStore';
