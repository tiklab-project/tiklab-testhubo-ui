import { observable,  action } from "mobx";
import {
    findWebPerfInstancePage,
    findWebPerfInstance,
    deleteWebPerfInstance,
    findWebPerfInstanceList
} from '../api/webPerfInstanceApi'

export class WebPerfInstanceStore {
    @observable webPerfInstanceList = [];

    @action
    findWebPerfInstancePage = async (value) => {
        let params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await findWebPerfInstancePage(params);
        if(res.code === 0) {
            this.webPerfInstanceList = res.data.dataList;
        }
        return res
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

        await deleteWebPerfInstance(param)

    }


}


export const WEB_PERF_INSTANCE_STORE = 'webPerfInstanceStore';