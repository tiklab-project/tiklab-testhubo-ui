import { observable,  action } from "mobx";
import {
    findAppSceneInstancePage,
    createAppSceneInstance,
    findAppSceneInstance,
    updateAppSceneInstance,
    deleteAppSceneInstance,
    findAppSceneInstanceList
} from '../api/appSceneInstanceApi'

export class AppSceneInstanceStore {

    @observable instanceList = [];
    @observable instanceId = '';
    @observable	totalRecord = "";
    @observable params

    @action
    findAppSceneInstancePage = async (id,value) => {
        this.params = {
            ...value,
            testcaseId:id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findAppSceneInstancePage(this.params );
        if(res.code === 0) {
            this.instanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return res
        }
    }

    @action
    findAppSceneInstanceList = async (id) =>{
        let param = {
            "testcaseId":id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findAppSceneInstanceList(param);
        if(res.code===0){
            this.instanceList = res.data;
            return res.data;
        }
    }

    @action
    findAppSceneInstance = async (id) => {
        this.instanceId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findAppSceneInstance(param)
        if(res.code === 0){

            return res.data;
        }
    }

    @action
    createAppSceneInstance = async (values) => {
        const res = await createAppSceneInstance(values)
        if(res.code === 0) {
            this.findAppSceneInstanceList(this.params );
            return res.data
        }
    }

    @action
    deleteAppSceneInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteAppSceneInstance(param)
        if(res.code === 0) {
            this.findAppSceneInstanceList(this.params )
        }
    }


}


export const APP_SCENEINSTANCE_STORE = 'appSceneInstanceStore';