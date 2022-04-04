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

    @observable instanceList = [];
    @observable instanceId = '';
    @observable	totalRecord = "";
    @observable params
    @observable responseBodyData;
    @observable responseHeaderData;
    @observable requestBodyData;
    @observable requestHeaderData;
    @observable assertList;

    @action
    findWebSceneInstancePage = async (id,value) => {
        this.params = {
            ...value,
            testcaseId:id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findWebSceneInstancePage(this.params );
        if(res.code === 0) {
            this.instanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return res
        }
    }

    @action
    findWebSceneInstanceList = async (id) =>{
        let param = {
            "testcaseId":id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findWebSceneInstanceList(param);
        if(res.code===0){
            this.instanceList = res.data;
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
    createWebSceneInstance = async (values) => {
        const res = await createWebSceneInstance(values)
        if(res.code === 0) {
            this.findWebSceneInstanceList(this.params );
            return res.data
        }
    }

    @action
    deleteWebSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteWebSceneInstance(param)
        if(res.code === 0) {
            this.findWebSceneInstanceList(this.params )
        }
    }


}


export const WEB_SCENEINSTANCE_STORE = 'webSceneInstanceStore';