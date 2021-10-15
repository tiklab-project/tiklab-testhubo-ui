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

    @action
    findTestcasePage = async (id,param) => {
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
    findTestcase = (id) => {
        const that =this;
        const param = new FormData();
        param.append('id', id);
        return new Promise(function(resolve, reject){
            findTestcase(param).then((res) => {
                if(res.code === 0){
                    that.testcaseInfo = res.data;
                    resolve(res.data)
                }
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    @action
    createTestcase = async (values) => {
        const res = await createTestcase(values)
        if(res.code === 0){
            this.findTestcasePage(this.repositoryId)
        }
    }

    @action
    updateTestcase = async (values) => {
        const res = await updateTestcase(values)
        if(res.code === 0){
            this.findTestcasePage(this.repositoryId);
        }
    }

    @action
    deleteTestcase = async (id) => {
        const param = new FormData();
        param.append('id', id);
        const res = await deleteTestcase(param)
        if(res.code === 0) {
            this.findTestcasePage(this.repositoryId);
        }
    }

    @action
    releModule = async (testCaseId,categoryId) => {
        const param = new FormData();
        param.append('testCaseId', testCaseId);
        param.append('categoryId', categoryId);
        const res = await releModule(param)
        if(res.code === 0) {
            this.findTestcasePage(this.repositoryId);
        }
    }

}

export const TESTCASE_STORE = 'testcaseStore';
