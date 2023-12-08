import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

export class ResponseHeaderStore {
    @observable responseHeaderList = [];
    @observable responseHeaderInfo;
    @observable responseHeaderDataSource = [];
    @observable dataLength = '';

    @action
    setList = (values) => {
        this.responseHeaderList = [...values]
    }

    @action
    findResponseHeaderList = async (id) => {
        const params = {
            apiUnitId: id,
            orderParams:[{ name:'headerName',  orderType:'asc'  }],
        }

        const newRow =[ { id: 'InitNewRowId'}];

        const res = await Axios.post("/responseHeader/findResponseHeaderList",params);
        if( res.code === 0){
            this.dataLength = res.data.length
            this.responseHeaderDataSource = res.data;

            if( res.data.length === 0){
                this.responseHeaderList=newRow;
            }else {
                this.responseHeaderList = [...res.data,...newRow];
            }
            return res.data;
        }
    }

    @action
    findResponseHeader = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/responseHeader/findResponseHeader",param)
        if( res.code === 0){
            this.responseHeaderInfo = res.data;
            return res.data;
        }
    }


    @action
    createResponseHeader = async (values) =>  await Axios.post("/responseHeader/createResponseHeader",values)


    @action
    updateResponseHeader = async (values) =>  await Axios.post("/responseHeader/updateResponseHeader",values)


    @action
    deleteResponseHeader = async (id) => {
        const param = new FormData();
        param.append('id', id);

        return  await Axios.post("/responseHeader/deleteResponseHeader",param)
    }


}

let responseHeaderStore = new ResponseHeaderStore();
export default responseHeaderStore;
