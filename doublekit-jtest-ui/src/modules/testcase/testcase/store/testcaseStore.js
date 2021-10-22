import {observable,action} from "mobx";
import {
    findTestcasePage,
    findTestcase,
    createTestcase,
    deleteTestcase,
    updateTestcase,
    releModule
}from '../api/testcaseApi';


export class TestcaseStore {
    @observable testcaseList = [];
    @observable testcaseInfo = {};
    @observable totalRecord ;
    @observable repositoryId = '';
    @observable param = {}

    @action
    findTestcasePage = async (id,param) => {
        this.param = param
        this.repositoryId=id;
        const params = {
            repositoryId:id,
            ...param,
            orderParams: [{name:'name', orderType:'asc'}],
        }
        const res = await findTestcasePage(params)
        if(res.code === 0) {
            this.totalRecord = res.data.totalRecord;
            return  this.testcaseList = res.data.dataList;
        }

    }

    @action
    findTestcase = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await findTestcase(param)
        if(res.code === 0){
            return this.testcaseInfo = res.data;
        }
    }

    @action
    createTestcase = async (values) => {
        const res = await createTestcase(values)
        if(res.code === 0){
            this.findTestcasePage(this.repositoryId,this.param)
        }
    }

    @action
    updateTestcase = async (values) => {
        const res = await updateTestcase(values)
        if(res.code === 0){
            this.findTestcasePage(this.repositoryId,this.param);
        }
    }

    @action
    deleteTestcase = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteTestcase(param)
        if(res.code === 0) {
            this.findTestcasePage(this.repositoryId,this.param);
        }
    }

    @action
    releModule = async (testCaseId,categoryId) => {
        const param = new FormData();
        param.append('testCaseId', testCaseId);
        param.append('categoryId', categoryId);
        const res = await releModule(param)
        if(res.code === 0) {
            this.findTestcasePage(this.repositoryId,this.param);
        }
    }

}

export const TESTCASE_STORE = 'testcaseStore';
