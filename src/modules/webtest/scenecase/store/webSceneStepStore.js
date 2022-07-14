/**
 * @description：功能测试步骤store
 * @date: 2021-10-08 13:32
 */
import {observable,action} from "mobx";
import {
    findWebSceneStepList,
    findWebSceneStepPage,
    findWebSceneStep,
    createWebSceneStep,
    deleteWebSceneStep,
    updateWebSceneStep,
    bindWebUnit
} from '../api/webSceneStepApi';


export class WebSceneStepStore {
    @observable webSceneStepList = [];
    @observable webSceneStepInfo = {};
    @observable webSceneId;


    @action
    bindWebUnit = async (selectItem) => {
        let bindList = [];
        for (let i=0;i<selectItem.length;i++){
            bindList.push({
                webScene: {id: this.webSceneId},
                webUnit: {id:selectItem[i]}
            });
        }

        await bindWebUnit(bindList)

    }

    @action
    findWebSceneStepPage = async (id) => {
        this.webSceneId=id;
        const params = {
            webSceneId: id,
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await findWebSceneStepPage(params)
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
            orderParams:[{name:'createTime', orderType:'asc'}],
        }

        const res = await findWebSceneStepList(params)
        if(res.code === 0) {

            this.webSceneStepList=res.data
            return res.data
        }
    }


    @action
    findWebSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findWebSceneStep(param);
        if(res.code === 0){
            this.webSceneStepInfo = res.data;
            return res.data;
        }
    }

    @action
    createWebSceneStep = async (values) => await createWebSceneStep(values)


    @action
    updateWebSceneStep = async (values) =>  await updateWebSceneStep(values)

    @action
    deleteWebSceneStep = async (id) => {
        const param = new FormData();
        param.append('id', id)

        await deleteWebSceneStep(param);

    }
}

export const WEB_SCENESTEP_STORE = 'webSceneStepStore';
