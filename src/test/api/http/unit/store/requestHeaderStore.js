import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";


export  class RequestHeaderStore {
    @observable headerList = [];
    @observable headerSourceList = [];
    @observable dataLength;

    @action
    setList = (values) => {
        this.headerList = [...values]
    }

    @action
    findRequestHeaderList = async (id) => {
        const params = {
            apiUnitId: id,
            orderParams:[{ name:'headerName', orderType:'asc'}],
        }

        const newRow =[ { id: 'InitNewRowId'}];

        const res = await Axios.post("/requestHeader/findRequestHeaderList",params);

        if( res.code===0 ){
            this.dataLength = res.data.length
            this.headerSourceList = res.data;

            if( res.data.length === 0){
                this.headerList=newRow;
            }else {
                this.headerList = [...res.data,...newRow];
            }

            return res.data
        }
    }

    @action
    findRequestHeader = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/requestHeader/findRequestHeader",param)
        if( res.code === 0){
            return res.data;
        }
    }

    @action
    createRequestHeader = async (values) =>  await Axios.post("/requestHeader/createRequestHeader",values)

    @action
    updateRequestHeader = async (values) => await Axios.post("/requestHeader/updateRequestHeader",values)

    @action
    deleteRequestHeader = async (id) => {
        const param = new FormData();
        param.append('id', id)

        return await Axios.post("/requestHeader/deleteRequestHeader",param)
    }



}

let requestHeaderStore = new RequestHeaderStore();
export default requestHeaderStore;
