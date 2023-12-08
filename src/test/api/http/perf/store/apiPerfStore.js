import { observable,  action } from "mobx";
import {Axios} from "thoughtware-core-ui";

export class ApiPerfStore {

    @observable apiPerfList = [];
    @observable apiPerfInfo;
    @observable testCaseInfo;

    @action
    findApiPerfList = async (value) => {

        const res = await Axios.post("/apiPerfCase/findApiPerfCaseListByTestCase",value);

        if(res.code === 0) {
            this.apiPerfList = res.data;
            return res.data
        }
    }

    @action
    findApiPerf = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/apiPerfCase/findApiPerfCase",param);
        if( res.code === 0){
            this.apiPerfInfo = res.data;
            this.testCaseInfo = res.data.testCase
            return res.data;
        }
    }


    @action
    createApiPerf = async (values) => await Axios.post("/apiPerfCase/createApiPerfCase",values)

    @action
    updateApiPerf = async (values) => await Axios.post("/apiPerfCase/updateApiPerfCase",values)


    @action
    deleteApiPerf = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/apiPerfCase/deleteApiPerfCase",param)

    }

}

export default new ApiPerfStore();
