import { observable,  action } from "mobx";
import {
    findFormParamList,
    createFormParam,
    findFormParam,
    updateFormParam,
    deleteFormParam
} from '../api/formParamApi'

export class FormParamStore {

    @observable formParamList = [];
    @observable formParamInfo = [];
    @observable formParamDataSource = [];
    @observable stepId = '';
    @observable formParamId= '';
    @observable dataLength = '';

    @action
    setList = (values) => {
        this.formParamList = [...values]
    }

    @action
    findFormParamList = (id,apxMethodName) => {
        this.stepId = id;
        const params = {
            name:apxMethodName,
            stepId: id,
            orderParams:[{
                name:'paramName',
                orderType:'asc'
            }],
        }
        const that = this;
        const newRow =[ { id: 'FormParamInitRow'}]
        return new Promise(function(resolve, reject){
            findFormParamList(params).then(res => {
                if(res.code === 0) {
                    that.dataLength = res.data.length
                    that.formParamDataSource = res.data;
                    if( res.data.length === 0 ){
                        that.formParamList= newRow;
                    }else {
                        that.formParamList = [...that.formParamDataSource,...newRow];
                    }
                    resolve(res.data);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    findFormParam = (id) => {
        this.formParamId = id;
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findFormParam(param).then((res) => {
                if( res.code === 0){
                    that.formParamInfo = res.data;
                    resolve(res)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }


    @action
    createFormParam = (values) => {
        values.step = {
            id: this.stepId
        }
        return createFormParam(values).then((res) => {
            if( res.code === 0){
               return  this.findFormParamList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	updateFormParam = (values) => {
		return updateFormParam(values).then((res) => {
            if( res.code === 0){
                return this.findFormParamList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
	deleteFormParam = (id) => {
        const param = new FormData();
        param.append('id', id);
		deleteFormParam(param).then((res) => {
            if( res.code === 0){
                this.findFormParamList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

}

export const FORMPARAM_STORE = 'formParamStore';
