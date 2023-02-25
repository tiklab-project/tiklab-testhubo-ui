import { observable,  action } from "mobx";
import {
    findApiPerfPage,
    createApiPerf,
    findApiPerf,
    updateApiPerf,
    deleteApiPerf,
    findApiPerfCaseListByTestCase
} from '../api/apiPerfApi'

export class ApiPerfStore {

    @observable apiPerfList = [];
    @observable apiPerfInfo;

    @action
    findApiPerfList = async (value) => {

        const res = await findApiPerfCaseListByTestCase(value);

        if(res.code === 0) {
            this.apiPerfList = res.data;
            return res.data
        }
    }

    @action
    findApiPerf = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiPerf(param);
        if( res.code === 0){
            this.apiPerfInfo = res.data;
            return res.data;
        }
    }


    @action
    createApiPerf = async (values) => await createApiPerf(values)

    @action
    updateApiPerf = async (values) => await updateApiPerf(values)


    @action
    deleteApiPerf = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteApiPerf(param)

    }

}

export const API_PERF_STORE = 'apiPerfStore';
