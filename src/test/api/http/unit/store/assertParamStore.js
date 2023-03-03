/**
 * @description：
 * @date: 2021-08-13 17:40
 */
import { observable,  action } from "mobx";
import {
    findAssertParamList,
    createAssertParam,
    findAssertParam,
    updateAssertParam,
    deleteAssertParam
} from '../api/assertParamApi'

export class AssertParamStore {

    @observable assertParamList = [];
    @observable assertParamInfo;
    @observable assertParamDataSource = [];
    @observable apiUnitId = '';
    @observable dataLength = '';

    @action
    setList = (values) => {
        this.assertParamList = [...values]
    }



    //处理list
    @action
    processList = (data)=>{
        if(!data){
            return;
        }

        const newRow =[ { id: 'InitNewRowId'}];

        this.assertParamDataSource = data;
        this.assertParamList=[...data,...newRow];
    }



    @action
    findAssertParamList = async (id) => {
        this.apiUnitId = id;
        const params = {
            apiUnitId: id,
            orderParams:[{ name:'source', orderType:'asc' }],
        }
        
        const res = await findAssertParamList(params)
        if(res.code === 0) {
            this.dataLength = res.data.length;
            this.processList(res.data);
            return res.data;
        }
    }

    @action
    findAssertParam = async (id) => {
        const param = new FormData();
        param.append('id', id);
        
        const res = await findAssertParam(param);
        if( res.code === 0){
            this.assertParamInfo = res.data;
            return res.data;
        }
    }


    @action
    createAssertParam = async (values) => {
        values.apiUnit = { id: this.apiUnitId }

        const res = await createAssertParam(values)
        if( res.code === 0){
            return this.findAssertParamList(this.apiUnitId);
        }
    }

    @action
    updateAssertParam = async (values) => {
        const res = await updateAssertParam(values)
        if( res.code === 0){
            return this.findAssertParamList(this.apiUnitId);
        }
    }


    @action
    deleteAssertParam = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteAssertParam(param)
        if( res.code === 0){
            this.findAssertParamList(this.apiUnitId);
        }
    }
}

export const ASSERTPARAM_STORE = 'assertParamStore';
