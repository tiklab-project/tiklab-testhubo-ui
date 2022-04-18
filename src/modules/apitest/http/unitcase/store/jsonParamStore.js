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
    @observable jsonParamInfo ;
    @observable apiUnitId = '';
    @observable jsonParamId= '';


    @action
    setList = (values) => {
        this.jsonParamList = [...values]
    }

    @action
    findJsonParamListTree = async (id) => {
        this.apiUnitId = id;
        const params = {
            apiUnitId: id,
            orderParams:[{  name:'paramName', orderType:'asc' }],
        }
        const newRow =[ { id: 'jsonParamInitRow'}]

        const res = await findJsonParamListTree(params)
        if(res.code === 0) {
            this.jsonParamDataSource = res.data;
            if( res.data.length === 0){
                this.jsonParamList=newRow
            }else {
                this.jsonParamList = [...res.data, ...newRow];
            }
            return res.data;
        }
    }

    @action
    findJsonParam = async (id) => {
        this.jsonParamId = id;
        const param = new FormData();
        param.append('id', id);

        const res = await findJsonParam(param)
        if( res.code === 0){
            this.jsonParamInfo = res.data;
            return  res.data;
        }
    }


    @action
    createJsonParam =async (values) => {
        values.apiUnit = { id:this.apiUnitId }

        const res = await createJsonParam(values)
        if( res.code === 0){
            this.findJsonParamListTree(this.apiUnitId);
        }

    }

    @action
    updateJsonParam = async (values) => {
        const res = await updateJsonParam(values)

        if( res.code === 0){
            return this.findJsonParamListTree(this.apiUnitId);
        }
    }

    @action
    deleteJsonParam = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await deleteJsonParam(param)
        if( res.code === 0){
            this.findJsonParamListTree(this.apiUnitId);
        }
    }

    @action
    setJsonParamListChild = (parentId) => {
        const pid = ({ id: parentId  })
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


        let result = loop(this.jsonParamList,newChild);
        this.jsonParamList = result;
    }
}



export const JSONPARAM_STORE = 'jsonParamStore';
