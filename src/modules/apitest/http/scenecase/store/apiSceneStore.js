import { observable,  action } from "mobx";
import {
    createApiScene,
    findApiScene,
    updateApiScene,
    deleteApiScene,
    findApiSceneCaseListByTestCase
} from '../api/apiSceneApi'

export class ApiSceneStore {

    @observable apiSceneList = [];
    @observable apiSceneInfo;

    @action
    findApiSceneList = async (value) => {

        const res = await findApiSceneCaseListByTestCase(value);

        if(res.code === 0) {
            this.apiSceneList = res.data;
            return res.data
        }
    }

    @action
    findApiScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiScene(param);
        if( res.code === 0){
            this.apiSceneInfo = res.data;
            return   res.data?.testCase;
        }
    }


    @action
    createApiScene = async (values) => await createApiScene(values)

    @action
    updateApiScene = async (values) => await updateApiScene(values)


    @action
    deleteApiScene = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteApiScene(param)
    }

}

export const APISCENE_STORE = 'apiSceneStore';
