import {observable,action} from "mobx";
import {
    findTestPlanPage,
    findTestPlan,
    createTestPlan,
    deleteTestPlan,
    updateTestPlan
}from '../api/testPlanApi';

export class TestPlanStore {
    @observable testPlanList = [];
    @observable testPlanInfo = {};
    @observable totalRecord ;

    @action
    findTestPlanPage = async (id,param) => {
        this.repositoryId = id;
        this.param = param;
        const params = {
            repositoryId:id,
            ...param,
            orderParams: [{name:'name', orderType:'asc'}],
        };
        const res = await findTestPlanPage(params)
        if(res.code === 0) {
            this.totalRecord = res.data.totalRecord;
            this.testPlanList = res.data.dataList;
            return res.data
        }
    }

    @action
    findTestPlan = async (id) => {
        const param = new FormData();
        param.append('id', id);

        const res = await findTestPlan(param)
        if(res.code === 0){
            this.testPlanInfo = res.data;
            return res.data;
        }
    }

    @action
    createTestPlan = async (values) => await createTestPlan(values)

    @action
    updateTestPlan = async (values) => await updateTestPlan(values)

    @action
    deleteTestPlan = async (id) => {
        const param = new FormData();
        param.append('id', id);

         await deleteTestPlan(param)
    }

}

export const TESTPLAN_STORE = 'testPlanStore';
