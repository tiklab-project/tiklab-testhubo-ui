import { observable,  action } from "mobx";
import {
    createFuncScene,
    findFuncScene,
    updateFuncScene,
    deleteFuncScene,
    findFuncSceneCaseListByTestCase
} from '../api/funcSceneApi'

export class FuncSceneStore {

    @observable funcSceneList = [];
    @observable funcSceneInfo;

    @action
    findFuncSceneList = async (value) => {

        const res = await findFuncSceneCaseListByTestCase(value);

        if(res.code === 0) {
            this.funcSceneList = res.data;
            return res.data
        }
    }

    @action
    findFuncScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findFuncScene(param);
        if( res.code === 0){
            this.funcSceneInfo = res.data;
            return res.data;
        }
    }

    @action
    createFuncScene = async (values) =>  await createFuncScene(values)

    @action
    updateFuncScene = async (values) => await updateFuncScene(values)

    @action
    deleteFuncScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteFuncScene(param)

    }

}

export const FUNC_SCENE_STORE = 'funcSceneStore';
