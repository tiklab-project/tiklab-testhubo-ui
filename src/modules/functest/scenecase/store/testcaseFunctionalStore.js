/**
 * @description：
 * @date: 2021-09-03 13:32
 */
import {observable,action} from "mobx";
import {
    findTestCaseFunctionalList,
    findTestCaseFunctional,
    createTestCaseFunctional,
    deleteTestCaseFunctional,
    updateTestCaseFunctional,
} from '../api/testcaseFunctionalApi';

export class TestcaseFunctionalStore {
    @observable testCaseFunctionalList = [];
    @observable testCaseFunctionalInfo = {};
    @observable testCaseId;

    @action
    findTestCaseFunctionalList = async (id) => {
        this.testCaseId=id;
        const params = {testCaseId: id}

        const res = await findTestCaseFunctionalList(params)
        if(res.code === 0) {
            this.testCaseFunctionalList=res.data.dataList;
            return res.data
        }
    }

    @action
    findTestCaseFunctional = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findTestCaseFunctional(param);
        if(res.code === 0){
            this.testCaseFunctionalInfo = res.data;
            return res.data;
        }
    }

    @action
    createTestCaseFunctional = async (values) => {
        const res = await createTestCaseFunctional(values);
        if(res.code === 0){
            return (res.data)
        }
    }

    @action
    updateTestCaseFunctional = async (values) => {
        const res = await updateTestCaseFunctional(values);
        if(res.code === 0){
            this.findTestCaseFunctionalPage(this.testCaseId);
        }
    }

    @action
    deleteTestCaseFunctional = async (id) => {
        const param = new FormData();
        param.append('id', id)
        const res = await deleteTestCaseFunctional(param);
        if(res.code === 0){
            this.findTestCaseFunctionalPage(this.testCaseId);
        }
    }
}

export const FUNCTIONALTEST_STORE = 'testcaseFunctionalStore';
