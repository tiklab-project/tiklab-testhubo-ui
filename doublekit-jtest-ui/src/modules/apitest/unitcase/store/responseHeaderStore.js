import { observable,  action } from "mobx";
import {
    findResponseHeaderList,
    createResponseHeader,
    findResponseHeader,
    updateResponseHeader,
    deleteResponseHeader
} from '../api/responseHeaderApi';

export class ResponseHeaderStore {
    @observable responseHeaderList = [];
    @observable responseHeaderInfo = [];
    @observable responseHeaderDataSource = [];
    @observable stepId = '';
    @observable dataLength = '';

    @action
    setList = (values) => {
        this.responseHeaderList = [...values]
    }

    @action
    findResponseHeaderList = (id) => {
        this.stepId = id;
        const params = {
            stepId: id,
            orderParams:[{
                    name:'headerName',
                    orderType:'asc'
                }],
        }
        const that = this;

        const newRow =[ { id: 'ResponseHeaderInitRow'}]

        return new Promise(function(resolve, reject){
            findResponseHeaderList(params).then(res => {
                if( res.code === 0){
                    that.dataLength = res.data.length
                    that.responseHeaderDataSource = res.data;
                    if( res.data.length === 0){
                        that.responseHeaderList=newRow;
                    }else {
                        that.responseHeaderList = [...that.responseHeaderDataSource,...newRow];
                    }
                    resolve(res.data);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    findResponseHeader = (id) => {
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findResponseHeader(param).then((res) => {
                if( res.code === 0){
                    that.responseHeaderInfo = res.data;
                    resolve(res);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }


    @action
    createResponseHeader = (values) => {
        values.step = {
            id:this.stepId
        }
        return  createResponseHeader(values).then((res) => {
            if( res.code === 0){
                return  this.findResponseHeaderList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	updateResponseHeader = (values) => {
		return updateResponseHeader(values).then((res) => {
            if( res.code === 0){
                return this.findResponseHeaderList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	deleteResponseHeader = (id) => {
        const param = new FormData();
        param.append('id', id);
		deleteResponseHeader(param).then((res) => {
            if( res.code === 0){
                this.findResponseHeaderList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

}

export const RESPONSEHEADER_STORE = 'responseHeaderStore';
