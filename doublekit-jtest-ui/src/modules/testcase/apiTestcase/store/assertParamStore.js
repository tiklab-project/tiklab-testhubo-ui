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
    @observable assertParamInfo = [];
    @observable assertParamDataSource = [];
    @observable stepId = '';
    @observable assertParamId= '';
    @observable dataLength = '';

    @action
    setList = (values) => {
        this.assertParamList = [...values]
    }

    @action
    findAssertParamList = (id) => {
        this.stepId = id;
        const params = {
            stepId: id,
            orderParams:[{
                name:'source',
                orderType:'asc'
            }],
        }
        const that = this;
        const newRow =[ { id: 'AssertParamInitRow'}]
        return new Promise(function(resolve, reject){
            findAssertParamList(params).then(res => {
                if(res.code === 0) {
                    that.dataLength = res.data.length
                    that.assertParamDataSource = res.data;
                    if( res.data.length === 0 ){
                        that.assertParamList= newRow;
                    }else {
                        that.assertParamList = [...that.assertParamDataSource,...newRow];
                    }
                    resolve(res.data);
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    @action
    findAssertParam = (id) => {
        this.assertParamId = id;
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findAssertParam(param).then((res) => {
                if( res.code === 0){
                    that.assertParamInfo = res.data;
                    resolve(res)
                }
            }).catch(error => {
                reject(error)
            })
        })
    }


    @action
    createAssertParam = (values) => {
        values.step = {
            id: this.stepId
        }
        return createAssertParam(values).then((res) => {
            if( res.code === 0){
                return  this.findAssertParamList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    updateAssertParam = (values) => {
        return updateAssertParam(values).then((res) => {
            if( res.code === 0){
                return this.findAssertParamList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    @action
    deleteAssertParam = (id) => {
        const param = new FormData();
        param.append('id', id);
        deleteAssertParam(param).then((res) => {
            if( res.code === 0){
                this.findAssertParamList(this.stepId);
            }
        }).catch(error => {
            console.log(error)
        })
    }

}

export const ASSERTPARAM_STORE = 'assertParamStore';
