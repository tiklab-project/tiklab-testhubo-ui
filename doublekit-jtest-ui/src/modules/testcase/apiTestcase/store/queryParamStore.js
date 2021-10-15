import { observable,  action } from "mobx";
import {
    findQueryParamList,
    createQueryParam,
    findQueryParam,
    updateQueryParam,
    deleteQueryParam
} from '../api/queryParamApi';

export class QueryParamStore {

    @observable queryParamList = [];
    @observable queryParamInfo = [];
    @observable queryParamDataSource = [];
    @observable stepId = '';
    @observable dataLength = '';

    @action
    setList = (values) => {
        this.queryParamList = [...values]
    }

    @action
    findQueryParamList = (id) => {
        this.stepId = id;
        const params = {
            stepId: id,
            orderParams:[{
                    name:'paramName',
                    orderType:'asc'
                }],
        }
        const that = this;
        const newRow =[ { id: 'QueryParamInitRow'}]

        return new Promise(function(resolve, reject){
            findQueryParamList(params).then(res => {
                if(  res.code === 0) {
                    that.dataLength = res.data.length
                    that.queryParamDataSource = res.data;
                    if( res.data.length === 0){
                        that.queryParamList=newRow;
                        resolve(res.data);
                    }else {
                        that.queryParamList = [...that.queryParamDataSource,...newRow]
                        resolve(res.data);
                    }
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    findQueryParam = (id) => {
        const that =this;
        const param = new FormData();
        param.append('id', id)
        return new Promise(function(resolve, reject){
            findQueryParam(param).then((res) => {
                if( res.code === 0){
                    that.queryParamInfo = res.data;
                    resolve(res)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }


    @action
    createQueryParam = (values) => {
        values.step = {
            id:this.stepId
        }
        createQueryParam(values).then((res) => {
            if( res.code === 0){
               this.findQueryParamList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	updateQueryParam = (values) => {
		return updateQueryParam(values).then((res) => {
            if( res.code === 0){
                return this.findQueryParamList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	deleteQueryParam = (id) => {
        const param = new FormData();
        param.append('id', id)
		deleteQueryParam(param).then((res) => {
            if( res.code === 0){
                this.findQueryParamList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }


}

export const QUERYPARAM_STORE = 'queryParamStore';
