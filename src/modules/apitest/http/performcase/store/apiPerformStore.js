import { observable,  action } from "mobx";
import {
    findApiPerformPage,
    createApiPerform,
    findApiPerform,
    updateApiPerform,
    deleteApiPerform,
    findApiPerfCaseListByTestCase
} from '../api/apiPerformApi'

export class ApiPerformStore {

    @observable apiPerformList = [];
    @observable apiPerformInfo;

    @action
    findApiPerformPage = async (value) => {

        const res = await findApiPerfCaseListByTestCase(value);

        if(res.code === 0) {
            this.apiPerformList = res.data;
            return res.data
        }
    }

    @action
    findApiPerform = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findApiPerform(param);
        if( res.code === 0){
            this.apiPerformInfo = res.data;
            return res.data;
        }
    }


    @action
    createApiPerform = async (values) => await createApiPerform(values)

    @action
    updateApiPerform = async (values) => await updateApiPerform(values)


    @action
    deleteApiPerform = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteApiPerform(param)

    }

}

export const API_PERFORM_STORE = 'apiPerformStore';
