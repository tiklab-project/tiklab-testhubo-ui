import { observable,  action } from "mobx";
import {
    createWebScene,
    findWebScene,
    updateWebScene,
    deleteWebScene,
    findWebSceneCaseListByTestCase,
    webSceneTestDispatch
} from '../api/webSceneApi'

export class WebSceneStore {

    @observable webSceneList = [];
    @observable webSceneInfo;

    @action
    findWebSceneList = async (value) => {

        const res = await findWebSceneCaseListByTestCase(value);

        if(res.code === 0) {
            this.webSceneList = res.data;
            return res.data
        }
    }

    @action
    findWebScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findWebScene(param);
        if( res.code === 0){
            this.webSceneInfo = res.data;
            return res.data;
        }
    }

    @action
    createWebScene = async (values) =>  await createWebScene(values)

    @action
    updateWebScene = async (values) => await updateWebScene(values)

    @action
    deleteWebScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

         await deleteWebScene(param)

    }

    @action
    webSceneTestDispatch = async (data)=> await webSceneTestDispatch(data)



}

export const WEB_SCENE_STORE = 'webSceneStore';
