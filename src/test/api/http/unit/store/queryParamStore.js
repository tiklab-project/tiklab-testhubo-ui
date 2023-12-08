import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

export class QueryParamStore {
    @observable queryParamList = [];
    @observable queryParamDataSource = [];

    @observable dataLength = '';

    @action
    setList = (values) => {
        this.queryParamList = [...values]
    }


    @action
    findQueryParamList = async (id) => {
        const params = {
            apiUnitId: id,
            orderParams:[{ name:'paramName',  orderType:'asc' }],
        }

        const newRow =[ { id: 'InitNewRowId'}];
        const res = await Axios.post("/queryParam/findQueryParamList",params)

        if( res.code === 0) {
            this.dataLength = res.data.length
            this.queryParamDataSource = res.data;

            if( res.data.length === 0){
                this.queryParamList=newRow;
            }else {
                this.queryParamList = [...res.data,...newRow];
            }

            return res.data;
        }
    }

    @action
    findQueryParam = async (id) => {
        const param = new FormData();
        param.append('id', id)

        const res = await Axios.post("/queryParam/findQueryParam",param);
        if( res.code === 0){
            return res.data
        }
    }


    @action
    createQueryParam = async (values) => await Axios.post("/queryParam/createQueryParam",values)


    @action
    updateQueryParam = async (values) =>  await Axios.post("/queryParam/updateQueryParam",values)

    @action
    deleteQueryParam = async (id) => {
        const param = new FormData();
        param.append('id', id)

        return  await Axios.post("/queryParam/deleteQueryParam",param);
    }
}

let queryParamStore = new QueryParamStore();
export default queryParamStore;
