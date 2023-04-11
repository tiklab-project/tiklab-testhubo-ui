import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


export class WebSceneStore {

    @observable webSceneList = [];
    @observable webSceneInfo;

    @action
    findWebSceneList = async (value) => {

        const res = await Axios.post("/webSceneCase/findWebSceneCaseListByTestCase",value);

        if(res.code === 0) {
            this.webSceneList = res.data;
            return res.data
        }
    }

    @action
    findWebScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/webSceneCase/findWebSceneCase",param);
        if( res.code === 0){
            this.webSceneInfo = res.data;
            return res.data;
        }
    }

    @action
    createWebScene = async (values) =>  await Axios.post("/webSceneCase/createWebSceneCase",values)

    @action
    updateWebScene = async (values) => await Axios.post("/webSceneCase/updateWebSceneCase",values)

    @action
    deleteWebScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

         await Axios.post("/webSceneCase/deleteWebSceneCase",param)

    }

    @action
    webSceneTestDispatch = async (data)=> await Axios.post("/webSceneTestDispatch/execute",data)



}

export const WEB_SCENE_STORE = 'webSceneStore';
