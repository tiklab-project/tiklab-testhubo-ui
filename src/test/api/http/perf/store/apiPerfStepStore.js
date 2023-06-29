import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";


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

        await Axios.post("/apiPerfStep/bindApiScene",bindList)
    }

    @action
    findApiPerfStepPage = async (id) => {
        this.apiPerfId = id;
        const params = {
            apiPerfId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await Axios.post("/apiPerfStep/findApiPerfStepPage",params)
        if(res.code === 0) {

            this.apiPerfStepList=res.data.dataList
            return res.data.dataList
        }
    }

    @action
    findApiPerfStepList = async (id) => {
        this.apiPerfId = id;
        const params = {
            apiPerfId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await Axios.post("/apiPerfStep/findApiPerfStepList",params)
        if(res.code === 0) {

            this.apiPerfStepList=res.data;
            return res.data;
        }
    }


    @action
    findApiPerfStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/apiPerfStep/findApiPerfStep",param);
        if(res.code === 0){
            this.apiPerfStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createApiPerfStep = async (values) => await Axios.post("/apiPerfStep/createApiPerfStep",values)


    @action
    updateApiPerfStep = async (values) => await Axios.post("/apiPerfStep/updateApiPerfStep",values)

    @action
    deleteApiPerfStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await Axios.post("/apiPerfStep/deleteApiPerfStep",param);

    }
}

let apiPerfStepStore = new ApiPerfStepStore();
export default apiPerfStepStore;
