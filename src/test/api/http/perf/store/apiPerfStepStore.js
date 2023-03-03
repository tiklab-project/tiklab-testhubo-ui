
import {observable,action} from "mobx";
import {
    findApiPerfStepList,
    findApiPerfStepPage,
    findApiPerfStep,
    createApiPerfStep,
    deleteApiPerfStep,
    updateApiPerfStep,
    bindApiScene
} from '../api/apiPerfStepApi';


export class ApiPerfStepStore {
    @observable apiPerfStepList = [];
    @observable apiPerfStepInfo = {};
    @observable apiPerfId;

    @action
    bindApiScene = async (selectItem) => {
        let bindList = [];
        for (let i=0;i<selectItem.length;i++){
            bindList.push({
                apiPerf: {id: this.apiPerfId},
                apiScene: {id:selectItem[i]}
            });
        }

        await bindApiScene(bindList)
    }

    @action
    findApiPerfStepPage = async (id) => {
        this.apiPerfId = id;
        const params = {
            apiPerformId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await findApiPerfStepPage(params)
        if(res.code === 0) {

            this.apiPerfStepList=res.data.dataList
            return res.data.dataList
        }
    }

    @action
    findApiPerfStepList = async (id) => {
        this.apiPerfId = id;
        const params = {
            apiPerformId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await findApiPerfStepList(params)
        if(res.code === 0) {

            this.apiPerfStepList=res.data;
            return res.data;
        }
    }


    @action
    findApiPerfStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiPerfStep(param);
        if(res.code === 0){
            this.apiPerfStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createApiPerfStep = async (values) => await createApiPerfStep(values)


    @action
    updateApiPerfStep = async (values) => await updateApiPerfStep(values)

    @action
    deleteApiPerfStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await deleteApiPerfStep(param);

    }
}

export const API_PERF_STEP_STORE = 'apiPerfStepStore';
