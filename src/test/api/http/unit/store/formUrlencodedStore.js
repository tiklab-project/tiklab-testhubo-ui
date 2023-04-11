import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


export class FormUrlencodedStore {

    @observable formUrlencodedList = [];
    @observable formUrlencodedDataSource = [];

    @observable dataLength;

    @action
    setList = (values) => {
        this.formUrlencodedList = [...values]
    }

    @action
    findFormUrlencodedList = async (id) => {
        this.apiUnitId = id;
        const params = {
            apiUnitId: id,
            orderParams:[{name:'paramName', orderType:'asc'}],
        }

        const newRow =[ { id: 'InitNewRowId'}];

        const res = await Axios.post("/formUrlencoded/findFormUrlencodedList",params);
        if(res.code === 0) {
            this.dataLength = res.data.length
            this.formUrlencodedDataSource = res.data;

            if( res.data.length === 0){
                this.formUrlencodedList=newRow;
            }else {
                this.formUrlencodedList = [...res.data,...newRow];
            }

            return res.data;
        }
    }

    @action
    findFormUrlencoded = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/formUrlencoded/findFormUrlencoded",param);
        if( res.code === 0){
            return res.data;
        }
    }


    @action
    createFormUrlencoded = async (values) =>  await Axios.post("/formUrlencoded/createFormUrlencoded",values)


    @action
    updateFormUrlencoded = async (values) =>  await Axios.post("/formUrlencoded/updateFormUrlencoded",values)


    @action
    deleteFormUrlencoded = async (id) => {
        const param = new FormData();
        param.append('id', id);

        return  await Axios.post("/formUrlencoded/deleteFormUrlencoded",param)
    }

}

export const FORM_URLENCODED_STORE = 'formUrlencodedStore';
