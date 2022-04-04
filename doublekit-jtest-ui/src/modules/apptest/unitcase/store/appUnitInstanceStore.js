import { observable,  action } from "mobx";
import {
    findAppUnitInstancePage,
    createAppUnitInstance,
    findAppUnitInstance,
    updateAppUnitInstance,
    deleteAppUnitInstance,
    findAppUnitInstanceList
} from '../api/appUnitInstanceApi'

export class AppUnitInstanceStore {

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
    findAppUnitInstancePage = async (id,value) => {
        this.params = {
            ...value,
            appUnitId:id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findAppUnitInstancePage(this.params );
        if(res.code === 0) {
            this.instanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return res
        }
    }

    @action
    findAppUnitInstanceList = async (id) =>{
        let param = {
            "appUnitId":id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findAppUnitInstanceList(param);
        if(res.code===0){
            this.instanceList = res.data;
            return res.data;
        }
    }

    @action
    findAppUnitInstance = async (id) => {
        this.instanceId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findAppUnitInstance(param)
        if(res.code === 0){
            
            return res.data;
        }
    }

    @action
    createAppUnitInstance = async (values) => {
        const res = await createAppUnitInstance(values)
        if(res.code === 0) {
            this.findAppUnitInstanceList(this.params );
            return res.data
        }
    }

    @action
    deleteAppUnitInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteAppUnitInstance(param)
        if(res.code === 0) {
            this.findAppUnitInstanceList(this.params )
        }
    }


}


export const APP_UNITINSTANCE_STORE = 'appUnitInstanceStore';