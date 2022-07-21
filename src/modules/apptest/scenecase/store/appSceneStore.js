import { observable,  action } from "mobx";
import {
    createAppScene,
    findAppScene,
    updateAppScene,
    deleteAppScene,
    findAppSceneCaseListByTestCase,
    appSceneTestDispatch
} from '../api/appSceneApi'

export class AppSceneStore {

    @observable appSceneList = [];
    @observable appSceneInfo;

    @action
    findAppSceneList = async (value) => {

        const res = await findAppSceneCaseListByTestCase(value);

        if(res.code === 0) {
            this.appSceneList = res.data;
            return res.data
        }
    }

    @action
    findAppScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findAppScene(param);
        if( res.code === 0){
            this.appSceneInfo = res.data;
            return res.data;
        }
    }

    @action
    createAppScene = async (values) =>  await createAppScene(values)

    @action
    updateAppScene = async (values) => await updateAppScene(values)

    @action
    deleteAppScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteAppScene(param)

    }

    @action
    appSceneTestDispatch = async (data)=> await appSceneTestDispatch(data)
}


export const APP_SCENE_STORE = 'appSceneStore';
