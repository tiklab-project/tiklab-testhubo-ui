import { observable,  action, toJS } from "mobx";
import {
    findJsonResponseListTree,
    createJsonResponse,
    findJsonResponse,
    updateJsonResponse,
    deleteJsonResponse
} from '../api/jsonResponseApi';

//响应结果Store
export class JsonResponseStore {

    @observable jsonResponseList = [];
    @observable jsonResponseInfo = [];
    @observable jsonResponseDataSource= [];
    @observable stepId = '';
    @observable jsonResponseId= '';

    @action
    addList = (values) => {
        this.jsonResponseList = [...this.jsonResponseList,...values]
    }
    @action
    setList = (values) => {
        this.jsonResponseList = [...values]
    }

//根据查询对象按分页查询响应结果列表
    @action
    findJsonResponseListTree = (id) => {
        this.stepId = id;
        const params = {
            stepId: id,
            orderParams:[{
                    name:'propertyName',
                    orderType:'asc'
                }],
        }
        const that = this;
        const newRow =[ { id: 'JsonResponseInitRow'}]
        return new Promise(function(resolve, reject){
            findJsonResponseListTree(params).then(res => {
                if( res.code === 0){
                    that.jsonResponseDataSource = res.data;
                    if( res.data.length === 0){
                        that.jsonResponseList=newRow
                    }else {
                        that.jsonResponseList = res.data;
                    }
                    resolve(res)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    // 根据ID查找响应结果
    @action
    findJsonResponse = (id) => {
        this.requestParamId = id;
        const that =this;
        const param = new FormData();
        param.append('id', id)
        return new Promise(function(resolve, reject){
            findJsonResponse(param).then((res) => {
                if( res.code === 0){
                    that.jsonResponseInfo = res.data;
                    resolve(res);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    // 添加
    @action
    createJsonResponse = (values) => {
        createJsonResponse(values).then((res) => {
            if( res.code === 0){
                this.findJsonResponseListTree(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    // 更改
    @action
	updateJsonResponse = (values) => {
		updateJsonResponse(values).then((res) => {
            if( res.code === 0){
                this.findJsonResponseListTree(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    // 删除
    @action
	deleteJsonResponse = (id) => {
        const param = new FormData();
        param.append('id', id)
		deleteJsonResponse(param).then((res) => {
            if( res.code === 0){
                this.findJsonResponseListTree(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	setJsonResponseListChild = (parentId) => {
        const pid = ({
            id: parentId
        })
        const newChild = {
            id:'c1',
            parent: pid
        }

        const loop = (data,newChild)=>{
             let newdata = data.map((item) => {
                if(item.id && item.id === parentId) {
                    if(item.children === null){
                        item.children = [newChild]
                    }else {
                        item.children.push({
                            ...newChild,
                        })
                    }
                }else if(item.children && item.children.length > 0){
                    loop(item.children, newChild)
                }
                return item
            })
            return newdata;
        }

        const data = toJS(this.jsonResponseList);
        let result = loop(data,newChild);
        this.jsonResponseList = result;

    }

}

export const JSONRESPONSE_STORE = 'jsonResponseStore';
