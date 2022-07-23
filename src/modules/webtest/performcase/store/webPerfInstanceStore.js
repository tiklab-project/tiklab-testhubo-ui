import { observable,  action } from "mobx";
import {
    findWebPerfInstancePage,
    findWebPerfInstance,
    deleteWebPerfInstance,
    findWebPerfInstanceList
} from '../api/webPerfInstanceApi'

export class WebPerfInstanceStore {

    @observable webPerfInstanceList = [];
    @observable instanceId = '';
    @observable	totalRecord = "";
    @observable params
    @observable responseBodyData;
    @observable responseHeaderData;
    @observable requestBodyData;
    @observable requestHeaderData;
    @observable assertList;

    @action
    findWebPerfInstancePage = async (id,value) => {
        this.params = {
            ...value,
            apiPerfId:id,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await findWebPerfInstancePage(this.params );
        if(res.code === 0) {
            this.webPerfInstanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return res
        }
    }

    @action
    findWebPerfInstanceList = async (id) =>{
        let param = {
            "apiPerfId":id,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await findWebPerfInstanceList(param);
        if(res.code===0){
            this.webPerfInstanceList = res.data;
            return res.data;
        }
    }

    @action
    findWebPerfInstance = async (id) => {
        this.instanceId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findWebPerfInstance(param)
        if(res.code === 0){
              return res.data;
        }
    }

    @action
    deleteWebPerfInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteWebPerfInstance(param)
        if(res.code === 0) {
            return res.data;
        }
    }


}


export const WEB_PERF_INSTANCE_STORE = 'webPerfInstanceStore';