import { observable,  action } from "mobx";
import {
    findAppPerfInstancePage,
    findAppPerfInstance,
    deleteAppPerfInstance,
    findAppPerfInstanceList
} from '../api/appPerfInstanceApi'

export class AppPerfInstanceStore {

    @observable appPerfInstanceList = [];


    @action
    findAppPerfInstancePage = async (value) => {
        let params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await findAppPerfInstancePage(params );
        if(res.code === 0) {
            this.appPerfInstanceList = res.data.dataList;
        }
        return res
    }

    @action
    findAppPerfInstanceList = async (id) =>{
        let param = {
            "appPerfId":id,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await findAppPerfInstanceList(param);
        if(res.code===0){
            this.appPerfInstanceList = res.data;
            return res.data;
        }
    }

    @action
    findAppPerfInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findAppPerfInstance(param)
        if(res.code === 0){
              return res.data;
        }
    }
    

    @action
    deleteAppPerfInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteAppPerfInstance(param)
    }


}


export const APP_PERF_INSTANCE_STORE = 'appPerfInstanceStore';