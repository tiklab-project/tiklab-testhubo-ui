import { observable,  action } from "mobx";
import {
    findAppPerformInstancePage,
    createAppPerformInstance,
    findAppPerformInstance,
    updateAppPerformInstance,
    deleteAppPerformInstance,
    findAppPerformInstanceList
} from '../api/appPerformInstanceApi'

export class AppPerformInstanceStore {

    @observable instanceList = [];
    @observable instanceId = '';
    @observable	totalRecord = "";
    @observable params

    @action
    findAppPerformInstancePage = async (id,value) => {
        this.params = {
            ...value,
            testcaseId:id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findAppPerformInstancePage(this.params );
        if(res.code === 0) {
            this.instanceList = res.data.dataList;
            this.totalRecord = res.data.totalRecord;
            return res
        }
    }

    @action
    findAppPerformInstanceList = async (id) =>{
        let param = {
            "testcaseId":id,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findAppPerformInstanceList(param);
        if(res.code===0){
            this.instanceList = res.data;
            return res.data;
        }
    }

    @action
    findAppPerformInstance = async (id) => {
        this.instanceId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findAppPerformInstance(param)
        if(res.code === 0){
              return res.data;
        }
    }

    @action
    createAppPerformInstance = async (values) => {
        const res = await createAppPerformInstance(values)
        if(res.code === 0) {
            this.findAppPerformInstanceList(this.params );
            return res.data
        }
    }

    @action
    deleteAppPerformInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteAppPerformInstance(param)
        if(res.code === 0) {
            this.findAppPerformInstanceList(this.params )
        }
    }


}


export const APP_PERFORMINSTANCE_STORE = 'appPerformInstanceStore';