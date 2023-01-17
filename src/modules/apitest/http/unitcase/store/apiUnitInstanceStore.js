import { observable,  action } from "mobx";
import {
    findApiUnitInstancePage,
    createApiUnitInstance,
    findApiUnitInstance,
    deleteApiUnitInstance,
    findApiUnitInstanceList
} from '../api/apiUnitInstanceApi'

export class ApiUnitInstanceStore {

    @observable apiUnitInstanceList = [];
    @observable apiUnitInstanceId = '';
    @observable	totalRecord = "";
    @observable params

    @action
    findApiUnitInstancePage = async (value) => {
        this.params = {
            ...value,
            orderParams:[{name:'createTime', orderType:'asc' }]
        }

        const res = await findApiUnitInstancePage(this.params );
        if(res.code === 0) {
            this.apiUnitInstanceList = res.data.dataList;
        }
        return res
    }

    @action
    findApiUnitInstanceList = async (id) =>{
        let param = {
            "apiUnitId":id,
            orderParams:[{name:'createTime', orderType:'desc' }]
        }

        const res = await findApiUnitInstanceList(param);
        if(res.code===0){
            this.apiUnitInstanceList = res.data;
            return res.data;
        }
    }

    @action
    findApiUnitInstance = async (id) => {
        this.apiUnitInstanceId = id;

        const param = new FormData();
        param.append('id', id);

        const res = await findApiUnitInstance(param)
        if(res.code === 0){
            return res.data;
        }
    }

    @action
    createApiUnitInstance = async (values) =>  await createApiUnitInstance(values)
    

    @action
    deleteApiUnitInstance = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteApiUnitInstance(param)
    }


}


export const APIUNIT_INSTANCE_STORE = 'apiUnitInstanceStore';