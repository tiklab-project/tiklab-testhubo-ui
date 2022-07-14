/**
 * @description：功能测试步骤store
 * @date: 2021-10-08 13:32
 */
import {observable,action} from "mobx";
import {
    findWebPerfStepList,
    findWebPerfStepPage,
    findWebPerfStep,
    createWebPerfStep,
    deleteWebPerfStep,
    updateWebPerfStep,
    bindWebScene
} from '../api/webPerfStepApi';


export class WebPerfStepStore {
    @observable webPerfStepList = [];
    @observable webPerfStepInfo = {};
    @observable webPerfId;

    @action
    bindWebScene = async (selectItem) => {
        let bindList = [];
        for (let i=0;i<selectItem.length;i++){
            bindList.push({
                webPerf: {id: this.webPerfId},
                webScene: {id:selectItem[i]}
            });
        }

        await bindWebScene(bindList)

    }

    @action
    findWebPerfStepPage = async (id) => {
        this.webPerfId = id;
        const params = {
            webPerformId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await findWebPerfStepPage(params)
        if(res.code === 0) {

            this.webPerfStepList=res.data.dataList
            return res.data.dataList
        }
    }

    @action
    findWebPerfStepList = async (id) => {
        this.webPerfId = id;
        const params = {
            webPerformId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await findWebPerfStepList(params)
        if(res.code === 0) {

            this.webPerfStepList=res.data;
            return res.data;
        }
    }


    @action
    findWebPerfStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findWebPerfStep(param);
        if(res.code === 0){
            this.webPerfStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createWebPerfStep = async (values) => await createWebPerfStep(values)


    @action
    updateWebPerfStep = async (values) => await updateWebPerfStep(values)

    @action
    deleteWebPerfStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await deleteWebPerfStep(param);

    }
}

export const WEB_PERF_STEP_STORE = 'webPerfStepStore';
