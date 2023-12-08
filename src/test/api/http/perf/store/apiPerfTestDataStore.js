import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

export class ApiPerfTestDataStore {

    @action
    findApiPerfTestDataList = async (value) => {
        const res = await Axios.post("/apiPerfTestData/findApiPerfTestDataList",value);
        if(res.code === 0) {
            return res.data
        }
    }

    @action
    findApiPerfTestData = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/apiPerfTestData/findApiPerfTestData",param);
        if( res.code === 0){
            return res.data;
        }
    }

    @action
    createApiPerfTestData = async (values) => await Axios.post("/apiPerfTestData/createApiPerfTestData",values)

    @action
    updateApiPerfTestData = async (values) => await Axios.post("/apiPerfTestData/updateApiPerfTestData",values)


    @action
    deleteApiPerfTestData = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/apiPerfTestData/deleteApiPerfTestData",param)
    }


}

export default new ApiPerfTestDataStore();
