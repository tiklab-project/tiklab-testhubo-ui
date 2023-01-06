import { observable,  action } from "mobx";
import {
    findTestCaseList,
    createTestCase,
    findTestCase,
    updateTestCase,
    deleteTestCase
} from '../api/testcaseApi'

export class TestCaseStore {

    @observable testcaseList = [];
    @observable testcaseInfo;
    @observable functionList;
    @observable locationList;


    @action
    findTestCaseList = async (values) => {

        const res = await findTestCaseList(values);

        if(res.code === 0) {
            this.testcaseList = res.data;
            return res.data
        }
    }

    @action
    findTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findTestCase(param);
        if( res.code === 0){
            this.testcaseInfo = res.data;

            return res.data;
        }
    }


    @action
    createTestCase = async (values) =>  await createTestCase(values)

    @action
    updateTestCase = async (values) =>  await updateTestCase(values)

    @action
    deleteTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await deleteTestCase(param)
    }

}

export const TESTCASE_STORE = 'testcaseStore';
