import {observable,action} from "mobx";
import {Axios} from "tiklab-core-ui";


export class WebSceneStepStore {
    @observable webSceneStepList = [];
    @observable webSceneStepInfo = {};
    @observable webSceneId;


    @action
    findWebSceneStepPage = async (id) => {
        this.webSceneId=id;
        const params = {
            webSceneId: id,
            orderParams:[{name:'sort', orderType:'asc'}],
        }

        const res = await Axios.post("/webSceneStep/findWebSceneStepPage",params)
        if(res.code === 0) {

            this.webSceneStepList=res.data.dataList
            return res.data.dataList;
        }
    }

    @action
    findWebSceneStepList = async (id) => {
        this.webSceneId=id;
        const params = {
            webSceneId: id,
            orderParams:[{name:'sort', orderType:'asc'}],
        }

        const res = await Axios.post("/webSceneStep/findWebSceneStepList",params)
        if(res.code === 0) {

            this.webSceneStepList=res.data
            return res.data
        }
    }


    @action
    findWebSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/webSceneStep/findWebSceneStep",param);
        if(res.code === 0){
            this.webSceneStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createWebSceneStep = async (values) => await Axios.post("/webSceneStep/createWebSceneStep",values)


    @action
    updateWebSceneStep = async (values) =>  await Axios.post("/webSceneStep/updateWebSceneStep",values)

    @action
    deleteWebSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await Axios.post("/webSceneStep/deleteWebSceneStep",param);

    }
}

let webSceneStepStore = new WebSceneStepStore();
export default webSceneStepStore;
