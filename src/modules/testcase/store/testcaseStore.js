import { observable,  action } from "mobx";
import {
    findTestCaseList,
    createTestCase,
    findTestCase,
    updateTestCase,
    deleteTestCase,
    findTestCasePage
} from '../api/testcaseApi'

export class TestCaseStore {
    @observable testcaseList = [];

    @observable activeKey
    @observable tabList=[];
    @observable testType;
    @observable caseType;

    @action
    findTestCaseList = async (values) => {

        const res = await findTestCasePage(values);

        if(res.code === 0) {
            this.testcaseList = res.data.dataList;
            return res.data
        }
    }

    @action
    findTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findTestCase(param);
        if( res.code === 0){
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


    @action
    setTestType = (type) =>{
        this.testType = type;
    }

    @action
    setCaseType = (type) =>{
        this.caseType = type;
    }




    //tab页设置activeKey
    @action
    setActiveKey = (key) =>{
        this.activeKey=key;
    }
    //tab页item
    @action
    setTabList = (item) =>{
        this.tabList = item;
    }

}

export const TESTCASE_STORE = 'testcaseStore';
