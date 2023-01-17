import { observable,  action } from "mobx";
import {
    findWebSceneInstancePage,
    createWebSceneInstance,
    findWebSceneInstance,
    updateWebSceneInstance,
    deleteWebSceneInstance,
    findWebSceneInstanceList
} from '../api/webSceneInstanceApi'

export class WebSceneInstanceStore {

    @observable webSceneInstanceList = [];
    @observable instanceId = '';
    @observable	totalRecord = "";
    @observable params


    @action
    findWebSceneInstancePage = async (value) => {
        this.params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await findWebSceneInstancePage(this.params );
        if(res.code === 0) {
            this.webSceneInstanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
        }
        return res
    }

    @action
    findWebSceneInstanceList = async (id) =>{
        let param = {
            "webSceneId":id,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await findWebSceneInstanceList(param);
        if(res.code===0){
            this.webSceneInstanceList = res.data;
            return res.data;
        }
    }

    @action
    findWebSceneInstance = async (id) => {
        this.instanceId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findWebSceneInstance(param)
        if(res.code === 0){

            return res.data;
        }
    }

    @action
    createWebSceneInstance = async (values) =>  await createWebSceneInstance(values)


    @action
    deleteWebSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteWebSceneInstance(param)
    }


}


export const WEB_SCENEINSTANCE_STORE = 'webSceneInstanceStore';