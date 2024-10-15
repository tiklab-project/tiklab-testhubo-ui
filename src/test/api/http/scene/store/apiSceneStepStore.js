import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


class ApiSceneStepStore {

    @observable apiSceneStepList = [];
    @observable apiSceneStepInfo;
    @observable apiSceneId;
    @observable apiSceneName;
    @observable apiSceneStepWillBindCaseData;

    @action
    findApiSceneStepList = async (id) => {
        this.apiSceneId = id;
        const params = { apiSceneId: id }

        const res = await Axios.post("/apiSceneStep/findApiSceneStepList",params);

        if(res.code === 0) {
            this.apiSceneStepList = res.data;
            return res.data
        }
    }

    @action
    findApiSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/apiSceneStep/findApiSceneStep",param);
        if( res.code === 0){
            this.apiSceneStepInfo = res.data;
            this.apiSceneName=res.data.name;
            return res.data;
        }
    }


    @action
    bindApiUnit = async (selectItem,apiSceneId) => {
        let bindList = [];
        for (let i=0;i<selectItem.length;i++){
            bindList.push({
                apiSceneId:apiSceneId,
                apiUnit: {id:selectItem[i]}
            });
        }

        await Axios.post("/apiSceneStep/bindApiUnit",bindList)
    }

    @action
    updateApiSceneStep = async (values) => await Axios.post("/apiSceneStep/updateApiSceneStep",values)


    @action
    deleteApiSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/apiSceneStep/deleteApiSceneStep",param)
    }

    @action
    findApiSceneStepWillBindCasePage = async (params) => {
        const res = await Axios.post("/apiSceneStep/findApiSceneStepWillBindCasePage",params);
        if( res.code === 0){
            this.apiSceneStepWillBindCaseData=res.data
            return res.data
        }

    }



}

let apiSceneStepStore = new ApiSceneStepStore();
export default apiSceneStepStore;
