import { observable,  action } from "mobx";
import {
    findWebUnitInstancePage,
    createWebUnitInstance,
    findWebUnitInstance,
    updateWebUnitInstance,
    deleteWebUnitInstance,
    findWebUnitInstanceList
} from '../api/webUnitInstanceApi'

export class WebUnitInstanceStore {

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
    findWebUnitInstancePage = async (id,value) => {
        this.params = {
            ...value,
            webUnitId:id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findWebUnitInstancePage(this.params );
        if(res.code === 0) {
            this.instanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return res
        }
    }

    @action
    findWebUnitInstanceList = async (id) =>{
        let param = {
            "webUnitId":id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findWebUnitInstanceList(param);
        if(res.code===0){
            this.instanceList = res.data;
            return res.data;
        }
    }

    @action
    findWebUnitInstance = async (id) => {
        this.instanceId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findWebUnitInstance(param)
        if(res.code === 0){
            
            return res.data;
        }
    }

    @action
    createWebUnitInstance = async (values) => {
        const res = await createWebUnitInstance(values)
        if(res.code === 0) {
            this.findWebUnitInstanceList(this.params );
            return res.data
        }
    }

    @action
    deleteWebUnitInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteWebUnitInstance(param)
        if(res.code === 0) {
            this.findWebUnitInstanceList(this.params )
        }
    }


}


export const WEB_UNITINSTANCE_STORE = 'webUnitInstanceStore';