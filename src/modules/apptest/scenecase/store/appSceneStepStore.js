/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {observable,action} from "mobx";
import {
    findAppSceneStepList,
    findAppSceneStep,
    createAppSceneStep,
    deleteAppSceneStep,
    updateAppSceneStep,
    bindAppUnit
} from '../api/appSceneStepApi';


export class AppSceneStepStore {
    @observable appSceneStepList = [];
    @observable appSceneStepInfo = {};
    @observable categoryId;

    @action
    bindAppUnit = async (selectItem) => {
        let bindList = [];
        for (let i=0;i<selectItem.length;i++){
            bindList.push({
                appScene: {id: this.appSceneId},
                appUnit: {id:selectItem[i]}
            });
        }

        await bindAppUnit(bindList)

    }

    @action
    findAppSceneStepList = async (id) => {
        this.appSceneId=id;
        const params = {
            appSceneId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await findAppSceneStepList(params)
        if(res.code === 0) {

            this.appSceneStepList=res.data
            return res.data
        }
    }


    @action
    findAppSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findAppSceneStep(param);
        if(res.code === 0){
            this.appSceneStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createAppSceneStep = async (values) => await createAppSceneStep(values)


    @action
    updateAppSceneStep = async (values) =>  await updateAppSceneStep(values)

    @action
    deleteAppSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await deleteAppSceneStep(param);

    }

  
}

export const APP_SCENESTEP_STORE = 'appSceneStepStore';
