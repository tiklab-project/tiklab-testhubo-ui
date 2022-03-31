import { observable,  action } from "mobx";
import {
    findApiPerformInstanceList,
    createApiPerformInstance,
    findApiPerformInstance,
    updateApiPerformInstance,
    deleteApiPerformInstance
} from '../api/apiPerformInstanceApi'

export class ApiPerformInstanceStore {

    @observable apiPerformInstanceList = [];
    @observable apiPerformInstanceInfo;
    @observable apiPerformId;

    @action
    findApiPerformInstanceList = async (id) => {
        this.apiPerformId = id;
        const params = {
            apiPerformId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }
        const res = await findApiPerformInstanceList(params);

        if(res.code === 0) {
            this.apiPerformInstanceList = res.data;
            return res.data
        }
    }

    @action
    findApiPerformInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiPerformInstance(param);
        if( res.code === 0){
            return  this.apiPerformInstanceInfo = res.data;
        }
    }


    @action
    createApiPerformInstance = async (values) => {
        values.http = {id: this.apiPerformId}

        const res = await createApiPerformInstance(values)
        if( res.code === 0){
            return this.findApiPerformInstancePage(this.apiPerformId);
        }
    }

    @action
    updateApiPerformInstance = async (values) => {
        const res = await updateApiPerformInstance(values)
        if( res.code === 0){
            return this.findApiPerformInstancePage(this.apiPerformId);
        }
    }

    @action
    deleteApiPerformInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteApiPerformInstance(param)
        if( res.code === 0){
            this.findApiPerformInstancePage(this.apiPerformId);
        }
    }

}

export const API_PERFORMINSTANCE_STORE = 'apiPerformInstanceStore';
