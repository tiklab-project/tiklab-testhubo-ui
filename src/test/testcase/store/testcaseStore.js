import { observable,  action } from "mobx";
import {Axios} from "tiklab-core-ui";


export class TestCaseStore {
    @observable testcaseList = [];

    @observable activeKey
    @observable tabList = [];
    @observable testType;
    @observable caseType;

    @action
    findTestCaseList = async (values) => {

        const res = await Axios.post("/testCase/findTestCasePage", values);

        if (res.code === 0) {
            this.testcaseList = res.data.dataList;
            return res.data
        }
    }

    @action
    findTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await Axios.post("/testCase/findTestCase", param);
        if (res.code === 0) {
            return res.data;
        }
    }


    @action
    createTestCase = async (values) => await Axios.post("/testCase/createTestCase", values)

    @action
    updateTestCase = async (values) => await Axios.post("/testCase/updateTestCase", values)

    @action
    deleteTestCase = async (id) => {
        const param = new FormData();
        param.append('id', id);

        await Axios.post("/testCase/deleteTestCase", param)
    }


    @action
    setTestType = (type) => {
        this.testType = type;
    }

    @action
    setCaseType = (type) => {
        this.caseType = type;
    }


    //tab页设置activeKey
    @action
    setActiveKey = (key) => {
        this.activeKey = key;
    }
    //tab页item
    @action
    setTabList = (item) => {
        this.tabList = item;
    }


    /**
     * 设置最近访问的用例
     */
    @action
    testCaseRecent = async (values) => {
        const res = await Axios.post("/testCaseRecent/testCaseRecent", values);
        if (res.code === 0) {
            return res.data;
        }
    }
}

export const TESTCASE_STORE = 'testcaseStore';
