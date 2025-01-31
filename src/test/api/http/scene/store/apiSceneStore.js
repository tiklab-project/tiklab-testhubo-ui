import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class ApiSceneStore {

    @observable apiSceneList = [];
    @observable apiSceneInfo;
    @observable testCaseInfo;

    @action
    findApiSceneList = async (value) => {
        const res = await Axios.post("/apiSceneCase/findApiSceneCaseListByTestCase",value);
        if(res.code === 0) {
            this.apiSceneList = res.data;
            return res.data
        }
    }

    @action
    findApiScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/apiSceneCase/findApiSceneCase",param);
        if( res.code === 0){
            this.apiSceneInfo = res.data;
            this.testCaseInfo = res.data.testCase
            return  res.data;
        }
    }


    @action
    createApiScene = async (values) => await Axios.post("/apiSceneCase/createApiSceneCase",values)

    @action
    updateApiScene = async (values) => await Axios.post("/apiSceneCase/updateApiSceneCase",values)


    @action
    deleteApiScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/apiSceneCase/deleteApiSceneCase",param)
    }

}

export default new ApiSceneStore()
