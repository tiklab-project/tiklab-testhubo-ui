import { observable,  action } from "mobx";
import {
    findRequestHeaderList,
    createRequestHeader,
    findRequestHeader,
    updateRequestHeader,
    deleteRequestHeader
} from '../api/requestHeaderApi';

export  class RequestHeaderStore {
    @observable requestHeaderList = [];
    @observable requestHeaderInfo = [];
    @observable requestHeaderDataSource = [];
    @observable stepId;
    @observable dataLength;

    @action
    setList = (values) => {
        this.requestHeaderList = [...values]
    }

    @action
    findRequestHeaderList = (id) => {
        this.stepId = id;
        const params = {
            stepId: id,
            orderParams:[{
                    name:'headerName',
                    orderType:'asc'
                }],
        }
        const that = this;
        const newRow =[ { id: 'RequestHeaderInitRow'}]
        return new Promise(function(resolve, reject){
            findRequestHeaderList(params).then((res) => {
                if( res.code===0 ){
                    that.dataLength = res.data.length
                    that.requestHeaderDataSource=res.data
                    if( res.data.length === 0){
                        that.requestHeaderList=newRow;
                    }else {
                        that.requestHeaderList = [...that.requestHeaderDataSource,...newRow];
                    }
                    resolve(res.data);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    findRequestHeader = (id) => {
        const that =this;
        const param = new FormData();
        param.append('id', id)
        return new Promise(function(resolve, reject){
            findRequestHeader(param).then((res) => {
                if( res.code === 0){
                    that.requestHeaderInfo = res.data;
                    resolve(res);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    createRequestHeader = (values) => {
        createRequestHeader(values).then((res) => {
            if( res.code === 0){
                this.findRequestHeaderList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	updateRequestHeader = (values) => {
        return updateRequestHeader(values).then((res) => {
            if( res.code === 0){
                return this.findRequestHeaderList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	deleteRequestHeader = (id) => {
        const param = new FormData();
        param.append('id', id)
		deleteRequestHeader(param).then((res) => {
            if( res.code === 0){
                this.findRequestHeaderList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }



}

export const REQUESTHEADER_STORE = 'requestHeaderStore';
