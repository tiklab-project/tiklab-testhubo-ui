import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


export class AppSceneStore {

    @observable appSceneList = [];
    @observable appSceneInfo;

    @action
    findAppSceneList = async (value) => {

        const res = await Axios.post("/appSceneCase/findAppSceneCaseList",value);

        if(res.code === 0) {
            this.appSceneList = res.data;
            return res.data
        }
    }

    @action
    findAppScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/appSceneCase/findAppSceneCase",param);
        if( res.code === 0){
            this.appSceneInfo = res.data;
            return res.data;
        }
    }

    @action
    createAppScene = async (values) =>  await Axios.post("/appSceneCase/createAppSceneCase",values)

    @action
    updateAppScene = async (values) => await Axios.post("/appSceneCase/updateAppSceneCase",values)

    @action
    deleteAppScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/appSceneCase/deleteAppSceneCase",param)

    }

    @action
    appSceneTestDispatch = async (data)=> await Axios.post("/appSceneTestDispatch/execute",data)
}


export const APP_SCENE_STORE = 'appSceneStore';
