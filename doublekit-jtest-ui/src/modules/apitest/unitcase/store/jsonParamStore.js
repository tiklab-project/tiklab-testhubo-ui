import { observable,  action , toJS} from "mobx";
import {
    findJsonParamListTree,
    createJsonParam,
    findJsonParam,
    updateJsonParam,
    deleteJsonParam
} from '../api/jsonParamApi'

export class JsonParamStore {

    @observable jsonParamList = [];
    @observable jsonParamDataSource = [];
    @observable jsonParamInfo = [];
    @observable stepId = '';
    @observable jsonParamId= '';


    @action
    setList = (values) => {
        this.jsonParamList = [...values]
    }

    @action
    findJsonParamListTree = (id) => {
        this.stepId = id;
        const params = {
            stepId: id,
            orderParams:[{
                    name:'paramName',
                    orderType:'asc'
                }],
        }
        const that = this;
        const newRow =[ { id: 'jsonParamInitRow'}]
        return new Promise(function(resolve, reject){
            findJsonParamListTree(params).then(res => {
                if(res.code === 0) {
                    that.jsonParamDataSource = res.data;
                    if( res.data.length === 0){
                        that.jsonParamList=newRow
                    }else {
                        that.jsonParamList = [...that.jsonParamDataSource, ...newRow];
                    }
                    resolve(res.data);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    findJsonParam = (id) => {
        this.jsonParamId = id;
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findJsonParam(param).then((res) => {
                if( res.code === 0){
                    that.jsonParamInfo = res.data;
                    resolve(res)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }


    @action
    createJsonParam = (values) => {
        values.step = {
            id:this.stepId
        }
        createJsonParam(values).then((res) => {
            if( res.code === 0){
                this.findJsonParamListTree(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	updateJsonParam = (values) => {
		return updateJsonParam(values).then((res) => {
            if( res.code === 0){
                return his.findJsonParamListTree(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	deleteJsonParam = (id) => {
        const param = new FormData();
        param.append('id', id);
		deleteJsonParam(param).then((res) => {
            if( res.code === 0){
                this.findJsonParamListTree(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	setJsonParamListChild = (parentId) => {
        const pid = ({
            id: parentId
        })
        const newChild = {
            id:'jsonParamInitRowChild',
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
        const data = toJS(this.jsonParamList);
        let result = loop(data,newChild);
        this.jsonParamList = result;


    }

}



export const JSONPARAM_STORE = 'jsonParamStore';
