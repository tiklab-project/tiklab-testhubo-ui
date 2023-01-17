import { observable,  action } from "mobx";
import {
    findApiPerfInstanceList,
    createApiPerfInstance,
    findApiPerfInstance,
    updateApiPerfInstance,
    deleteApiPerfInstance, findApiPerfInstancePage
} from '../api/apiPerfInstanceApi'

export class ApiPerfInstanceStore {

    @observable apiPerfInstanceList = [];
    @observable apiPerfInstanceInfo;
    @observable apiPerformId;

    @action
    findApiPerfInstancePage = async (value) => {
        const params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'desc'}],
        }
        const res = await findApiPerfInstancePage(params);

        if(res.code === 0) {
            this.apiPerfInstanceList = res.data.dataList;
        }

        return res
    }


    @action
    findApiPerfInstanceList = async (id) => {
        this.apiPerformId = id;
        const params = {
            apiPerfId: id,
            orderParams:[{name:'createTime', orderType:'desc'}],
        }
        const res = await findApiPerfInstanceList(params);

        if(res.code === 0) {
            this.apiPerfInstanceList = res.data;
            return res.data
        }
    }

    @action
    findApiPerfInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiPerfInstance(param);
        if( res.code === 0){
            this.apiPerfInstanceInfo = res.data;

            return res.data;
        }
    }

    @action
    updateApiPerfInstance = async (values) =>  await updateApiPerfInstance(values)

    @action
    deleteApiPerfInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);
        
        await deleteApiPerfInstance(param)
    }

}

export const API_PERF_INSTANCE_STORE = 'apiPerfInstanceStore';
