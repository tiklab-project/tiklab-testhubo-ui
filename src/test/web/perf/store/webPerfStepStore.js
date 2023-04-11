import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";


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

        await Axios.post("/webPerfStep/bindWebScene",bindList)

    }

    @action
    findWebPerfStepPage = async (id) => {
        this.webPerfId = id;
        const params = {
            webPerfId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await Axios.post("/webPerfStep/findWebPerfStepPage",params)
        if(res.code === 0) {

            this.webPerfStepList=res.data.dataList
            return res.data.dataList
        }
    }

    @action
    findWebPerfStepList = async (id) => {
        this.webPerfId = id;
        const params = {
            webPerfId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await Axios.post("/webPerfStep/findWebPerfStepList",params)
        if(res.code === 0) {

            this.webPerfStepList=res.data;
            return res.data;
        }
    }


    @action
    findWebPerfStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/webPerfStep/findWebPerfStep",param);
        if(res.code === 0){
            this.webPerfStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createWebPerfStep = async (values) => await Axios.post("/webPerfStep/createWebPerfStep",values)


    @action
    updateWebPerfStep = async (values) => await Axios.post("/webPerfStep/updateWebPerfStep",values)

    @action
    deleteWebPerfStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await Axios.post("/webPerfStep/deleteWebPerfStep",param);

    }
}

export const WEB_PERF_STEP_STORE = 'webPerfStepStore';
