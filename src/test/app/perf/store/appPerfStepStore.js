import {observable,action} from "mobx";
import {Axios} from "thoughtware-core-ui";


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

        await Axios.post("/appPerfStep/bindAppScene",bindList)

    }

    @action
    findAppPerfStepPage = async (id) => {
        this.appPerfId = id;
        const params = {
            appPerfId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await Axios.post("/appPerfStep/findAppPerfStepPage",params)
        if(res.code === 0) {

            this.appPerfStepList=res.data.dataList
            return res.data.dataList
        }
    }

    @action
    findAppPerfStepList = async (id) => {
        this.appPerfId = id;
        const params = {
            appPerfId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await Axios.post("/appPerfStep/findAppPerfStepList",params)
        if(res.code === 0) {

            this.appPerfStepList=res.data;
            return res.data;
        }
    }


    @action
    findAppPerfStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/appPerfStep/findAppPerfStep",param);
        if(res.code === 0){
            this.appPerfStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createAppPerfStep = async (values) => await Axios.post("/appPerfStep/createAppPerfStep",values)

    @action
    updateAppPerfStep = async (values) => await Axios.post("/appPerfStep/updateAppPerfStep",values)

    @action
    deleteAppPerfStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await Axios.post("/appPerfStep/deleteAppPerfStep",param);

    }
}

let appPerfStepStore = new AppPerfStepStore();
export default appPerfStepStore;
