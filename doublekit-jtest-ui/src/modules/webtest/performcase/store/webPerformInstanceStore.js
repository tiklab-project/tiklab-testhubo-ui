import { observable,  action } from "mobx";
import {
    findWebPerformInstancePage,
    createWebPerformInstance,
    findWebPerformInstance,
    updateWebPerformInstance,
    deleteWebPerformInstance,
    findWebPerformInstanceList
} from '../api/webPerformInstanceApi'

export class WebPerformInstanceStore {

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
    findWebPerformInstancePage = async (id,value) => {
        this.params = {
            ...value,
            testcaseId:id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findWebPerformInstancePage(this.params );
        if(res.code === 0) {
            this.instanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return res
        }
    }

    @action
    findWebPerformInstanceList = async (id) =>{
        let param = {
            "testcaseId":id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findWebPerformInstanceList(param);
        if(res.code===0){
            this.instanceList = res.data;
            return res.data;
        }
    }

    @action
    findWebPerformInstance = async (id) => {
        this.instanceId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findWebPerformInstance(param)
        if(res.code === 0){
              return res.data;
        }
    }

    @action
    createWebPerformInstance = async (values) => {
        const res = await createWebPerformInstance(values)
        if(res.code === 0) {
            this.findWebPerformInstanceList(this.params );
            return res.data
        }
    }

    @action
    deleteWebPerformInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteWebPerformInstance(param)
        if(res.code === 0) {
            this.findWebPerformInstanceList(this.params )
        }
    }


}


export const WEB_PERFORMINSTANCE_STORE = 'webPerformInstanceStore';