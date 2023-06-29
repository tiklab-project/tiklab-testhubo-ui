import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";

export class FormParamStore {

    @observable formParamList = [];
    @observable formParamDataSource = [];
    @observable dataLength ;

    @action
    setList = (values) => {
        this.formParamList = [...values]
    }

    @action
    findFormParamList = async (id) => {
        this.apiUnitId = id;
        const params = {
            apiUnitId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }

        const newRow =[ { id: 'InitNewRowId'}];

        const res = await Axios.post("/formParam/findFormParamList",params);
        if(res.code === 0) {
            this.dataLength = res.data.length;
            this.formParamDataSource = res.data;

            if( res.data.length === 0){
                this.formParamList=newRow;
            }else {
                this.formParamList = [...res.data,...newRow];
            }

            return res.data;
        }
    }

    @action
    findFormParam = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/formParam/findFormParam",param)
        if( res.code === 0){
            return  res.data;
        }
    }

    @action
    createFormParam = async (values) =>  await Axios.post("/formParam/createFormParam",values);

    @action
    updateFormParam = async (values) =>  await Axios.post("/formParam/updateFormParam",values)


    @action
    deleteFormParam = async (id) => {
        const param = new FormData();
        param.append('id', id);

        return  await Axios.post("/formParam/deleteFormParam",param)
    }

}

let formParamStore = new FormParamStore();
export default formParamStore;
